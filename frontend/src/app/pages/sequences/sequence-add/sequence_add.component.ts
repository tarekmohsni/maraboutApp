import {Component, Inject, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../notification.service';
import {SequenceService} from '../sequence.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Sequence} from '../sequence.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-op',
  templateUrl: './sequence_add.component.html',
  styleUrls: ['./sequence_add.component.css']
})
export class SequenceComponent implements OnInit {
  private operationId: string;
  private sequpd: Subscription;
  sequenceList: Sequence[];

  constructor(private service: SequenceService, private notificationService: NotificationService,
              public dialogRef: MatDialogRef<SequenceComponent>, private router: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) public opid: any) {

  }

  ngOnInit() {
    console.log('oppppppiddd', this.opid.opid);
    this.service.getSequence(this.opid.opid);
    this.sequpd = this.service.seqUpdt()
      .subscribe((sequences: Sequence[]) => {
        this.sequenceList = sequences;
        console.log(this.sequenceList);

      });
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('sequence_id').value) {

        this.service.insertSequence(this.service.form.value, this.opid.opid);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Submitted successfully');
        this.onClose();

      } else {
        // this.service.updateEmployee(this.service.form.value);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Submitted failed');
        this.onClose();
      }
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}



