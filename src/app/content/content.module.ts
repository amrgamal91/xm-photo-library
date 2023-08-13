import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';
import { FavoritesComponent } from './favorites/favorites.component';

import { MatGridListModule } from '@angular/material/grid-list';
import{MatCardModule} from '@angular/material/card'
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PhotosComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    SharedModule
  ],
  exports: [
    PhotosComponent,
    FavoritesComponent
  ]
})
export class ContentModule { }
