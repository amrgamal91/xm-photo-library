import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  pendingRequest: boolean = false;
  apiUrl: string = 'https://picsum.photos/v2/';

  constructor(private http: HttpClient) {}

  getImages(page: number, perPage: number) {
    if (this.pendingRequest) {
      return {} as Observable<{}>;
    }

    this.pendingRequest = true;
    const url=`${this.apiUrl}list?page=${page}&limit=${perPage}`;
    this.pendingRequest = false;
    return this.http.get<any>(url).pipe(delay(1000));
  }
}
