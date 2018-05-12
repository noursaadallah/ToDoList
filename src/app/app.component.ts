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

  constructor(private todoDataService: TodoDataService, private categoryDataService: CategoryDataService) {
  }


  addTodo() {
    this.newTodo.category = this.selectedCategory.id;
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
    console.log(this.todos);
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  get todos() {
    return this.todoDataService.getAllTodos()
  }

  get todosForCat() {
    return this.todoDataService.getTodoByCategory(this.selectedCategory.id);
  }

  todosByCat(id: number) {
    return this.todoDataService.getTodoByCategory(id);
  }

  addCategory() {
    this.categoryDataService.addCategory(this.newCategory);
    this.newCategory = new Category();
  }

  removeCategory(category) {
    this.categoryDataService.deleteCategoryById(category.id);
  }

  get categories() {
    return this.categoryDataService.getAllCategories();
  }

  categoryById(id: number) {
    return this.categoryDataService.getCategoryById(id);
  }

  addInitialCategory(category) {
    this.categoryDataService.addCategory(category);
  }

  addInitialTodo(todo) {
    this.todoDataService.addTodo(todo);
  }


  onSelect(category: Category): void {
    this.selectedCategory = category;
  }

  ngOnInit() {
    let initCat = new Category();
    initCat = {'name' : 'Today', 'id' : null , };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Tomorrow', 'id' : null , };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Work', 'id' : null , };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Holidays', 'id' : null , };
    this.addInitialCategory(initCat);
    initCat = {'name' : 'Shopping list', 'id' : null , };
    this.addInitialCategory(initCat);

    let initTodo = new Todo();
    initTodo = {'title' : 'Task1', 'complete': false, 'id' : null , category: 1 };
    this.addInitialTodo(initTodo);
    initTodo = {'title' : 'Task2', 'complete': true, 'id' : null , category: 2 };
    this.addInitialTodo(initTodo);
    initTodo = {'title' : 'Task3', 'complete': true, 'id' : null , category: 1 };
    this.addInitialTodo(initTodo);
  }

}