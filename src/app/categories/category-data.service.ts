import { Injectable } from '@angular/core';
import {Category} from './category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryDataService {

  constructor(private http : HttpClient) { }

  // POST /categories
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>("http://localhost:8080/categories" , category);
  }

  // DELETE /categories/:id
  deleteCategoryById(id: number): CategoryDataService {
    this.http.delete("http://localhost:8080/categories/"+id);
    return this;
  }

  // PUT /categories/:id
  updateCategoryById(id: number, values: Object = {}): Observable<Category> {
    return this.http.put<Category>("http://localhost:8080/categories/"+id , values);
  }

  // GET /categories
  getAllCategories(): Observable<Category[]> {
   return this.http.get<Category[]>("http://localhost:8080/categories");
  }

  // GET /categories/:id
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>("http://localhost:8080/categories"+id);
  }


}
