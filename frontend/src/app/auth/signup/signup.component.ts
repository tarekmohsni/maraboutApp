import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';
import {Subscription} from 'rxjs';
import {Site} from '../../pages/customer-site-user/site/site.model';
import {Profile} from '../auth-data.model';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  selectedAll = false;
  profile: Profile[];
  selectedprofIds: [];
  private profupd: Subscription;

  constructor(public authService: AuthService) {}
  ngOnInit() {
    this.authStatusSub = this.authService.getauthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );

    this.authService.getprofile()
    this.profupd = this.authService.profUpdt().subscribe((op) => {
      this.profile = op;
    })
  }

  onSignup(form: NgForm) {
    if (form.invalid) {
     console.log(form.value);
    }
    this.isLoading = true;

    this.authService.createUser(form.value.email, form.value.password, form.value.username, form.value.name, form.value.profile_id);
    console.log('user', form.value.profile_id)
  }

  public onSelectAll(form: NgForm) {
    if (this.selectedAll === true) {
      const selected = this.profile.map(item => item.profile_id)
      form.value.profile_id.patchValue(selected);
    } else {
      const selected = []
      form.value.profile_id.patchValue(selected);
      console.log('false', selected)
    }
  }

  addprofile = (term) => ({profile_id: term, label: term});
  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
