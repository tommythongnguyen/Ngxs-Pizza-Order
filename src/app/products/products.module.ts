import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { PizzaDisplayComponent } from './components/pizza-display/pizza-display.component';
import { PizzaFormComponent } from './components/pizza-form/pizza-form.component';
import { PizzaItemComponent } from './components/pizza-item/pizza-item.component';
import { PizzaToppingsComponent } from './components/pizza-toppings/pizza-toppings.component';
import { ProductItemComponent } from './containers/product-item/product-item.component';
import { ProductsComponent } from './containers/products/products.component';
import * as fromGuards from './guards';
import { PizzasService, ToppingsService } from './services';
import { ProductsState } from './store';

const ROUTES: Route[] = [
  {
    path: '',
    canActivate: [fromGuards.PizzasGuard],
    component: ProductsComponent
  },
  {
    path: 'new',
    canActivate: [fromGuards.ToppingsGuard, fromGuards.VisualizeToppingsGuard],
    component: ProductItemComponent
  },
  {
    path: ':pizzaId',
    canActivate: [fromGuards.PizzaExistsGuards, fromGuards.ToppingsGuard],
    component: ProductItemComponent
  }
];
@NgModule({
  declarations: [
    ProductsComponent,
    PizzaItemComponent,
    PizzaDisplayComponent,
    PizzaFormComponent,
    PizzaToppingsComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    NgxsModule.forFeature(ProductsState),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PizzasService, ToppingsService, fromGuards.guards]
})
export class ProductsModule {}
