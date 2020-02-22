import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Category } from '../../interfaces/category';
import { FormControl } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { debounceTime, filter, map } from 'rxjs/operators' ;
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatPaginator, { static: true }) paginatorControl: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortControl : MatSort;
  categorySubscripotion : Subscription;
  categoryFilter: FormControl = new FormControl();
  loading: Boolean = false;
  categories: Category[] = [];
  displayedColumns = ['Category']
  totalCount = 0;

  datasource : MatTableDataSource<Category>;
  constructor(private backendService: BackendService,
    private router: Router) { }

  ngOnInit() {
    this.datasource = new MatTableDataSource<Category>();
    console.log('Getting categories');
    this.getCategoryList();
  }

  ngAfterViewInit() {
    console.log('reloading')
    this.datasource.paginator = this.paginatorControl;
    this.datasource.sort = this.sortControl;
    this.paginatorControl.page
    .subscribe( result => {
      console.log(result);
      this.getCategories();
    }, error => {
      console.log(error);
      this.loading = false;
    }, () => {
      this.getCategoryList();
      this.loading = false;
    });

    this.sortControl.sortChange
      .subscribe( result => {
        console.log(result)
        this.getCategories();
      }, error => {
        console.log(error);
        this.loading = false;
      }, () => {
        this.getCategoryList();
        this.loading = false;
      });

      this.categoryFilter.valueChanges
        .pipe(debounceTime(300))
        .pipe(map(category => category.toString().trim()))
        .subscribe( result => {
          console.log("Filtering")
          this.paginatorControl.firstPage();
          console.log(result)
          this.getCategories();
        }, error => {
          console.log(error);
          this.loading = false;
        }, () => {
          this.getCategoryList();
          this.loading = false;
        });
    }

  getCategories() {
    let sort = this.sortControl.direction == 'desc' ? 'name_desc' : 'name_asc';
    this.backendService.getCategories(this.categoryFilter.value, sort, 
    this.paginatorControl.pageIndex + 1, this.paginatorControl.pageSize).subscribe((result) => {
      console.log(result);
      console.log('Total count : ' + result.headers.get('X-Total-Count'))
      this.totalCount = parseInt(result.headers.get('X-Total-Count'));
      this.datasource = new MatTableDataSource(result['body']);
    });
  }

  ngOnDestroy() {
    this.categorySubscripotion.unsubscribe();
  }

  getCategoryList() {
    this.loading = true;
    this.categorySubscripotion = this.backendService.getCategories('', '', 
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
    this.router.navigate(['categories', row.id])

  }

  addCategory() {
    console.log("Adding Category")
  }
}
