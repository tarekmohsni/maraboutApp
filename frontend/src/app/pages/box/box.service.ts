import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {Boxs} from './box.model';

@Injectable({
  providedIn: 'root'
})

export class BoxService {
  baseUri = 'http://localhost:8080/api/test';
  boxlist: Boxs[];
  boxsub = new Subject<Boxs[]>();

  form: FormGroup = new FormGroup({
    box_id: new FormControl(''),
    label: new FormControl('', Validators.required),
    adress_mac: new FormControl('', Validators.required),
    box_version: new FormControl('', Validators.required),
    box_ip: new FormControl('', Validators.required),
    mach_id: new FormControl([[], []]),
    line_id: new FormControl([[], []])
  });

  constructor(private http: HttpClient, private router: Router) {
  };

  getbox() {
    this
      .http
      .get<{ box: Boxs[] }>(this.baseUri + '/findall_box').subscribe((bx) => {
      this.boxlist = bx.box;
      console.log(bx.box);
      this.boxsub.next(...[this.boxlist]);
      return bx.box;
    });
  }

  /*deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }*/


  initializeFormGroup() {
    this.form.patchValue({
      box_id: null,
      label: '',
      adress_mac: '',
      box_version: '',
      box_ip: '',
      mach_id: [],
      line_id: []
    });
  }

  insertbox(box) {
    this.http.post<{ box: Boxs }>(this.baseUri + '/creat_box', box).subscribe((bx) => {
      const boox: Boxs = {
        box_id: bx.box.box_id,
        label: box.label,
        adress_mac: box.adress_mac,
        box_version: box.box_version,
        box_ip: box.box_ip,
        mach_id: box.mach_id,
        line_id: box.line_id
      }
      this.boxlist.push(boox);
      console.log(boox);
      this.boxsub.next(...[this.boxlist]);
      // this.router.navigate(['/machintyplist']);

    });
  }

  updatebox(box_id: string,
            label: string,
            adress_mac: string,
            box_version: string,
            box_ip: string,
            mach_id: [],
            line_id: [],
  ) {
    const
      data = {
        box_id: box_id,
        label: label,
        adress_mac: adress_mac,
        box_version: box_version,
        box_ip: box_ip,
        mach_id: mach_id,
        line_id: line_id
      }
    this.http.put<{ box: Boxs }>(this.baseUri + '/update_box/' + box_id, data).subscribe((bx) => {
      console.log('ggggggg', box_id);
      const boox: Boxs = {
        box_id: bx.box.box_id,
        label: label,
        adress_mac: adress_mac,
        box_version: box_version,
        box_ip: box_ip,
        mach_id: mach_id,
        line_id: line_id
      }

      this.boxlist.push( boox);
      console.log( boox);
      this.boxsub.next(...[this.boxlist]);
    });
  }

  Deletebox(id
                   :
                   string
  ) {
    this.http.delete(this.baseUri + '/delete_box/' + id).subscribe(res => {


        this.boxlist = this.boxlist.filter(box => box.box_id !== id);
        this.boxsub.next(...[this.boxlist]);
      }
    );
  }

  boxUpdt() {
    return this.boxsub.asObservable();
  }

  populateForm(box) {
    this.form.patchValue(box);
  }


}
