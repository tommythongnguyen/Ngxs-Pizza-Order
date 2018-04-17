import { Action, Selector, State, StateContext } from '@ngxs/store';
import { asapScheduler, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Pizza } from '../models/pizza.model';
import { PizzasService } from './../services/pizzas.service';
import * as pizzasActions from './pizzas.actions';

// -----pizzas model --------
export interface PizzasStateModel {
  pizzas: Pizza[];
  loaded: boolean;
  loading: boolean;
  selectedPizzaId: number;
}
// --- pizzas state : initialState---
@State<PizzasStateModel>({
  name: 'pizzasState',
  defaults: {
    pizzas: [],
    loaded: false,
    loading: false,
    selectedPizzaId: null
  }
})
export class PizzasState {
  constructor(private pizzaService: PizzasService) {}
  @Selector()
  static pizzas(state: PizzasStateModel) {
    return state.pizzas;
  }
  @Selector()
  static loaded(state: PizzasStateModel) {
    return state.loaded;
  }

  @Selector()
  static SelectedPizza(state: PizzasStateModel): Pizza {
    return state.pizzas.find(
      (pizza: Pizza) => pizza.id === state.selectedPizzaId
    );
  }
  //---------------- load pizza ----------
  @Action(pizzasActions.LoadPizzas)
  loadPizzas({ patchState, dispatch }: StateContext<PizzasStateModel>) {
    patchState({ loading: true });
    return this.pizzaService
      .getPizzas()
      .pipe(
        map((pizzas: Pizza[]) =>
          asapScheduler.schedule(() =>
            dispatch(new pizzasActions.LoadPizzasSuccess(pizzas))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              dispatch(new pizzasActions.LoadPizzasFail(error))
            )
          )
        )
      );
  }

  @Action(pizzasActions.LoadPizzasSuccess)
  loadPizzasSuccess(
    { patchState }: StateContext<PizzasStateModel>,
    { payload }: pizzasActions.LoadPizzasSuccess
  ) {
    patchState({ pizzas: payload, loaded: true, loading: false });
  }

  @Action(pizzasActions.LoadPizzasFail)
  loadPizzasFail(
    { dispatch }: StateContext<PizzasStateModel>,
    { payload }: pizzasActions.LoadPizzasFail
  ) {
    dispatch({ loaded: false, loading: false });
  }

  // ---- selected Pizza ----
  @Action(pizzasActions.SelectPizza)
  selectedPizza(
    { patchState }: StateContext<PizzasStateModel>,
    { payload }: pizzasActions.SelectPizza
  ) {
    patchState({ selectedPizzaId: payload });
  }
}
