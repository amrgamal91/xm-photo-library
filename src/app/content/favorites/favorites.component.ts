import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utility } from 'src/app/Utils/utils';
import { FavoriteImages } from 'src/app/models/fav-Images.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  items: FavoriteImages[] = [];
  breakpoint!: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem('favImages') || '[]');
    this.breakpoint = Utility.handleBreakPoint(window.innerWidth);
  }

  onResize() {
    this.breakpoint = Utility.handleBreakPoint(window.innerWidth);
  }

  navToSinglePhotoView(id: number) {
    this.router.navigate(['/photos/', id]);
  }
}
