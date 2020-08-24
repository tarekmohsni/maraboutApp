import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../notification.service';

import {BoxService} from '../box.service';
import {Customer} from '../../customer-site-user/customer/customer.model';
import {Subscription} from 'rxjs';
import {Machine} from '../../lines-machines-machines type/machines/machine.model';
import {Lines} from '../../lines-machines-machines type/lines/lines.model';
import {LinesService} from '../../lines-machines-machines type/lines/lines.service';
import {MachineService} from '../../lines-machines-machines type/machines/machines.service';

@Component({
  selector: 'app-mach',
  templateUrl: './box-edit.component.html',
  styleUrls: ['./box-edit.component.css']
})
export class BoxEditComponent implements OnInit {
// machine
  selectedAllmach = false;
  machine: Machine[];
  selectedmachineIds: [];
  private machpd: Subscription;

  // line
  selectedAllline = false;
  lines: Lines[];
  selectedlineIds: [];
  private lineupd: Subscription;

  constructor(private service: BoxService, private notificationService: NotificationService,
              public dialogRef: MatDialogRef<BoxEditComponent>,
              private lineservice: LinesService, private machineservice: MachineService) {
  }

  ngOnInit() {
    this.service.getbox();
    // list machines
    this.machineservice.getmachine();
    this.machpd = this.machineservice.machinUpdt().subscribe((mach) => {
      this.machine = mach;
    })
    // list lines
    this.lineservice.getline();
    this.lineupd = this.lineservice.lineUpdt().subscribe((lin) => {
      this.lines = lin;
    })
  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('box_id').value) {
        this.service.updatebox(this.service.form.value.box_id,
          this.service.form.value.label,
          this.service.form.value.adress_mac,
          this.service.form.value.box_version,
          this.service.form.value.box_ip,
          this.service.form.value.mach_id,
          this.service.form.value.line_id);
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

  // select machine
  public onSelectAllmach() {
    if (this.selectedAllmach === true) {
      const selected = this.machine.map(item => item.mach_id)
      this.service.form.get('mach_id').patchValue(selected);
    } else {
      const selected = []
      this.service.form.get('mach_id').patchValue(selected);
      console.log('false', selected)
    }
  }

  addmachine = (term) => ({mach_id: term, label: term});

  // select line
  public onSelectAllline() {
    if (this.selectedAllline === true) {
      const selected = this.lines.map(item => item.line_id)
      this.service.form.get('line_id').patchValue(selected);
    } else {
      const selected = []
      this.service.form.get('line_id').patchValue(selected);
      console.log('false', selected)
    }
  }

  addline = (term) => ({line_id: term, label: term});

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
