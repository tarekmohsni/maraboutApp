import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {Boxs} from '../box.model';
import {BoxService} from '../box.service';
import {BoxAddComponent} from '../add-box/box-add.component';
import {BoxEditComponent} from '../edit-box/box-edit.component';


@Component({
  selector: 'app-list-machtyp',
  templateUrl: './box-list.component.html',
  styleUrls: ['./box-list.component.css']
})
export class BoxListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  // Important objects
  boxList: MatTableDataSource<Boxs>;
  private boxupd: Subscription;
  searchKey: string;
  displayedColumns: string[] = ['label', 'adress_mac', 'box_version', 'box_ip', 'mach_id', 'line_id', 'action'];

  constructor(private service: BoxService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getbox();
    this.boxupd = this.service.boxUpdt().subscribe((box) => {
      this.boxList = new MatTableDataSource(box);
      this.boxList.paginator = this.paginator;
      this.boxList.sort = this.sort;
    });

    this.boxList.filterPredicate = (data, filter) => {
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
    this.dialog.open(BoxAddComponent, dialogConfig);
  }

  // To Get List Of Employee


  /* deleteemp(id) {
     this.service.o(id);
     // location.reload();
   }*/
  applyFilter() {
    this.boxList.filter = this.searchKey.trim().toLowerCase();
  }

  onedit(row) {
    this.service.populateForm(row)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(BoxEditComponent, dialogConfig);
  }

  deletemach(id) {
    this.service.Deletebox(id);
    // location.reload();
  }
}
