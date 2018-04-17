import { Action, Selector, State, StateContext } from '@ngxs/store';
import { asapScheduler, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Topping } from '../models/topping.model';
import { ToppingsService } from '../services/toppings.service';
import { LoadToppings, LoadToppingsFail, LoadToppingsSuccess, VisualiseToppings } from './toppings.actions';

export interface ToppingsStateModel {
  toppings: Topping[];
  selectedToppingIds: number[];
  loaded: boolean;
  loading: boolean;
}

@State<ToppingsStateModel>({
  name: 'toppingsState',
  defaults: {
    toppings: [],
    selectedToppingIds: [],
    loaded: false,
    loading: false
  }
})
export class ToppingsState {
  constructor(private toppingsSerive: ToppingsService) {}

  @Selector()
  static toppings(state: ToppingsStateModel): Topping[] {
    return state.toppings;
  }
  // load Toppings
  @Action(LoadToppings)
  loadToppings({ patchState, dispatch }: StateContext<ToppingsStateModel>) {
    patchState({ loading: true });
    return this.toppingsSerive.getToppings().pipe(
      map((toppings: Topping[]) => {
        asapScheduler.schedule(() =>
          dispatch(new LoadToppingsSuccess(toppings))
        );
      }),
      catchError(err =>
        of(asapScheduler.schedule(() => dispatch(new LoadToppingsFail())))
      )
    );
  }

  @Action(LoadToppingsSuccess)
  loadToppingSuccess(
    { patchState }: StateContext<ToppingsStateModel>,
    action: LoadToppingsSuccess
  ) {
    patchState({
      toppings: action.payload,
      loaded: true,
      loading: false
    });
  }

  @Action(LoadToppingsFail)
  loadToppingsFail({ patchState }: StateContext<ToppingsStateModel>) {
    patchState({ loading: false, loaded: false });
  }

  // ----visualise toppings -------
  @Action(VisualiseToppings)
  visualiseToppings(
    { patchState }: StateContext<ToppingsStateModel>,
    action: VisualiseToppings
  ) {
    patchState({ selectedToppingIds: action.payload });
  }
}
