import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Bundle} from './bundle.model';

@Injectable({
  providedIn: 'root'
})

export class BundleService {
  baseUri = 'http://localhost:8080/api/test';
  bundlelist: Bundle[];
  bndlsub = new Subject<Bundle[]>();

  form: FormGroup = new FormGroup({
    bundle_id: new FormControl(''),
    num_bundle: new FormControl(''),
    size: new FormControl(''),
    quantity: new FormControl('')
  });

  constructor(private http: HttpClient, private router: Router) {
  };

  getbundel(id: string) {
    console.log(id);
    this
      .http
      .get<{ bundle: Bundle[] }>(this.baseUri + '/findall_bundle/' + id).subscribe((bdl) => {
      this.bundlelist = bdl.bundle;
      console.log(this.bundlelist);
      this.bndlsub.next(...[this.bundlelist]);
      return bdl.bundle;
    });
  }

  /*deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }*/


  initializeFormGroup() {
    this.form.patchValue({
      bundle_id: null,
      size: '',
      num_bundle: '',
      quantity: ''
    });
  }

  insertBundle(bundle, id: string) {
    this.http.post<{ bundle: Bundle }>(this.baseUri + '/creat_bundle/' + id, bundle).subscribe((bdl) => {
      const bndl: Bundle = {
        bundle_id: bdl.bundle.bundle_id,
        size: bundle.size,
        num_bundle: bundle.number,
        quantity: bundle.quantity,
        operation_groupe: bundle.operation_group
        // ord_id: bundle.ord_id,
      }
      this.bundlelist.push(bndl);
      console.log(bndl);
      this.bndlsub.next(...[this.bundlelist]);
      // this.router.navigate(['/seqlist/:id']);
      // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
  }

 /* DeleteOp(id: number) {
    this.http.delete(this.baseUri + '/delete/operation/' + id).subscribe(res => {


        this.sequencelist = this.sequencelist.filter(seq => seq.sequence_id !== id);
        this.seqsub.next(...[this.sequencelist]);
      }
    );
  }*/

  bdlUpdt() {
    return this.bndlsub.asObservable();
  }


}
