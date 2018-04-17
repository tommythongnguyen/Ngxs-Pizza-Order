import { Pizza } from '../models/pizza.model';

// load Pizza actions
export class LoadPizzas {
  static readonly type = '[Pizzas] Load Pizzas';
}
export class LoadPizzasSuccess {
  static readonly type = '[Pizzas] Load Pizzas Success';
  constructor(public readonly payload: Pizza[]) {}
}
export class LoadPizzasFail {
  static readonly type = '[Pizzas] Load Pizzas Fail';
  constructor(public readonly payload?: any) {}
}

// create Pizza actions
export class CreatePizza {
  static readonly type = '[Pizzas] Create Pizza';
  constructor(public readonly payload: Pizza) {}
}
export class CreatePizzaSuccess {
  static readonly type = '[Pizzas] Create Pizza Success';
  constructor(public readonly payload: Pizza) {}
}
export class CreatePizzaFail {
  static readonly type = '[Pizzas] Create Pizza Fail';
  constructor(public readonly payload?: Pizza) {}
}

// update Pizza actions
export class UpdatePizza {
  static readonly type = '[Pizzas] Update Pizza';
  constructor(public readonly payload: Pizza) {}
}
export class UpdatePizzaSuccess {
  static readonly type = '[Pizzas] Update Pizza Success';
  constructor(public readonly payload: Pizza) {}
}
export class UpdatePizzaFail {
  static readonly type = '[Pizzas] Update Pizza Fail';
  constructor(public readonly payload?: Pizza) {}
}

// remove Pizza action
export class RemovePizza {
  static readonly type = '[Pizzas] Remove Pizza';
  constructor(public readonly payload: Pizza) {}
}
export class RemovePizzaSuccess {
  static readonly type = '[Pizzas] Remove Pizza Success';
  constructor(public readonly payload: Pizza) {}
}
export class RemovePizzaFail {
  static readonly type = '[Pizzas] Remove Pizza Fail';
  constructor(public readonly payload?: Pizza) {}
}

// selected Pizza action
export class SelectPizza {
  static readonly type = '[Pizzas] Select Pizza';
  constructor(public readonly payload: number) {}
}

export type PizzasActions =
  | LoadPizzas
  | LoadPizzasSuccess
  | LoadPizzasFail
  | CreatePizza
  | CreatePizzaSuccess
  | CreatePizzaFail
  | UpdatePizza
  | UpdatePizzaSuccess
  | UpdatePizzaFail
  | RemovePizza
  | RemovePizzaSuccess
  | RemovePizzaFail;
