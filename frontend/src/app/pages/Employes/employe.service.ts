import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';


import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {Employe} from './employe.model';
import {mimeType} from './Operators/add-employe/mime-type.validator';

@Injectable({
  providedIn: 'root'
})

export class EmployeService {
  baseUri = 'http://localhost:8080/api/test';
  oplist: Employe[];
  opsub = new Subject<Employe[]>();
  // sup
  suplist: Employe[];
  supsub = new Subject<Employe[]>();
  // mechanics
  mechalist: Employe[];
  mechasub = new Subject<Employe[]>();
  // electronics
  eleclist: Employe[];
  elecsub = new Subject<Employe[]>();

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
    image: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [mimeType]
    })
  });

  constructor(private http: HttpClient, private router: Router) {
  };

// get all operators
  getEmploye() {
    this
      .http
      .get<{ employe: Employe[] }>(`${this.baseUri + '/findall_Operateurs'}`).subscribe((emp) => {
      this.oplist = emp.employe;
      this.opsub.next(...[this.oplist]);
      console.log(this.oplist);
      return emp.employe;
    });
  };

  // get all supervisors
  getSup() {
    this
      .http
      .get<{ employe: Employe[] }>(`${this.baseUri + '/findall_Supervisors'}`).subscribe((emp) => {
      this.suplist = emp.employe;
      this.supsub.next(...[this.suplist]);
      console.log(this.suplist);
      return emp.employe;
    });
  }

  // get all mechanics
  getMecha() {
    this
      .http
      .get<{ employe: Employe[] }>(`${this.baseUri + '/findall_Mechanics'}`).subscribe((emp) => {
      this.mechalist = emp.employe;
      this.mechasub.next(...[this.mechalist]);
      console.log(this.mechalist);
      return emp.employe;
    });
  }

  // get all electronics
  getelec() {
    this
      .http
      .get<{ employe: Employe[] }>(`${this.baseUri + '/findall_Electronics'}`).subscribe((emp) => {
      this.eleclist = emp.employe;
      this.elecsub.next(...[this.eleclist]);
      console.log(this.eleclist);
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
// insert Operators
  insertEmploye(emp_id: string, name: string, last_name: string, start_working_date: string,
                last_login_date: string, adress: string, rfid: string, city: string,
                gender: string, age: string, status: string, matricule: string,
                email: string, image: File) {
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

    this.http.post<{ employe: Employe }>(this.baseUri + '/creat_Operateurs', empData).subscribe((emp) => {
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
      this.oplist.push(empl);
      this.opsub.next(...[this.oplist]);
      console.log('this.emplist', this.oplist)
      this.router.navigate(['/employe']);
      // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
  }

  // insert Supervisors
  insertSuper(emp_id: string, name: string, last_name: string, start_working_date: string,
                last_login_date: string, adress: string, rfid: string, city: string,
                gender: string, age: string, status: string, matricule: string,
                email: string, image: File) {
    const supData = new FormData();
    supData.append('name', name);
    supData.append('last_name', last_name);
    supData.append('start_working_date', start_working_date);
    supData.append('last_login_date', last_login_date);
    supData.append('adress', adress);
    supData.append('rfid', rfid);
    supData.append('age', age);
    supData.append('city', city);
    supData.append('gender', gender);
    supData.append('status', status);
    supData.append('email', email);
    supData.append('image', image, name);

    this.http.post<{ employe: Employe }>(this.baseUri + '/creat_Supervisors', supData).subscribe((emp) => {
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
      this.suplist.push(empl);
      this.supsub.next(...[this.suplist]);
      console.log('this.emplist', this.suplist)
      this.router.navigate(['/employe']);
      // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
  }

  // insert Mechanics
  insertmechanics(emp_id: string, name: string, last_name: string, start_working_date: string,
                last_login_date: string, adress: string, rfid: string, city: string,
                gender: string, age: string, status: string, matricule: string,
                email: string, image: File) {
    const mechData = new FormData();
    mechData.append('name', name);
    mechData.append('last_name', last_name);
    mechData.append('start_working_date', start_working_date);
    mechData.append('last_login_date', last_login_date);
    mechData.append('adress', adress);
    mechData.append('rfid', rfid);
    mechData.append('age', age);
    mechData.append('city', city);
    mechData.append('gender', gender);
    mechData.append('status', status);
    mechData.append('email', email);
    mechData.append('image', image, name);

    this.http.post<{ employe: Employe }>(this.baseUri + '/creat_Mechanics', mechData).subscribe((emp) => {
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
      this.mechalist.push(empl);
      this.mechasub.next(...[this.mechalist]);
      console.log('this.emplist', this.mechalist)
      this.router.navigate(['/employe']);
      // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
  }

  // insert electronics
  insertelect(emp_id: string, name: string, last_name: string, start_working_date: string,
                last_login_date: string, adress: string, rfid: string, city: string,
                gender: string, age: string, status: string, matricule: string,
                email: string, image: File) {
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

    this.http.post<{ employe: Employe }>(this.baseUri + '/creat_Electronics', empData).subscribe((emp) => {
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
      this.eleclist.push(empl);
      this.elecsub.next(...[this.eleclist]);
      console.log('this.emplist', this.eleclist)
      this.router.navigate(['/employe']);
      // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
  }

  // edit
  editemp(emp_id: string, name: string, last_name: string, start_working_date: string,
              last_login_date: string, adress: string, rfid: string, city: string,
              gender: string, age: string, status: string, matricule: string,
              email: string, image: File) {
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

    this.http.post<{ employe: Employe }>(this.baseUri + '/creat_Electronics', empData).subscribe((emp) => {
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
      this.eleclist.push(empl);
      this.elecsub.next(...[this.eleclist]);
      console.log('this.emplist', this.eleclist)
      this.router.navigate(['/employe']);
      // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
  }
  populateForm(emp) {
    this.form.patchValue(emp);
  }

  Deleteemp(id: string) {
    this.http.delete(this.baseUri + '/delete/employe/' + id).subscribe(() => {
        const newlist = this.oplist.filter(emp => emp.emp_id !== id);
        this.oplist = newlist;
        this.opsub.next(...[this.oplist]);
        this.router.navigate(['/employe']);
      }
    );
  }

  empUpdt() {
    return this.opsub.asObservable();
  }
  supUpdt() {
    return this.supsub.asObservable();
  }
  mechUpdt() {
    return this.mechasub.asObservable();
  }
  electUpdt() {
    return this.elecsub.asObservable();
  }


}





