import { PizzasGuard } from "./pizzas.guard";
import { PizzaExistsGuards } from "./pizza-exists.guard";
import { ToppingsGuard } from "./toppings.guard";
import { VisualizeToppingsGuard } from "./visualize-toppings.guard";

export const guards: any[] = [
  PizzasGuard,
  PizzaExistsGuards,
  ToppingsGuard,
  VisualizeToppingsGuard
];

export * from "./pizzas.guard";
export * from "./pizza-exists.guard";
export * from "./toppings.guard";
export * from "./visualize-toppings.guard";
