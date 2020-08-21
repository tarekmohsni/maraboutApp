import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';

import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {Article} from './article.model';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  baseUri = 'http://localhost:8080/api/test';
  articlelist: Article[];
  artsub = new Subject<Article[]>();

  form: FormGroup = new FormGroup({
    article_id: new FormControl(''),
    article_name: new FormControl(''),
    code: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    operation_templatess: new FormControl([[], []]),

  });

  constructor(private http: HttpClient, private router: Router) {
  };

  getArticle() {
    this
      .http
      .get<{ article: Article[] }>(`${this.baseUri + '/findall_article'}`).subscribe((art) => {
      this.articlelist = art.article;
      this.artsub.next(...[this.articlelist]);
      return art.article;
    });
  }

  /*deleteUser(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + id);
  }*/


  initializeFormGroup() {
    this.form.patchValue({
      article_id: null,
      article_name: '',
      code: '',
      description: '',
      operation_templatess: [],
    });
  }

  insertArticle(article_name: string, code: string, description: string, operation_templatess: []) {
    const article = {
      article_name: article_name,
      code: code,
      description: description,
      operation_templatess: operation_templatess

    }
    this.http.post<{ article: Article }>(this.baseUri + '/creat_article', article).subscribe((art) => {
      const artc: Article = {
        article_id: art.article.article_id,
        article_name: article_name,
        code: code,
        description: description,
        operation_templatess: operation_templatess

      }
      this.articlelist.push(artc);
      console.log(artc);
      this.artsub.next(...[this.articlelist]);
      // this.router.navigate(['/artlist']);
      // hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
    });
  }

  DeleteArt(id: string) {
    this.http.delete(this.baseUri + '/delete/article/' + id).subscribe(res => {


        this.articlelist = this.articlelist.filter(art => art.article_id !== id);
        this.artsub.next(...[this.articlelist]);
      }
    );
  }

  artUpdt() {
    return this.artsub.asObservable();
  }


}
