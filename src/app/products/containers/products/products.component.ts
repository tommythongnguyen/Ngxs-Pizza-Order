import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="products">
        <div class="products__new">
            <a
            class="btn btn__ok" 
            routerLink="./new">
            New Pizza
            </a>
        </div>
        <div class="products__list">
            <div *ngIf="!(pizzas$ | async)?.length">
                No pizzas, add one to get started (pizzas$ | async)
            </div>
            <pizza-item *ngFor="let pizza of (pizzas$ | async)" 
                        [pizza]="pizza">
            </pizza-item>
        </div>
    </div>`
})
export class ProductsComponent implements OnInit {
  @Select((state: any) => state.pizzasState.pizzas)
  pizzas$: Observable<any[]>;
  constructor(private store: Store) {}

  ngOnInit() {}
}
