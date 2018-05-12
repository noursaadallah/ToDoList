import { Injectable } from '@angular/core';
import {Todo} from './todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId = 0;

    // Placeholder for todo's
    todos: Todo[] = [];

  constructor(private http : HttpClient ) { }

  // Simulate POST /todos
  addTodo(todo: Todo): TodoDataService {
    // if (!todo.id) {
    //   todo.id = ++this.lastId;
    // }
    // this.todos.push(todo);
    // return this;

    this.http.post("http://localhost:8080/todos/"+todo.category , todo);
    return this;
  }

  // Simulate DELETE /todos/:id
  deleteTodoById(id: number): TodoDataService {
    // this.todos = this.todos
    //   .filter(todo => todo.id !== id);
    // return this;

    this.http.delete("http://localhost:8080/todos/"+id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): Observable<Todo> {
    // const todo = this.getTodoById(id);
    // if (!todo) {
    //   return null;
    // }
    // Object.assign(todo, values);
    // return todo;
    return this.http.put<Todo>("http://localhost:8080/todos/"+id , values );
  }

  // Simulate GET /todos
  getAllTodos(): Observable<Todo[]> {
    //return this.todos
    return this.http.get<Todo[]>("http://localhost:8080/todos");
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Observable<Todo> {
    // return this.todos
    //   .filter(todo => todo.id === id)
    //   .pop();
    return this.http.get<Todo>("http://localhost:8080/todos/"+id);
  }

  // Simulate GET /todos/:category
  getTodoByCategory(id: number): Observable<Todo[]> {
    // return this.todos
    //   .filter(todo => todo.category === id);
    
    return this.http.get<Todo[]>("http://localhost:8080/todos/bycategory/"+id);
  }

  // Toggle todo complete
  toggleTodoComplete(todo: Todo) {
    // const updatedTodo = this.updateTodoById(todo.id, {
    //   complete: !todo.complete
    // });
    // return updatedTodo;
    return this.http.put("http://localhost:8080/todos/togglecomplete/"+todo.id, {});
  }
}