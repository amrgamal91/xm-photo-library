import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  items: any[] = [];
  breakpoint!: number;
  constructor(private photoService: PhotoService,private router:Router) {}

  ngOnInit(): void {
    console.log("here in on init")
    this.breakpoint = window.innerWidth <= 600 ? 2 : 4;
    this.items = JSON.parse(localStorage.getItem('favImages') || '[]');
    console.log("favoritessss: ",this.items)
    this.photoService.subject$.subscribe((data) => {
      console.log('favorite images  = ', data);
    });
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 600 ? 2 : 4;
  }

  navToSinglePhotoView(id:number){
    this.router.navigate(['/photos/',id]);
  }
}
