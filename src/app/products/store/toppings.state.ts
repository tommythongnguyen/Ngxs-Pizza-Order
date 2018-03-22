import { Action, Selector, State, StateContext } from 'ngxs';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

import { Topping } from '../models/topping.model';
import { ToppingsService } from './../services/toppings.service';

// --- topping actions----
export class LoadToppings {}

export class LoadToppingsSuccess {
  constructor(public readonly payload: Topping[]) {}
}

export class LoadToppingsFail {
  constructor(public readonly payload?: any) {}
}

export class VisualiseToppings {
  constructor(public readonly payload: number[]) {}
}

// ---topping model----
export class ToppingsStateModel {
  toppings: Topping[];
  selectedToppings: number[];
  loaded: boolean;
  loading: boolean;
}
// --- topping state : initialState---
@State<ToppingsStateModel>({
  name: 'toppings',
  defaults: {
    toppings: [],
    selectedToppings: [],
    loaded: false,
    loading: false
  }
})
export class ToppingsState {
  constructor(private toppingsSerive: ToppingsService) {}
  // state selector
  @Selector()
  static toppings(state: ToppingsStateModel) {
    return state.toppings;
  }
  @Selector()
  static loaded(state: ToppingsStateModel) {
    return state.loaded;
  }
  @Selector()
  static loading(state: ToppingsStateModel) {
    return state.loading;
  }
  @Selector()
  static selectedToppings(state: ToppingsStateModel) {
    return state.selectedToppings;
  }

  // load Toppings
  @Action(LoadToppings)
  loadToppings(sc: StateContext<ToppingsStateModel>) {
    sc.patchState({ loading: true });
    return this.toppingsSerive.getToppings().pipe(
      map((toppings: Topping[]) => {
        setTimeout(() => {
          sc.dispatch(new LoadToppingsSuccess(toppings));
        }, 0);
      }),
      catchError(err =>
        of(
          setTimeout(() => {
            sc.dispatch(new LoadToppingsFail());
          }, 0)
        )
      )
    );
  }

  @Action(LoadToppingsSuccess)
  loadToppingSuccess(
    sc: StateContext<ToppingsStateModel>,
    action: LoadToppingsSuccess
  ) {
    sc.setState({
      ...sc.getState(),
      toppings: action.payload,
      loaded: true,
      loading: false
    });
  }

  @Action(LoadToppingsFail)
  loadToppingsFail(sc: StateContext<ToppingsStateModel>) {
    sc.patchState({ loading: false, loaded: false });
  }

  // ----visualise toppings -------
  @Action(VisualiseToppings)
  visualiseToppings(
    sc: StateContext<ToppingsStateModel>,
    action: VisualiseToppings
  ) {
    sc.patchState({ selectedToppings: action.payload });
  }
}
