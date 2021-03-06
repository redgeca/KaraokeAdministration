import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { Artist } from 'src/app/interfaces/artist';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.scss']
})
export class EditArtistComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginatorControl: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortControl : MatSort;
  artist: Artist;
  songs = [];
  displayedColumns = ['Songs']
  totalCount = 0;

  constructor(private route: ActivatedRoute, private backend: BackendService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.backend.getArtist(id).subscribe((result) => {
      console.log(result);
      this.artist = result;
      this.totalCount = this.artist.songs.length;
      this.songs = this.artist.songs;
      console.log('Songs')
    });
  }

}
