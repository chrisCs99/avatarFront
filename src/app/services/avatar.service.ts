import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/user.interface';
import {Observable} from 'rxjs';
import {Avatar} from '../interfaces/avatar.interface';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  baseUrl: string = environment.api + '/feature';

  otherUrl: string = environment.api + '/avatar';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getall`);
  }

  getAllCreations(): Observable<any> {
    return this.http.get<any>(`${this.otherUrl}/all`);
  }

  createAvatar(avatar: Avatar): Observable<any> {
    return this.http.post<any>(`${this.otherUrl}/avt-add`, avatar);
  }
}
