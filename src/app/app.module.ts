import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' 
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatProgressSpinnerModule,
          MatIconModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule, 
          MatDividerModule, MatPaginatorIntl, MatTooltipModule, MatCardModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,  ReactiveFormsModule  } from '@angular/forms';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';  
import { getFrenchPaginatorIntl } from './french.paginator';
import { SongsComponent } from './components/songs/songs.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ReindexComponent } from './components/reindex/reindex.component';
import { EditArtistComponent } from './components/edit-artist/edit-artist.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistsComponent,
    MainNavComponent,
    SongsComponent,
    CategoriesComponent,
    ReindexComponent,
    EditArtistComponent,
    EditCategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatPaginatorModule, MatSortModule, MatTableModule, MatIconModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
