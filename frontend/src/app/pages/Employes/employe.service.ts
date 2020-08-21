import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';


import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {Employe} from './employe.model';
import {mimeType} from './add-employe/mime-type.validator';

@Injectable({
  providedIn: 'root'
})

export class EmployeService {
  baseUri = 'http://localhost:8080/api/test';
  emplist: Employe[];
  empsub = new Subject<Employe[]>();

  form: FormGroup = new FormGroup({
    emp_id: new FormControl(''),
    name: new FormControl(''),
    last_name: new FormControl(''),
    start_working_date: new FormControl(''),
    last_login_date: new FormControl(''),
    rfid: new FormControl(''),
    gender: new FormControl(''),
    status: new FormControl(''),
    email: new FormControl(''),
    adress: new FormControl(''),
    city: new FormControl(''),
    age: new FormControl(''),
    matricule: new FormControl(''),
    image: new FormControl('',  {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    })
  });

  constructor(private http: HttpClient, private router: Router) {
  };

  getEmploye() {
    this
      .http
      .get<{ employe: Employe[] }>(`${this.baseUri + '/findall_employe'}`).subscribe((emp) => {
      this.emplist = emp.employe;
      this.empsub.next(...[this.emplist]);
      console.log(this.emplist);
      return emp.employe;
    });
  }

  /*deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }*/


  initializeFormGroup() {
    this.form.patchValue({
      emp_id: null,
      name: '',
      last_name: '',
      start_working_date: '',
      last_login_date: '',
      adress: '',
      rfid: '',
      gender: '',
      city: '',
      status: '',
      age: '',
      email: '',
      matricule: '',
      image: ''
    });
  }

  // tslint:disable-next-line:max-line-length
  insertEmploye(emp_id: string, name: string, last_name: string, start_working_date: string, last_login_date: string, adress: string, rfid: string, city: string, gender: string, age: string, status: string, matricule: string, email: string, image: File) {
    const empData = new FormData();
    empData.append('name', name);
    empData.append('last_name', last_name);
    empData.append('start_working_date', start_working_date);
    empData.append('last_login_date', last_login_date);
    empData.append('adress', adress);
    empData.append('rfid', rfid);
    empData.append('age', age);
    empData.append('city', city);
    empData.append('gender', gender);
    empData.append('status', status);
    empData.append('email', email);
    empData.append('image', image, name);

    this.http.post<{ employe: Employe }>(this.baseUri + '/creat_employe', empData).subscribe((emp) => {
      const empl: Employe = {
        emp_id: emp.employe.emp_id,
        name: name,
        last_name: last_name,
        start_working_date: start_working_date,
        last_login_date: last_login_date,
        adress: adress,
        city: city,
        age: age,
        gender: gender,
        matricule: matricule,
        rfid: rfid,
        status: status,
        email: email,
        profile_image: emp.employe.profile_image
      }
      this.emplist.push(empl);
      this.empsub.next(...[this.emplist]);
      console.log('this.emplist', this.emplist)
      this.router.navigate(['/employe']);
      // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
  }

  Deleteemp(id: string) {
    this.http.delete(this.baseUri + '/delete/employe/' + id).subscribe(() => {
        const newlist = this.emplist.filter(emp => emp.emp_id !== id);
        this.emplist = newlist;
        this.empsub.next(...[this.emplist]);
        this.router.navigate(['/employe']);
      }
    );
  }

  empUpdt() {
    return this.empsub.asObservable();
  }


}





