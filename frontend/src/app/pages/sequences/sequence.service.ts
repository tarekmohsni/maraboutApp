import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {Sequence} from './sequence.model';

@Injectable({
  providedIn: 'root'
})

export class SequenceService {
  baseUri = 'http://localhost:8080/api/test';
  sequencelist: Sequence[];
  seqsub = new Subject<Sequence[]>();

  form: FormGroup = new FormGroup({
    sequence_id: new FormControl(''),
    description: new FormControl('', Validators.required),
    second_back_stitch: new FormControl('', Validators.required),
    back_stitch: new FormControl(''),
    back_stitch_positive_tolerence: new FormControl(''),
    back_stitch_negative_tolerence: new FormControl(''),
    stitchcount: new FormControl(''),
    stitchcount_positive_tolerence: new FormControl(''),
    stitchcount_negative_tolerence: new FormControl(''),
    sequence_ordre: new FormControl(''),
    coupe_fil: new FormControl(''),
    picture_id: new FormControl(''),
    parent_sequence: new FormControl(''),
    active: new FormControl(''),
    with_subsequences: new FormControl('')
  });

  constructor(private http: HttpClient, private router: Router) {
  };

  getSequence(id: string) {
    console.log(id);
    this
      .http
      .get<{ sequence: Sequence[] }>(this.baseUri + '/findall_sequence/' + id).subscribe((seq) => {
      this.sequencelist = seq.sequence;
      console.log(this.sequencelist)
      this.seqsub.next(...[this.sequencelist]);
      return seq.sequence;
    });
  }

  /*deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }*/


  initializeFormGroup() {
    this.form.patchValue({
      sequence_id: null,
      second_back_stitch: '',
      back_stitch: '',
      description: '',
      back_stitch_positive_tolerence: '',
      back_stitch_negative_tolerence: '',
      stitchcount: '',
      stitchcount_positive_tolerence: '',
      stitchcount_negative_tolerence: '',
      sequence_ordre: '',
      coupe_fil: '',
      picture_id: '',
      parent_sequence: '',
      active: '',
      with_subsequences: '',
    });
  }

  insertSequence(sequence, id: string) {
    this.http.post<{ sequence: Sequence }>(this.baseUri + '/creat-sequence/' + id, sequence).subscribe((seq) => {
      const seqc: Sequence = {
        sequence_id: seq.sequence.sequence_id,
        second_back_stitch: sequence.second_back_stitch,
        back_stitch: sequence.back_stitch,
        description: sequence.description,
        back_stitch_positive_tolerence: sequence.back_stitch_positive_tolerence,
        back_stitch_negative_tolerence: sequence.back_stitch_negative_tolerence,
        stitchcount: sequence.stitchcount,
        stitchcount_positive_tolerence: sequence.stitchcount_positive_tolerence,
        stitchcount_negative_tolerence: sequence.stitchcount_negative_tolerence,
        sequence_ordre: sequence.sequence_ordre,
        coupe_fil: sequence.coupe_fil,
        picture_id: sequence.picture_id,
        parent_sequence: sequence.parent_sequence,
        active: sequence.active,
        with_subsequences: sequence.with_subsequences,
        operation_id: sequence.operation_id,
      }
      this.sequencelist.push(seqc);
      console.log(seqc);
      this.seqsub.next(...[this.sequencelist]);
      this.router.navigate(['/seqlist/:id']);
      // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
  }

  DeleteOp(id: number) {
    this.http.delete(this.baseUri + '/delete/operation/' + id).subscribe(res => {


        this.sequencelist = this.sequencelist.filter(seq => seq.sequence_id !== id);
        this.seqsub.next(...[this.sequencelist]);
      }
    );
  }

  seqUpdt() {
    return this.seqsub.asObservable();
  }


}
