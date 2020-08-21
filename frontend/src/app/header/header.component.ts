import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class headerComponent implements OnInit, OnDestroy  {
  userIsAuthenticated = false;
  private  authListenerSubs: Subscription;
  constructor(private  authService: AuthService) {
  }
  ngOnInit(): void {
    this.authListenerSubs = this.authService.getauthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;

    });
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
