import { Injectable } from '@angular/core';
import {Category} from './category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId = 0;

    // Placeholder for category's
    categories: Category[] = [];

  constructor(private http : HttpClient) { }

  // Simulate POST /categories
  addCategory(category: Category): CategoryDataService {
    // if (!category.id) {
    //   category.id = ++this.lastId;
    // }
    // this.categories.push(category);
    // return this;

    this.http.post("http://localhost:8080/categories" , category);
    return this;
  }

  // Simulate DELETE /categories/:id
  deleteCategoryById(id: number): CategoryDataService {
    // this.categories = this.categories
    //   .filter(category => category.id !== id);
    // return this;

    this.http.delete("http://localhost:8080/categories/"+id);
    return this;
  }

  // Simulate PUT /categories/:id
  updateCategoryById(id: number, values: Object = {}): Observable<Category> {
    // let category = this.getCategoryById(id);
    // if (!category) {
    //   return null;
    // }
    // Object.assign(category, values);
    // return category;

    return this.http.put<Category>("http://localhost:8080/categories/"+id , values);
  }

  // Simulate GET /categories
  getAllCategories(): Observable<Category[]> {
   // return this.categories;
   return this.http.get<Category[]>("http://localhost:8080/categories");
  }

  // Simulate GET /categories/:id
  getCategoryById(id: number): Observable<Category> {
    // return this.categories
    //   .filter(category => category.id === id)
    //   .pop();
    return this.http.get<Category>("http://localhost:8080/categories"+id);
  }


}
