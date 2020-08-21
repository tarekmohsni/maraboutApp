import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../notification.service';
import {ArticleService} from '../article-service';
import {Operation} from '../../../operations template/operation_t.model';
import {FormGroup} from '@angular/forms';
import {OperationService} from '../../../operations template/operation_t.service';
import {Sequence} from '../../../sequences/sequence.model';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-op',
  templateUrl: './article-add.component.html',
  styleUrls: ['./article-add.component.css']

})
export class ArticleComponent implements OnInit {
  selectedAll = false;
  operation_templates: Operation[];
  selectedOpeartionTemplateIds: [];
  private opupd: Subscription;

  constructor(private service: ArticleService, private notificationService: NotificationService,
              public dialogRef: MatDialogRef<ArticleComponent>,
              private opservice: OperationService) {
  }

  ngOnInit() {
    this.opservice.getOperation()
    this.opupd = this.opservice.opUpdt().subscribe((op) => {
      this.operation_templates = op;
    })

  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('article_id').value) {
        // tslint:disable-next-line:max-line-length
        this.service.insertArticle(this.service.form.value.article_name, this.service.form.value.code, this.service.form.value.description, this.service.form.value.operation_templatess);
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

  public onSelectAll() {
    if (this.selectedAll === true) {
      const selected = this.operation_templates.map(item => item.operation_template_id)
      this.service.form.get('operation_templatess').patchValue(selected);
    } else {
      const selected = []
      this.service.form.get('operation_templatess').patchValue(selected);
      console.log('false', selected)
    }
  }

  addArticleOperationTemplate = (term) => ({operation_template_id: term, label: term});

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
