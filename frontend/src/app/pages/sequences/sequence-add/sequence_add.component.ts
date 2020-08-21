import {Component, OnInit} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';
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
              public dialogRef: MatDialogRef<SequenceComponent>, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.operationId = paramMap.get('id');
        console.log(this.operationId);
        this.service.getSequence(this.operationId);
        this.sequpd = this.service.seqUpdt()
          .subscribe((sequences: Sequence[]) => {
            this.sequenceList = sequences;
            console.log(this.sequenceList);
          });
      } else {
        this.operationId = null;
      }
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
        this.router.paramMap.subscribe((paramMap: ParamMap) => {
          this.operationId = paramMap.get('id');
        this.service.insertSequence(this.service.form.value, this.operationId);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Submitted successfully');
        this.onClose();
        });
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



