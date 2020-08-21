import {Component, OnInit} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../notification.service';
import {EmployeService} from '../employe.service';
import {mimeType} from './mime-type.validator';

@Component({
  selector: 'app-emp',
  templateUrl: './employe-add.component.html',
  styleUrls: ['./employe-add.component.css']
})
export class EmployeComponent implements OnInit {
  imagePreview: string | ArrayBuffer;

  constructor(private service: EmployeService, private notificationService: NotificationService,
              public dialogRef: MatDialogRef<EmployeComponent>) {
  }

  ngOnInit() {
    this.service.getEmploye();
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('emp_id').value) {
        // tslint:disable-next-line:max-line-length
        this.service.insertEmploye(this.service.form.value.emp_id, this.service.form.value.name, this.service.form.value.last_name, this.service.form.value.age, this.service.form.value.city, this.service.form.value.adress, this.service.form.value.start_working_date, this.service.form.value.last_login_date, this.service.form.value.rfid, this.service.form.value.gender, this.service.form.value.status, this.service.form.value.email, this.service.form.value.matricule, this.service.form.value.image)
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
    console.log('hfyughb');
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.service.form.patchValue({image: file});
    this.service.form.get('image').updateValueAndValidity();
    console.log(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
