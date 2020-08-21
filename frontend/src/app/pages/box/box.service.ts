import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../api.response';
import { Boxs} from './box.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUri = 'http://localhost:8080/api/test';
  constructor(private http: HttpClient) {};

  getBox(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUri + '/findall_box');
  }
  /*deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }*/
  createBox(box: Boxs): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUri + '/creat_box', box);
  }
}
