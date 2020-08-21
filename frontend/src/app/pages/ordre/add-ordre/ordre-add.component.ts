import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrdreService} from '../ordre.service';
import {NotificationService} from '../../notification.service';
import {MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {BundleService} from '../../bundle/bundle.service';
import {Operation} from '../../operations template/operation_t.model';
import {Article} from '../../article-operation/article/article.model';
import {ArticleService} from '../../article-operation/article/article-service';
import {Subscription} from 'rxjs';
import {OperationGroupModel} from '../operation-group.model';
import {OperationService} from '../../operations template/operation_t.service';

/**
 * @title Stepper with editable steps
 */
@Component({
  selector: 'app-add-ordre',
  templateUrl: 'ordre-add.component.html',
  styleUrls: ['ordre-add.component.css']
})
export class OrdreaddComponent implements OnInit {

  isEditable = false;
  selectedAll = false;
  articles: Article[];
  selectedArticleIds: [];
  selectedAllOp = false;
  operation_templates: Operation[];
  selectedOpeartionTemplateIds: [];
  private ordreId: string;
  private artupd: Subscription;
  private opupd: Subscription;


  constructor(private _formBuilder: FormBuilder, private service: OrdreService,
              private notificationService: NotificationService,
              private artservice: ArticleService,
              private opservice: OperationService
  ) {
  }


  ngOnInit() {

    this.service.getOrdre();
    this.artservice.getArticle();
    this.artupd = this.artservice.artUpdt().subscribe((art) => {
      this.articles = art;
    })
    this.opservice.getOperation();
    this.opupd = this.opservice.opUpdt().subscribe((op) => {
      this.operation_templates = op;
    })
  }

  /*onClear() {
    this.service.form.reset();

    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }*/


  onSubmit() {
    this.service.insertOrdre(this.service.form.value.label, this.service.form.value.code, this.service.form.value.description,
      this.service.form.value.ordrequantity, this.service.form.value.articless, this.service.form.value.bundles);
    console.log('kkkkkk');
    console.log(this.service.form);
    this.notificationService.success(':: Submitted successfully');


  }

  public onSelectAll() {
    if (this.selectedAll === true) {
      const selected = this.articles.map(item => item.article_id)
      this.service.form.get('articless').patchValue(selected);
    } else {
      const selected = []
      this.service.form.get('articless').patchValue(selected);
      console.log('false', selected)
    }
  }

  addOrdreArticles = (term) => ({article_id: term, label: term});

  onClose() {
    // this.service.initializeFormGroup();

  }

  public onSelectAllOp() {
    if (this.selectedAllOp === true) {
      const selected = this.operation_templates.map(item => item.operation_template_id)
      this.service.form.get('operation_id').patchValue(selected);
    } else {
      const selected = []
      this.service.form.get('operation_id').patchValue(selected);
      console.log('false', selected)
    }
  }
  addOperationTemplate = (term) => ({operation_template_id: term, label: term});
}



