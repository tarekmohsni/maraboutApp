import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {Article} from '../article.model';
import {ArticleService} from '../article-service';
import {ArticleComponent} from '../article-add/article-add.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-sequence',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticlelistComponent implements OnInit {
  panelOpenState = false;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  // Important objects
  searchKey: string;
  ArtList: MatTableDataSource<any>;
  displayedColumns: string[] = ['article_name', 'description', 'code', 'action'];
  private artupd: Subscription;

  constructor(private service: ArticleService, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.getArticle();
    this.artupd = this.service.artUpdt().subscribe((art) => {
      this.ArtList = new MatTableDataSource(art);
      this.ArtList.sort = this.sort;
      this.ArtList.paginator = this.paginator;
    })
  }


  // To Get List Of sequence
  onCreat() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(ArticleComponent, dialogConfig);
  }

  deleteArt(id) {
    this.service.DeleteArt(id);
  }

  applyFilter() {
    this.ArtList.filter = this.searchKey.trim().toLowerCase();
  }
}
