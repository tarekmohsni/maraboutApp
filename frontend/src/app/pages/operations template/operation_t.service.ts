import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ApiResponse} from '../api.response';
import {Operation} from './operation_t.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class OperationService {
  baseUri = 'http://localhost:8080/api/test';
  operationlist: Operation[];
  opsub = new Subject<Operation[]>();

  form: FormGroup = new FormGroup({
    operation_template_id: new FormControl(''),
    label: new FormControl('', Validators.required),
    op_code: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    time: new FormControl(''),
    accMinPrice: new FormControl(''),
    quantity: new FormControl(''),
    with_subsequence: new FormControl('')
  });

  constructor(private http: HttpClient, private router: Router) {
  };

  getOperation() {
    this
      .http
      .get<{ operation: Operation[] }>(`${this.baseUri + '/findall_operation_t'}`).subscribe((op) => {
      this.operationlist = op.operation;
      this.opsub.next(...[this.operationlist]);
      return op.operation;
    });
  }

  /*deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }*/


  initializeFormGroup() {
    this.form.patchValue({
      operation_template_id: null,
      label: '',
      op_code: '',
      description: '',
      time: '',
      accMinPrice: '',
      quantity: '',
      with_subsequence: '',
    });
  }

  insertOperation(operation) {
    this.http.post<{ operation: Operation }>(this.baseUri + '/creat_operation_t', operation).subscribe((op) => {
      const opt: Operation = {
        operation_template_id: op.operation.operation_template_id,
        label: operation.label,
        op_code: operation.op_code,
        description: operation.description,
        time: operation.time,
        accMinPrice: operation.accMinPrice,
        quantity: operation.quantity,
        with_subsequence: operation.with_subsequence,
      }
      this.operationlist.push(opt);
      console.log(opt);
      this.opsub.next(...[this.operationlist]);
      // this.router.navigate(['/oplist']);
      // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
  }

  DeleteOp(id: number) {
    this.http.delete(this.baseUri + '/delete/operation/' + id).subscribe(res => {


        this.operationlist = this.operationlist.filter(op => op.operation_template_id !== id);
        this.opsub.next(...[this.operationlist]);
      }
    );
  }

  opUpdt() {
    return this.opsub.asObservable();
  }


}
