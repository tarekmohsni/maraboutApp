import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {Router} from '@angular/router';


import {Subscription} from 'rxjs';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiResponse} from '../../api.response';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {OperationComponent} from '../../operations template/operation_t add/operation_t_add.component';

import {Ordre} from '../ordre.model';
import {OrdreService} from '../ordre.service';
import {OrdreaddComponent} from '../add-ordre/ordre-add.component';
import {MatTableDataSource} from '@angular/material/table';
import {BundleService} from '../../bundle/bundle.service';
import {BundleComponent} from '../../bundle/add-bundle/bundle-add.component';


@Component({
  selector: 'app-list-ordre',
  templateUrl: './ordre-list.component.html',
  styleUrls: ['./ordre-list.component.css']
})
export class OrdreListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  // Important objects
  ordreList: MatTableDataSource<Ordre>;
  private ordupd: Subscription;
  searchKey: string;
  displayedColumns: string[] = ['label', 'code', 'description', 'quantity', 'action'];

  constructor(private service: OrdreService, private router: Router, private dialog: MatDialog, private bdlservice: BundleService) {
  }

  ngOnInit() {
    this.service.getOrdre();
    this.ordupd = this.service.ordupdt().subscribe((ord) => {
      this.ordreList = new MatTableDataSource(ord);
      this.ordreList.paginator = this.paginator;
      this.ordreList.sort = this.sort;
    });

    this.ordreList.filterPredicate = (data, filter) => {
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
    this.dialog.open(OrdreaddComponent, dialogConfig);
  }
  onCreatbundle() {
    this.bdlservice.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(BundleComponent, dialogConfig);
  }

  // To Get List Of Employee


  /*editEmployee(empid) {
    this.router.navigate([`/Crud/edit/${empid}`]);
  }*/

 /* deleteemp(id) {
    this.service.o(id);
    // location.reload();
  }*/
  applyFilter() {
    this.ordreList.filter = this.searchKey.trim().toLowerCase();
  }

}
