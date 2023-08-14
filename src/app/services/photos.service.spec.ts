import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PhotoService } from './photos.service';
import { TestBed } from '@angular/core/testing';

const photosArray = [
  {
    author: 'Alejandro Escamilla',
    download_url: 'https://picsum.photos/id/0/5000/3333',
    height: 3333,
    id: '0',
    url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
    width: 5000,
  },
  {
    author: 'Alejandro Escamilla',
    download_url: 'https://picsum.photos/id/1/5000/3333',
    height: 3333,
    id: '1',
    url: 'https://unsplash.com/photos/LNRyGwIJr5c',
    width: 5000,
  },
  {
    author: 'Alejandro Escamilla',
    download_url: 'https://picsum.photos/id/2/5000/3333',
    height: 3333,
    id: '2',
    url: 'https://unsplash.com/photos/N7XodRrbzS0',
    width: 5000,
  },
];

const singleImage = {
  author: 'Alejandro Escamilla',
  download_url: 'https://picsum.photos/id/2/5000/3333',
  height: 3333,
  id: '2',
  url: 'https://unsplash.com/photos/N7XodRrbzS0',
  width: 5000,
};

describe('PhotosService', () => {
  let service: PhotoService;
  let httpController: HttpTestingController;

  let url = 'https://picsum.photos/v2/';
  let singleImageUrl = `https://picsum.photos/id`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PhotoService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should call getImages and return an array of Images', () => {
    service.getImages(1, 3).subscribe((res) => {
      expect(res).toEqual(photosArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}list?page=1&limit=3`,
    });

    req.flush(photosArray);
  });

  it('should call getSingleImage and return the appropriate photo', () => {
    const id = '2';

    service.getSingleImage(id).subscribe((data) => {
      expect(data).toEqual(singleImage);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${singleImageUrl}/${id}/info`,
    });

    req.flush(singleImage);
  });
});
