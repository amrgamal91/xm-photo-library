import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  photosActive = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any ) => {
        event.url.split('/').includes('photos')
          ? (this.photosActive = true)
          : (this.photosActive = false);
      });
  }

  navToPhotos() {
    this.router.navigate([`/photos`]);
    this.photosActive = true;
  }

  navToFavs() {
    this.router.navigate([`/favorites`]);
    this.photosActive = false;
  }
}
