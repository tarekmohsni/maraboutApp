import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../machines.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './machine-add.component.html',
  styleUrls: ['./machine-add.component.css']
})
export class MachineAddComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private route: Router, private apiService: ApiService) {}

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id : [],
      label: ['', Validators.required],
      description: ['', Validators.required]

    });
  }
  onSubmit() {
    this.apiService.createMachine(this.addForm.value)
      .subscribe(data => {
        this.route.navigate(['machines-add'])
      });
  }


}
