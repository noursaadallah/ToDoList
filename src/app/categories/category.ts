export class Category {
    id: number;
    name = '';
    todosCount : number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
      }
}