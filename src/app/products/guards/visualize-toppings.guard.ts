import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { VisualiseToppings } from '../store/toppings.state';

@Injectable()
export class VisualizeToppingsGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(): Observable<boolean> {
    this.store.dispatch(new VisualiseToppings([]));
    return of(true);
  }
}
