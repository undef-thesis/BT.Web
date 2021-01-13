import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  public getCategories(): any {
    return this.http
      .get<any>(`${environment.API_URL}/categories`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
