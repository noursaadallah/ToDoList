import { CategoryDataService } from './categories/category-data.service';
import { Component, OnInit } from '@angular/core';
import {Todo} from './todos/todo';
import {TodoDataService} from './todos/todo-data.service';
import {Category} from './categories/category';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [TodoDataService, CategoryDataService]

})

export class AppComponent implements OnInit {

  newTodo: Todo = new Todo();
  newCategory: Category = new Category();
  selectedCategory: Category;
  _todos: Todo[];
  _allTodos: Todo[];
  _categories : Category[];
  _todosForCat : Todo[];

  constructor(private todoDataService: TodoDataService, private categoryDataService: CategoryDataService) {
  }


  addTodo() {
    this.newTodo.category = this.selectedCategory.id;
    this.todoDataService.addTodo(this.newTodo).subscribe(
      res => this._todosForCat.push(res)
    );
    this._categories.find(c => c.id == this.selectedCategory.id).todosCount++;
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    let index = this._todosForCat.findIndex(t => t.id == todo.id);
    this.todoDataService.toggleTodoComplete(todo).subscribe(
      res =>  this._todosForCat[index] = res
    );
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id).subscribe();
    this._todosForCat = this._todosForCat.filter(t => t.id !== todo.id);
    this._categories.find(c => c.id == this.selectedCategory.id).todosCount--;
  }

  get todos() {
    let todos_ = [];
    this.todoDataService.getAllTodos().subscribe(
      res => { todos_ = res ; }
    );
    return todos_;
  }

  getTodosForCat() {
    this.todoDataService.getTodoByCategory(this.selectedCategory.id).subscribe(
      res => { this._todosForCat = res ; }
    );
  }

  todosByCat(id: number) {
    this.todoDataService.getTodoByCategory(id).subscribe(
      res => { this._todos = res; }
    );
  }

  addCategory() {
    this.categoryDataService.addCategory(this.newCategory).subscribe(
      res => this._categories.push(res)
    );
    this.newCategory = new Category();
  }

  removeCategory(category) {
    this.categoryDataService.deleteCategoryById(category.id);
  }

  get categories() {
    let cats_ = [];
    this.categoryDataService.getAllCategories().subscribe(
      res => { cats_ = res; }
    );
    return cats_;
  }

  categoryById(id: number) {
    return this.categoryDataService.getCategoryById(id).subscribe();
  }


  onSelect(category: Category): void {
    this.selectedCategory = category;
    this.todoDataService.getTodoByCategory(this.selectedCategory.id).subscribe(
      res => { this._todosForCat = res ; }
    );
  }

  ngOnInit() {
    this.categoryDataService.getAllCategories().subscribe(
      res => {this._categories = res;}
    );

    this._todosForCat = [];

    this.todoDataService.getAllTodos().subscribe(res => this._allTodos = res);
  }

}