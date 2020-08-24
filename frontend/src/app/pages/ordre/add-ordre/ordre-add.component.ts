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
import {LinesService} from '../../lines-machines-machines type/lines/lines.service';
import {Lines} from '../../lines-machines-machines type/lines/lines.model';
import {Customer} from '../../customer-site-user/customer/customer.model';
import {CustomerService} from '../../customer-site-user/customer/customer.service';

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
  selectedAllline = false;
  lines: Lines[];
  selectedlineIds: [];
  selectedAllclient = false;
  clients: Customer[];
  selectedclientIds: [];
  private ordreId: string;
  private artupd: Subscription;
  private opupd: Subscription;
  private linupd: Subscription;
  private clientupd: Subscription;


  constructor(private _formBuilder: FormBuilder, private service: OrdreService,
              private notificationService: NotificationService,
              private artservice: ArticleService,
              private opservice: OperationService,
              private lineservice: LinesService,
              private clientservice: CustomerService
  ) {
  }


  ngOnInit() {

    // this.service.getOrdre();
    this.artservice.getArticle();
    this.artupd = this.artservice.artUpdt().subscribe((art) => {
      this.articles = art;
    })
    this.opservice.getOperation();
    this.opupd = this.opservice.opUpdt().subscribe((op) => {
      this.operation_templates = op;
    })
    this.lineservice.getline();
    this.linupd = this.lineservice.lineUpdt().subscribe((lin) => {
      this.lines = lin;
    })

    this.clientservice.getcustomer();
    this.clientupd = this.clientservice.custmUpdt().subscribe((client) => {
      this.clients = client;
    })
  }

  /*onClear() {
    this.service.form.reset();

    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }*/


  onSubmit() {
    this.service.insertOrdre(this.service.form.value.label, this.service.form.value.code, this.service.form.value.description,

      this.service.form.value.ordrequantity, this.service.form.value.article_id, this.service.form.value.client_id,
      this.service.form.value.bundles);
    console.log('ordre');
    console.log(this.service.form);
    this.notificationService.success(':: Submitted successfully');


  }

  public onSelectAll() {
    if (this.selectedAll === true) {
      const selected = this.articles.map(item => item.article_id)
      this.service.form.get('article_id').patchValue(selected);
    } else {
      const selected = []
      this.service.form.get('article_id').patchValue(selected);
      console.log('false', selected)
    }
  }

  addOrdreArticles = (term) => ({article_id: term, label: term});

  public onSelectAllclient() {
    if (this.selectedAll === true) {
      const selected = this.clients.map(item => item.client_id)
      this.service.form.get('client_id').patchValue(selected);
    } else {
      const selected = []
      this.service.form.get('client_id').patchValue(selected);
      console.log('false', selected)
    }
  }

  addOrdreclient = (term) => ({client_id: term, label: term});

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
}



