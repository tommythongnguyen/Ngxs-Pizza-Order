import { PizzasState } from './pizzas.state';
import { ToppingsState } from './toppings.state';

export const ProductsState = [PizzasState, ToppingsState];

export * from './pizzas.actions';
export * from './pizzas.state';
export * from './toppings.actions';
export * from './toppings.state';
