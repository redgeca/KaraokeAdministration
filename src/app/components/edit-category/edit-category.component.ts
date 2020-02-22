import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  category: Category;
  songs = [];
  displayedColumns = ['Songs']
  totalCount = 0;

  constructor(private route: ActivatedRoute, private backend: BackendService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    this.backend.getCategory(id).subscribe((result) => {
      console.log(result);
      /*
      this.category = result;
      this.totalCount = this.category.songs.length;
      this.songs = this.category.songs;
      console.log('Songs')
      */
    });
  }

}
