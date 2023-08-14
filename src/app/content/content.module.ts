import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photos/photos.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { SinglePhotoComponent } from './single-photo/single-photo.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [PhotosComponent, FavoritesComponent, SinglePhotoComponent],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
    SharedModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [PhotosComponent, FavoritesComponent, SinglePhotoComponent],
})
export class ContentModule {}
