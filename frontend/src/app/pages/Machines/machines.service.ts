import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../api.response';
import {Machines} from './machines.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUri = 'http://localhost:8080/api/test';
  constructor(private http: HttpClient) {};

  getMachines(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUri + '/findall_article');
  }
  /*deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }*/
  createMachine(machine: Machines): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUri + '/creat_article', machine);
  }
}
