import { Topping } from '../models/topping.model';

// --- topping actions----
export class LoadToppings {
  static readonly type = '[Toppings] Load Toppings';
}

export class LoadToppingsSuccess {
  static readonly type = '[Toppings] Load Toppings Success';

  constructor(public readonly payload: Topping[]) {}
}

export class LoadToppingsFail {
  static readonly type = '[Toppings] Load Toppings Fail';
  constructor(public readonly payload?: any) {}
}

export class VisualiseToppings {
  static readonly type = '[Toppings] Visualize Topping';
  constructor(public readonly payload: number[]) {}
}
