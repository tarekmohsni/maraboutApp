import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {OrdreService} from '../ordre.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Article} from '../../article-operation/article/article.model';
import {OperationService} from '../../operations template/operation_t.service';
import {Operation} from '../../operations template/operation_t.model';
import {Lines} from '../../lines-machines-machines type/lines/lines.model';


@Component({
  selector: 'app-upd-ordre',
  templateUrl: './ordre-update.component.html',
  styleUrls: ['./ordre-update.component.css']
})
export class OrdreUpdateComponent implements OnInit {
  artlist: any;
  private dataupd: Subscription;
  private lineupd: Subscription
  private ordreId: string;
  datalist: Operation[];
  linelist: Lines[];
  private artcupd: Subscription;
  selectedAllop = false;
  selectedopIds: [];
  selectedAllline = false;
  selectedlineIds: [];
  displayedColumns: string[] = ['article_name', 'action'];

  constructor(private service: OrdreService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.ordreId = paramMap.get('id');
        console.log(this.ordreId);
        this.service.getdata(this.ordreId);
        this.dataupd = this.service.datupdt().subscribe((operation: any[]) => {
          this.datalist = operation;
          console.log(this.datalist);
        });
        this.artcupd = this.service.artupdt().subscribe((art) => {
          this.artlist = art;
          console.log(this.artlist);
        });
        this.lineupd = this.service.lineupdt().subscribe((line) =>{
          this.linelist = line;
        })
      }
      ;


    });


  }

  public onSelectAllop() {
    if (this.selectedAllop === true) {
      const selected = this.datalist.map(item => item.operation_template_id)
      this.service.form.get('operation_template_id').patchValue(selected);
    } else {
      const selected = []
      this.service.form.get('operation_template_id').patchValue(selected);
      console.log('false', selected)
    }
  }

  addoperation = (term) => ({operation_template_id: term, label: term});

  public onSelectAllline() {
    if (this.selectedAllop === true) {
      const selected = this.linelist.map(item => item.line_id)
      this.service.form.get('line_id').patchValue(selected);
    } else {
      const selected = []
      this.service.form.get('line_id').patchValue(selected);
      console.log('false', selected)
    }
  }

  addline = (term) => ({line_id: term, label: term});
}
