import {Component, OnInit} from '@angular/core';

import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../notification.service';

import {ActivatedRoute, ParamMap} from '@angular/router';

import {Subscription} from 'rxjs';
import {Bundle} from '../bundle.model';
import {BundleService} from '../bundle.service';

@Component({
  selector: 'app-bndl',
  templateUrl: './bundle-add.component.html',
  styleUrls: ['./bundle-add.component.css']
})
export class BundleComponent implements OnInit {
  private ordreId: string;
  private bdlupd: Subscription;
  bundleList: Bundle[];
  constructor(private service: BundleService, private notificationService: NotificationService,
              public dialogRef: MatDialogRef<BundleComponent>, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this. ordreId = paramMap.get('id');
        console.log(this. ordreId);
        this.service.getbundel(this. ordreId);
        this.bdlupd = this.service.bdlUpdt()
          .subscribe((bundles: Bundle[]) => {
            this.bundleList = bundles;
            console.log(this.bundleList);
          });
      } else {
        this. ordreId = null;
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
      if (!this.service.form.get('bundle_id').value) {
        this.router.paramMap.subscribe((paramMap: ParamMap) => {
          this. ordreId = paramMap.get('id');
          this.service.insertBundle(this.service.form.value, this. ordreId);
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



