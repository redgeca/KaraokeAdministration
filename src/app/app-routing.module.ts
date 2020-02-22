import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistsComponent } from './components/artists/artists.component';
import { SongsComponent } from './components/songs/songs.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ReindexComponent } from './components/reindex/reindex.component';
import { EditArtistComponent } from './components/edit-artist/edit-artist.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';

const routes: Routes = [ 
  { path: '', redirectTo: '/songs', pathMatch: 'full' },
  { path: 'artists/:id', component: EditArtistComponent },
  { path: 'artists', component: ArtistsComponent },
  { path: 'categories/:id', component: EditCategoryComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'songs', component: SongsComponent }, 
  { path: 'reindex', component: ReindexComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
