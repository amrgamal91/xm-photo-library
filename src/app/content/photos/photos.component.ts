import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utility } from 'src/app/Utils/utils';
import { FavoriteImages } from 'src/app/models/fav-Images.interface';
import { PhotoService } from 'src/app/services/photos.service';

const IMAGES_PER_PAGE = 50;
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent {
  items: FavoriteImages[] = [];
  page = 1;
  isLoading: boolean = false;
  breakpoint!: number;

  constructor(
    private photoService: PhotoService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.breakpoint = Utility.handleBreakPoint(window.innerWidth);
  }

  onResize() {
    this.breakpoint = Utility.handleBreakPoint(window.innerWidth);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    let pos = this.getScrollPosition();
    let max = document.documentElement.scrollHeight;
    if (pos == max && !this.isLoading) this.loadItems();
  }

  getScrollPosition(): number {
    return (
      (document.documentElement.scrollTop || document.body.scrollTop) +
      document.documentElement.offsetHeight
    );
  }

  loadItems() {
    this.isLoading = true;
    this.photoService
      .getImages(this.page, IMAGES_PER_PAGE)
      .subscribe((items: any) => {
        console.log("items= ",items)
        this.items.push(...items);
        this.page++;
        this.isLoading = false;
      });
  }

  addToFav(item: any) {
    let favImages = JSON.parse(localStorage.getItem('favImages') || '[]');
    if (!this.photoExistInFav(favImages, item.id)) {
      favImages.push({ id: item.id, url: item.download_url });
      localStorage.setItem('favImages', JSON.stringify(favImages));
      this.displaySnackBar(false, item.id);
    } else {
      this.displaySnackBar(true);
    }
  }

  displaySnackBar(added: boolean, id?: string) {
    added
      ? this.snackBar.open(`photo is already in favorites`, '', {
          duration: 2000,
        })
      : this.snackBar.open(`photo with id : ${id} is added to favorites`, '', {
          duration: 2000,
        });
  }

  photoExistInFav(photosArr: FavoriteImages[], id: number): boolean {
    return photosArr.findIndex((obj: FavoriteImages) => obj.id === id) == -1
      ? false
      : true;
  }
}
