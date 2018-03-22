import { PizzaDisplayComponent } from './pizza-display/pizza-display.component';
import { PizzaItemComponent } from './pizza-item/pizza-item.component';

export const components: any[] = [
  PizzaItemComponent,
  // PizzaFormComponent,
  PizzaDisplayComponent
  //  PizzaToppingsComponent
];

export * from './pizza-item/pizza-item.component';
export * from './pizza-form/pizza-form.component';
export * from './pizza-display/pizza-display.component';
export * from './pizza-toppings/pizza-toppings.component';
