import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  photosActive = true;

  constructor(private router: Router) {}

  navToPhotos() {
    this.router.navigate([`/photos`]);
    this.photosActive = true;
  }

  navToFavs() {
    this.router.navigate([`/favorites`]);
    this.photosActive = false;
  }
}
