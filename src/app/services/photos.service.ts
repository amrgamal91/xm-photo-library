import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { delay } from 'rxjs';
export interface FavoriteImages {
  id: string;
  url:string;
}


@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  pendingRequest: boolean = false;
  apiUrl: string = 'https://picsum.photos/v2/';
  subject$ = new BehaviorSubject<FavoriteImages[]>([]);

  constructor(private http: HttpClient) {}

  getImages(page: number, perPage: number) {
    if (this.pendingRequest) {
      return {} as Observable<{}>;
    }

    this.pendingRequest = true;
    const url = `${this.apiUrl}list?page=${page}&limit=${perPage}`;
    console.log('url=', url);
    this.pendingRequest = false;
    return this.http.get<any>(url).pipe(delay(300));
  }

  getSingleImage(id:string){
    this.pendingRequest = true;
    const url = `https://picsum.photos/id/${id}/info`;
    console.log('url=', url);
    this.pendingRequest = false;
    return this.http.get<any>(url).pipe(delay(300));
  }

  addImageToFavs(item:FavoriteImages){
    this.subject$.next([{...item}]);
  }
}
