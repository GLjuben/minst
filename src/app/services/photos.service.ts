import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { iphotos } from 'src/app/interfaces/iphotos.interface';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  baseUrl: string = 'http://jsonplaceholder.typicode.com';

  constructor(private _http: HttpClient) {}

  getphotos(): Observable<iphotos[]> {
    return this._http.get<iphotos[]>(`${this.baseUrl}/photos`);
  }

  postphoto(data: iphotos): Observable<iphotos> {
    return this._http.post<iphotos>(`${this.baseUrl}/photos`, data);
  }

  putphoto(id: number, data: iphotos): Observable<iphotos> {
    return this._http.put<iphotos>(`${this.baseUrl}/photos/${id}`, data);
  }

  deletephotoById(id: number): Observable<iphotos> {
    return this._http.delete<iphotos>(`${this.baseUrl}/photos/${id}`);
  }
}
