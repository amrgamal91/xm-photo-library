import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';
import { FavoritesComponent } from './favorites/favorites.component';

import { MatGridListModule } from '@angular/material/grid-list';
import{MatCardModule} from '@angular/material/card'
import { SharedModule } from '../shared/shared.module';
import { SinglePhotoComponent } from './single-photo/single-photo.component';

@NgModule({
  declarations: [
    PhotosComponent,
    FavoritesComponent,
    SinglePhotoComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    SharedModule
  ],
  exports: [
    PhotosComponent,
    FavoritesComponent,
    SinglePhotoComponent
  ]
})
export class ContentModule { }
