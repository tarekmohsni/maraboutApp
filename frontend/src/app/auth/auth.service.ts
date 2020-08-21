import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData, LoginAuth} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  private isAuthenticated = false;
  private  token: string;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}

  getToken () {
   // console.log("token", this.token);
    return this.token;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getauthStatusListener () {
    return this.authStatusListener.asObservable();
  }

  // signup

 createUser(email: string, password: string, username: string, name: string ) {
   const authData: AuthData = {email: email, password: password, username: username, name: name};
     this.http
       .post('http://localhost:8080/api/auth/signup', authData).subscribe(() => {
         this.router.navigate(['/']);
     }, error => {
         this.authStatusListener.next(false)     });
 }

 // login

 login(email: string, password: string) {
   const loginAuth: LoginAuth = {email: email, password: password};
   this.http.post<{accessToken: string}>('http://localhost:8080/api/auth/signin', loginAuth)
     .subscribe(response => {
       const token = response.accessToken;
       this.token = token;
       console.log('token', this.token);
       if (token) {
         this.isAuthenticated = true;
         this.authStatusListener.next(true);
         this.router.navigate(['/dashboard']);
       }
     },error => {
       this.authStatusListener.next(false);
     });

 }
 // logout
 logout () {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
   this.router.navigate(['/login']);

 }
}
