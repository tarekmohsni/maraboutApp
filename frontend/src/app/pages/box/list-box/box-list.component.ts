import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../box.service';


@Component({
  selector: 'app-list-user',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.css']
})
export class BoxListComponent implements OnInit {
  box: any = [];
  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getBox()
      .subscribe( data => {
        this.box = data;
      });

  };
  addBox(): void {
    this.router.navigate(['box-add']);
  };
}

