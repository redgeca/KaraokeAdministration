import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Karaoké - Administration';
  loading = false;

  constructor(private router : Router, private activatedRoute : ActivatedRoute) {

  }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart))
    .subscribe(() => { 
      console.log('Loading.....');
        this.loading = true;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
    .subscribe(() => { 
      console.log('Loaded.....');
        this.loading = false;
    });

      
  }

}
