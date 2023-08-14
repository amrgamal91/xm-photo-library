import { Component, HostListener } from '@angular/core';
import { FavoriteImages, PhotoService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent {
  items: any[] = [];
  page = 1;
  perPage = 50; // number of images to be loaded
  isLoading: boolean = false;
  breakpoint!: number;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.loadItems();
    this.breakpoint = window.innerWidth <= 600 ? 2 : 3;
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 600 ? 2 : 3;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    let pos =
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max && !this.isLoading) this.loadItems();
  }

  loadItems() {
    this.isLoading = true;
    this.photoService
      .getImages(this.page, this.perPage)
      .subscribe((items: any) => {
        this.items.push(...items);
        console.log(items);
        this.page++;
        this.isLoading = false;
      });
  }

  addToFav($event: any) {
    console.log('add to fav : ', $event);
    let item = $event;
    this.photoService.subject$.next([{ ...item }]);

    let favImages = JSON.parse(localStorage.getItem('favImages') || '[]');
    favImages.push({ id: item.id, url: item.download_url });
    localStorage.setItem('favImages', JSON.stringify(favImages));
  }
}
