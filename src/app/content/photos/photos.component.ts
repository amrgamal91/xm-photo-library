import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoriteImages, PhotoService } from 'src/app/services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent {
  items: any[] = [];
  page = 1;
  perPage = 50; 
  isLoading: boolean = false;
  breakpoint!: number;

  constructor(
    private photoService: PhotoService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.breakpoint = window.innerWidth <= 600 ? 1 : 3;
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 3;
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

  addToFav(item: any) {
    this.photoService.subject$.next([{ ...item }]);
    let favImages = JSON.parse(localStorage.getItem('favImages') || '[]');
    if (
      favImages.findIndex((obj: FavoriteImages) => obj.id === item.id) == -1
    ) {
      favImages.push({ id: item.id, url: item.download_url });
      localStorage.setItem('favImages', JSON.stringify(favImages));
      this.snackBar.open(
        `photo with id : ${item.id} is added to favorites`,
        '',
        {
          duration: 2000,
        }
      );
    } else {
      this.snackBar.open(`photo is already in favorites`, '', {
        duration: 2000,
      });
    }
  }
}
