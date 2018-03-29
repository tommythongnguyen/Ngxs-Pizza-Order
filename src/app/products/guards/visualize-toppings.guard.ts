import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';

import { VisualiseToppings } from '../store/toppings.state';

@Injectable()
export class VisualizeToppingsGuard implements CanActivate {
  constructor(private store: Store) {}
  canActivate(): Observable<boolean> {
    return this.store
      .dispatch(new VisualiseToppings([]))
      .pipe(switchMap(() => of(true)));
  }
}
