import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Song } from '../../interfaces/song';
import { FormControl } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { debounceTime, filter, map } from 'rxjs/operators' ;
import { Router } from '@angular/router';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginatorControl: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortControl : MatSort;
  songSubscripotion : Subscription;
  songFilter: FormControl = new FormControl();
  loading: Boolean = false;
  songs: Song[] = [];
  displayedColumns = ['Song']
  totalCount = 0;

  datasource : MatTableDataSource<Song>;
  constructor(private backendService: BackendService,
    private router: Router) { }

  ngOnInit() {
    this.datasource = new MatTableDataSource<Song>();
    console.log('Getting songs');
    this.getSongList();
  }

  ngAfterViewInit() {
    console.log('reloading')
    this.datasource.paginator = this.paginatorControl;
    this.datasource.sort = this.sortControl;
    this.paginatorControl.page
    .subscribe( result => {
      console.log(result);
      this.getSongs();
    }, error => {
      console.log(error);
      this.loading = false;
    }, () => {
      this.getSongList();
      this.loading = false;
    });

    this.sortControl.sortChange
      .subscribe( result => {
        console.log(result)
        this.getSongs();
      }, error => {
        console.log(error);
        this.loading = false;
      }, () => {
        this.getSongList();
        this.loading = false;
      });

      this.songFilter.valueChanges
        .pipe(debounceTime(300))
        .pipe(map(song => song.toString().trim()))
        .subscribe( result => {
          console.log("Filtering")
          this.paginatorControl.firstPage();
          console.log(result)
          this.getSongs();
        }, error => {
          console.log(error);
          this.loading = false;
        }, () => {
          this.getSongList();
          this.loading = false;
        });
    }

  getSongs() {
    let sort = this.sortControl.direction == 'desc' ? 'name_desc' : 'name_asc';
    this.backendService.getSongs(this.songFilter.value, sort, 
    this.paginatorControl.pageIndex + 1, this.paginatorControl.pageSize).subscribe((result) => {
      console.log(result);
      console.log('Total count : ' + result.headers.get('X-Total-Count'))
      this.totalCount = parseInt(result.headers.get('X-Total-Count'));
      this.datasource = new MatTableDataSource(result['body']);
    });
  }

  ngOnDestroy() {
    this.songSubscripotion.unsubscribe();
  }

  getSongList() {
    this.loading = true;
    this.songSubscripotion = this.backendService.getSongs('', '', 
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
    this.router.navigate(['songs', row.id])

  }

  addSong() {
    console.log("Adding song")
  }
}
