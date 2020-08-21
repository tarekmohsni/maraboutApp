import {Component, OnInit} from '@angular/core';
import {ApiService} from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users.list.component.html',
  styleUrls: ['./users.list.component.css']
})

export  class UsersListComponent implements  OnInit {
  Users: any = [];
  constructor(private apiService: ApiService) {
    this.readUsers();
  }
  ngOnInit(): void {}
  readUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.Users = data;
    })
  }
  /*removeUsers(user, index) {
    if(window.confirm('Are you sure')) {
      this.apiService.deleteUsers(user_id).subscribe((data) => {
        this.Users.splice(index, 1);
      })
    }
  }*/


}
