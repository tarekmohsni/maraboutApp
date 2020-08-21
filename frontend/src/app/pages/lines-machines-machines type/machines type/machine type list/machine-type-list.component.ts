import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {Router} from '@angular/router';


import {Subscription} from 'rxjs';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {MatDialog, MatDialogConfig} from '@angular/material/dialog';




import {MatTableDataSource} from '@angular/material/table';

import {MachinetypeService} from '../machine type.service';
import {Machinestype} from '../machine type.model';
import {MachineTypeAddComponent} from '../machine type add/machine-type-add.component';


@Component({
  selector: 'app-list-machtyp',
  templateUrl: './machine-type-list.component.html',
  styleUrls: ['./machine-type-list.component.css']
})
export class MachineTypeListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  // Important objects
  machintypList: MatTableDataSource<Machinestype>;
  private machupd: Subscription;
  searchKey: string;
  displayedColumns: string[] = ['type', 'description', 'action'];

  constructor(private service: MachinetypeService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getMachtype();
    this.machupd = this.service.machUpdt().subscribe((mach) => {
      this.machintypList = new MatTableDataSource(mach);
      this.machintypList.paginator = this.paginator;
      this.machintypList.sort = this.sort;
    });

    this.machintypList.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {
        return ele !== 'actions' && data[ele].toLowerCase().indexOf(filter) !== -1;
      });
    };
  }

  onCreat() {
    // this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(MachineTypeAddComponent, dialogConfig);
  }

  // To Get List Of Employee



  /* deleteemp(id) {
     this.service.o(id);
     // location.reload();
   }*/
  applyFilter() {
    this.machintypList.filter = this.searchKey.trim().toLowerCase();
  }

}
