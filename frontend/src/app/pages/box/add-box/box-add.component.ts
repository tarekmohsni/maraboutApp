import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ApiService} from '../box.service';


@Component({
  selector: 'app-add-box',
  templateUrl: './box-add.component.html',
  styleUrls: ['./box-add.component.css']
})
export class BoxAddComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private route: Router, private apiService: ApiService) {}

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id : [],
      label: ['', Validators.required],
      adress_mac: ['', Validators.required],
      version: ['', Validators.required]

    });
  }
  onSubmit() {
    this.apiService.createBox(this.addForm.value)
      .subscribe(data => {
        this.route.navigate(['box-add'])
      });
  }


}
