import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-single-photo',
  templateUrl: './single-photo.component.html',
  styleUrls: ['./single-photo.component.scss'],
})
export class SinglePhotoComponent implements OnInit {
  item: any;
  id!: string ;

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')||'';
    this.photoService.getSingleImage(this.id).subscribe((data) => (this.item = data));
  }

  removeFromFav(){
    let favImages = JSON.parse(localStorage.getItem('favImages') || '[]');
    favImages.splice(favImages.findIndex((item: { id: string; }) => item.id === this.id) , 1)
    localStorage.setItem('favImages', JSON.stringify(favImages));
    this.router.navigate(['/favorites']);
  }
}
