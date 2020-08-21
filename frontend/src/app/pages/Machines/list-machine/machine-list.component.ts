import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../machines.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {
  machines: any = [];
  constructor(private router: Router, private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.getMachines()
      .subscribe( data => {
        this.machines = data;
      });

  };
  addMachine(): void {
    this.router.navigate(['machines-add']);
  };


}
