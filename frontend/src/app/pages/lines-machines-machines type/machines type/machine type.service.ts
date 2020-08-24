import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {Machinestype} from './machine type.model';

@Injectable({
  providedIn: 'root'
})

export class MachinetypeService {
  baseUri = 'http://localhost:8080/api/test';
  machtypelist: Machinestype[];
  machsub = new Subject<Machinestype[]>();

  form: FormGroup = new FormGroup({
    mach_type_id: new FormControl(''),
    description: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required)
  });

  constructor(private http: HttpClient, private router: Router) {
  };

  getMachtype() {
    this
      .http
      .get<{ machine_type: Machinestype[] }>(this.baseUri + '/findall_machtyp').subscribe((mach) => {
      this.machtypelist = mach.machine_type;
      console.log(mach.machine_type);
      this.machsub.next(...[this.machtypelist]);
      return mach.machine_type;
    });
  }

  /*deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }*/


  initializeFormGroup() {
    this.form.patchValue({
      mach_type_id: null,
      type: '',
      description: ''
    });
  }

  insertMachtyp(machin) {
    this.http.post<{ machine: Machinestype }>(this.baseUri + '/creat_machtyp', machin).subscribe((mach) => {
      const machtyp: Machinestype = {
        mach_type_id: mach.machine.mach_type_id,
        type: machin.type,
        description: machin.description,
      }
      this.machtypelist.push(machtyp);
      console.log(machtyp);
      this.machsub.next(...[this.machtypelist]);
      // this.router.navigate(['/machintyplist']);
      // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
  }

  updateMachtyp(mach_type_id: string, type: string, description: string) {
    const data = {
      mach_type_id: mach_type_id,
      type: type,
      description: description
    }
    this.http.put<{ machine_type: Machinestype }>(this.baseUri + '/update_machtyp/' + mach_type_id, data).subscribe((mach) => {
      console.log('ggggggg', mach_type_id);
      const machtyp: Machinestype = {
        mach_type_id: mach_type_id,
        type: type,
        description: description,
      }

      this.machtypelist.push(machtyp);
      console.log(machtyp);
      this.machsub.next(...[this.machtypelist]);
    });
  }

  Deletemachtype(id: string) {
    this.http.delete(this.baseUri + '/delete/operation/' + id).subscribe(res => {


        this.machtypelist = this.machtypelist.filter(mach => mach.mach_type_id !== id);
        this.machsub.next(...[this.machtypelist]);
      }
    );
  }

  machUpdt() {
    return this.machsub.asObservable();
  }

  populateForm(machin) {
    this.form.patchValue(machin);
  }


}
