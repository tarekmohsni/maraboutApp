import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData, LoginAuth, Profile} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {Sequence} from '../pages/sequences/sequence.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  baseUri = 'http://localhost:8080/api/test';
  proflist: Profile[];
  profsub = new Subject<Profile[]>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getToken() {
    // console.log("token", this.token);
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getauthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // get all profile
  getprofile() {
    this
      .http
      .get<{ profile: Profile[] }>(this.baseUri + '/findall_profileeee').subscribe((prof) => {
      this.proflist = prof.profile;
      console.log('prof', this.proflist)
      this.profsub.next(...[this.proflist]);
      return prof.profile;
    });
  }

  // signup

  createUser(email: string, password: string, username: string, name: string, profile_id: []) {
    const authData: AuthData = {email: email, password: password, username: username, name: name, profile_id: profile_id};
    this.http
      .post('http://localhost:8080/api/auth/signup', authData).subscribe(() => {
      this.router.navigate(['/']);
    }, error => {
      this.authStatusListener.next(false)
    });
  }

  // login

  login(email: string, password: string) {
    const loginAuth: LoginAuth = {email: email, password: password};
    this.http.post<{ accessToken: string }>('http://localhost:8080/api/auth/signin', loginAuth)
      .subscribe(response => {
        const token = response.accessToken;
        this.token = token;
        console.log('token', this.token);
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/dashboard']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  profUpdt() {
    return this.profsub.asObservable();
  }

  // logout
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);

  }
}
