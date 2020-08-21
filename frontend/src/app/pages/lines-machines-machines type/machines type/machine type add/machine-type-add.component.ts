import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../notification.service';
import {MachinetypeService} from '../machine type.service';

@Component({
  selector: 'app-op',
  templateUrl: './machine-type-add.component.html',
  styleUrls: ['./machine-type-add.component.css']
})
export class MachineTypeAddComponent implements OnInit {

  constructor(private service: MachinetypeService, private notificationService: NotificationService,
              public dialogRef: MatDialogRef<MachineTypeAddComponent>) {
  }

  ngOnInit() {
    this.service.getMachtype();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('mach_type_id').value) {
        this.service.insertMachtyp(this.service.form.value);
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
