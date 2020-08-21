import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {OrdreService} from '../ordre.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Article} from '../../article-operation/article/article.model';


@Component({
  selector: 'app-upd-ordre',
  templateUrl: './ordre-update.component.html',
  styleUrls: ['./ordre-update.component.css']
})
export class OrdreUpdateComponent implements OnInit {
   artlist: MatTableDataSource<Article>;
  private dataupd: Subscription;
  private ordreId: string;
  datalist: any[];
  private artcupd: Subscription;
  displayedColumns: string[] = ['code'];

  constructor(private service: OrdreService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.ordreId = paramMap.get('id');
        console.log(this.ordreId);
        this.service.getdata(this.ordreId);
        this.dataupd = this.service.datupdt().subscribe((list: any[]) => {
          this.datalist = list;
          console.log(this.datalist);
        });
        this.artcupd = this.service.artupdt().subscribe((art) => {
          this.artlist = new MatTableDataSource(art);
          console.log(this.artlist);
        });
      };


    });

  }
}
