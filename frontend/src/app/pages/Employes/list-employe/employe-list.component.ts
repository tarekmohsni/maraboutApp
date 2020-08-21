import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {EmployeService} from '../employe.service';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {Employe} from '../employe.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ApiResponse} from '../../api.response';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {OperationComponent} from '../../operations template/operation_t add/operation_t_add.component';
import {EmployeComponent} from '../add-employe/employe-add.component';


@Component({
  selector: 'app-list-employe',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  // Important objects
  MyDataSource: any;
  employeeList: Employe[];
  private empupd: Subscription;
  displayedColumns: string[] = ['name', 'last_name', 'adress', 'city', 'profile_image', 'action'];

  constructor(private service: EmployeService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getEmploye();
    this.empupd = this.service.empUpdt().subscribe((emp) => {
      this.employeeList = emp;
      console.log('emp', emp)
    })
  }

  onCreat() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeComponent, dialogConfig);
  }

  // To Get List Of Employee


  editEmployee(empid) {
    this.router.navigate([`/Crud/edit/${empid}`]);
  }

  deleteemp(id) {
    this.service.Deleteemp(id);
    // location.reload();
  }
}
