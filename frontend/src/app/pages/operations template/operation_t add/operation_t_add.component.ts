import {Component, OnInit} from '@angular/core';
import {OperationService} from '../operation_t.service';
import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../notification.service';

@Component({
  selector: 'app-op',
  templateUrl: './operation_t_add.component.html',
  styleUrls: ['./operation_t_add.component.css']
})
export class OperationComponent implements OnInit {

  constructor(private service: OperationService, private notificationService: NotificationService,
              public dialogRef: MatDialogRef<OperationComponent>) {
  }

  ngOnInit() {
    this.service.getOperation();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('operation_template_id').value) {
        this.service.insertOperation(this.service.form.value);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Submitted successfully');
        this.onClose();
      } else {
        // this.service.updateEmployee(this.service.form.value);
        this.service.form.reset();
        this.service.initializeFormGroup();
        this.notificationService.success(':: Submitted successfully');
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
