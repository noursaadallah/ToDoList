import { Injectable } from '@angular/core';
import {Todo} from './todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoDataService {

  constructor(private http : HttpClient ) { }

  // POST /todos
  addTodo(todo: Todo): Observable<Todo> {
    todo.complete = false;
    return this.http.post<Todo>("http://localhost:8080/todos/"+todo.category , todo);
  }

  // DELETE /todos/:id
  deleteTodoById(id: number): Observable<{}> {
    return this.http.delete("http://localhost:8080/todos/"+id);
  }

  // PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Observable<Todo> {
    return this.http.put<Todo>("http://localhost:8080/todos/"+id , values );
  }

  // GET /todos
  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>("http://localhost:8080/todos");
  }

  // GET /todos/:id
  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>("http://localhost:8080/todos/"+id);
  }

  // GET /todos/:category
  getTodoByCategory(id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>("http://localhost:8080/todos/bycategory/"+id);
  }

  // PUT /todos/togglecomplete
  toggleTodoComplete(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>("http://localhost:8080/todos/togglecomplete/"+todo.id, {});
  }
}