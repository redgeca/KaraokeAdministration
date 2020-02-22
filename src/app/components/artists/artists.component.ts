import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Artist } from '../../interfaces/artist';
import { FormControl } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { debounceTime, filter, map } from 'rxjs/operators' ;
import { Router } from '@angular/router';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginatorControl: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortControl : MatSort;
  artistSubscripotion : Subscription;
  artistFilter: FormControl = new FormControl();
  loading: Boolean = false;
  artists: Artist[] = [];
  displayedColumns = ['Artist']
  totalCount = 0;

  datasource : MatTableDataSource<Artist>;
  constructor(private backendService: BackendService,
    private router: Router) { }

  ngOnInit() {
    this.datasource = new MatTableDataSource<Artist>();
    console.log('Getting artists');
    this.getArtistList();


  }

  ngAfterViewInit() {
    console.log('reloading')
    this.datasource.paginator = this.paginatorControl;
    this.datasource.sort = this.sortControl;
    this.paginatorControl.page
    .subscribe( result => {
      console.log(result);
      this.getArtists();
    }, error => {
      console.log(error);
      this.loading = false;
    }, () => {
      this.getArtistList();
      this.loading = false;
    });

    this.sortControl.sortChange
      .subscribe( result => {
        console.log(result)
        this.getArtists();
      }, error => {
        console.log(error);
        this.loading = false;
      }, () => {
        this.getArtistList();
        this.loading = false;
      });

      this.artistFilter.valueChanges
        .pipe(debounceTime(300))
        .pipe(map(artist => artist.toString().trim()))
        .subscribe( result => {
          console.log("Filtering")
          this.paginatorControl.firstPage();
          console.log(result)
          this.getArtists();
        }, error => {
          console.log(error);
          this.loading = false;
        }, () => {
          this.getArtistList();
          this.loading = false;
        });
    }

  getArtists() {
    let sort = this.sortControl.direction == 'desc' ? 'name_desc' : 'name_asc';
    this.backendService.getArtists(this.artistFilter.value, sort, 
    this.paginatorControl.pageIndex + 1, this.paginatorControl.pageSize).subscribe((result) => {
      console.log(result);
      console.log('Total count : ' + result.headers.get('X-Total-Count'))
      this.totalCount = parseInt(result.headers.get('X-Total-Count'));
      this.datasource = new MatTableDataSource(result['body']);
    });
  }

  ngOnDestroy() {
    this.artistSubscripotion.unsubscribe();
  }

  getArtistList() {
    this.loading = true;
    this.artistSubscripotion = this.backendService.getArtists('', '', 
      this.paginatorControl.pageIndex + 1, this.paginatorControl.pageSize).subscribe((result) => {
        console.log(result);
        console.log('Total count : ' + result.headers.get('X-Total-Count'))
        this.totalCount = parseInt(result.headers.get('X-Total-Count'));
        this.datasource = new MatTableDataSource(result['body']);
        this.datasource.paginator = this.paginatorControl;
        this.datasource.sort = this.sortControl;
      }, error => {
        console.log(error);
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }

  onRowClicked(row) {
    console.log(row);
    this.router.navigate(['artists', row.id])

  }

  addArtist() {
    console.log("Adding artist")
  }
}
