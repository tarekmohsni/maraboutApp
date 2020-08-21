import {Injectable} from '@angular/core';

import {Subject} from 'rxjs';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

import {Ordre} from './ordre.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Bundle} from '../bundle/bundle.model';
import {OperationGroupModel} from './operation-group.model';
import {Article} from '../article-operation/article/article.model';


@Injectable({
  providedIn: 'root'
})

export class OrdreService {
  baseUri = 'http://localhost:8080/api/test';
  ordrelist: Ordre[];
  ordresub = new Subject<Ordre[]>();
  bundelsub = new Subject<Bundle[]>();
  oplist: any[];
  art: Article[];
  datasub = new Subject<any[]>();
  artsub = new Subject<Article[]>();

  public form: FormGroup;

  private formBuilder: FormBuilder;

  constructor(private http: HttpClient, private router: Router, formBuilder: FormBuilder) {
    this.formBuilder = formBuilder;

    this.form = this.formBuilder.group({
      label: new FormControl(''),
      code: new FormControl(''),
      description: new FormControl(''),
      ordrequantity: new FormControl(''),
      articless: new FormControl([[], []]),
      bundles: this.formBuilder.array([this.createbundle()])
    });
  }

  createbundle(): FormGroup {
    return this.formBuilder.group({
      num_bundle: new FormControl(''),
      size: new FormControl(''),
      quantity: new FormControl(''),
      Operations_group: this.formBuilder.array([this.createOpgrp()]),
    });
  };

  createOpgrp(): FormGroup {
    return this.formBuilder.group({
      line_id: new FormControl([[], []]),
      operation_id: new FormControl([[], []])
    })
  }

  public addOpGrp(bundle: FormControl): void {
    const Operations_group = this.getOpGrp(bundle);
    Operations_group.push(
      this.formBuilder.group({
        line_id: [],
        operation_id: [],
        Operations_group: this.formBuilder.array([])
      })
    );

  }

  // get all ordre
  getOrdre() {
    this
      .http
      .get<{ ordre: Ordre[] }>(`${this.baseUri + '/findall_ordre'}`).subscribe((ord) => {
      this.ordrelist = ord.ordre;
      this.ordresub.next(...[this.ordrelist]);
      return ord.ordre;
    });
  }

  // get details ordre by id

  getdata(id: string) {
    this.http.get<{ Op_t: any[], art: Article[] }>(`${this.baseUri + '/find_ordre/' + id}`).subscribe((dat) => {
      this.oplist = dat.Op_t;
      this.art = dat.art;
      console.log(this.art);
      this.datasub.next(...[this.oplist]);
      this.artsub.next(...[this.art]);
      // this.art = dat.data;

    })

  }


  insertOrdre(label: string,
              code: string,
              description: string,
              ordrequantity: string,
              articless: [],
              bundles: Bundle[]) {
    const data = {
      'label': label,
      'code': code,
      'description': description,
      'ordrequantity': ordrequantity,
      'articless': articless,
      'bundles': bundles
    };
    this.http.post<{ data: Ordre }>(this.baseUri + '/creat_ordre', data).subscribe((ord) => {
      const order: Ordre = {
        ordre_id: ord.data.ordre_id,
        label: label,
        code: code,
        description: description,
        articless: articless,
        ordrequantity: ordrequantity,
        bundles: bundles
      };
      console.log('ggggg');
      this.ordrelist.push(order);
      this.ordresub.next(...[this.ordrelist]);
      console.log(this.ordrelist);
      this.router.navigate(['/ordrelist']);
    });
  }

  ordupdt() {
    return this.ordresub.asObservable();
  }

  datupdt() {
    return this.datasub.asObservable();
  }

  artupdt() {
    return this.artsub.asObservable();
  }

  bundlupdt() {
    return this.bundelsub.asObservable();
  }

  public removeOp_group(bundle: FormControl, opgrp: FormControl): void {

    // Critical: casts as FormArray.
    this.removeFromCollection(this.getOpGrp(bundle), opgrp);

  }

  private removeFromCollection(collection: FormArray, item: FormControl): void {

    collection.removeAt(collection.controls.indexOf(item));

  }


  public getbndl(): FormArray {
    return (this.form.get('bundles') as FormArray);
  }

  public getOpGrp(bundle: FormControl): FormArray {
    return (bundle.get('Operations_group') as FormArray);

  }

}
