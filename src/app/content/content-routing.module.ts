import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesComponent } from './favorites/favorites.component';
import { PhotosComponent } from './photos/photos.component';

const routes: Routes = [{
    path: 'photos',
    component: PhotosComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  { path: '', pathMatch: 'full', redirectTo: 'photos' },
  { path: '**', redirectTo: 'photos' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
