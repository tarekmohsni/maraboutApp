import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {Operation} from '../operation_t.model';
import {OperationService} from '../operation_t.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {OperationComponent} from '../operation_t add/operation_t_add.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-sequence',
  templateUrl: './operation_list.component.html',
  styleUrls: ['./operation_list.component.css']
})
export class OperationlistComponent implements OnInit {
  panelOpenState = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  // Important objects
  MyDataSource: any;
  OpList: any;
  displayedColumns: string[] = ['label', 'description', 'action'];
  private opupd: Subscription;

  constructor(private service: OperationService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getOperation();
    this.opupd = this.service.opUpdt().subscribe((op) => {
      this.OpList = op;
    })

  }

  // To Get List Of sequence
  onCreat() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
   dialogConfig.width = '60%';
    this.dialog.open(OperationComponent, dialogConfig);
  }

  deleteOp(id) {
    this.service.DeleteOp(id);
  }
  applyFilter(filterValue: string) {
    this.OpList.filter = filterValue.trim().toLowerCase();
    if (this.OpList.paginator) {
      this.OpList.paginator.firstPage();
    }
  }
}
