import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

import { Go } from '../../store/router.state';
import { Pizza } from './../models/pizza.model';
import { Topping } from './../models/topping.model';
import { PizzasService } from './../services/pizzas.service';

// load Pizza actions
export class LoadPizzas {}
export class LoadPizzasSuccess {
  constructor(public readonly payload: Pizza[]) {}
}
export class LoadPizzasFail {
  constructor(public readonly payload?: any) {}
}

// create Pizza actions
export class CreatePizza {
  constructor(public readonly payload: Pizza) {}
}
export class CreatePizzaSuccess {
  constructor(public readonly payload: Pizza) {}
}
export class CreatePizzaFail {
  constructor(public readonly payload?: Pizza) {}
}

// update Pizza actions
export class UpdatePizza {
  constructor(public readonly payload: Pizza) {}
}
export class UpdatePizzaSuccess {
  constructor(public readonly payload: Pizza) {}
}
export class UpdatePizzaFail {
  constructor(public readonly payload?: Pizza) {}
}

// remove Pizza action
export class RemovePizza {
  constructor(public readonly payload: Pizza) {}
}
export class RemovePizzaSuccess {
  constructor(public readonly payload: Pizza) {}
}
export class RemovePizzaFail {
  constructor(public readonly payload?: Pizza) {}
}

// selected Pizza action
export class SelectedPizza {
  constructor(public readonly payload: number) {}
}

// PizzaVisualized action
export class UpdatePizzaToppings {
  constructor(public readonly payload: Topping[]) {}
}

// -----pizzas model --------
export class PizzaStateModel {
  pizzas: Pizza[];
  selectedPizza: Pizza;
  visualizedPizza: Pizza;
  loaded: boolean;
  loading: boolean;
}
// --- pizzas state : initialState---
@State<PizzaStateModel>({
  name: 'pizzas',
  defaults: {
    pizzas: [],
    selectedPizza: {},
    visualizedPizza: {},
    loaded: false,
    loading: false
  }
})
export class PizzasState {
  constructor(private pizzaService: PizzasService, private store: Store) {}
  // ---- state selector----------
  @Selector()
  static pizzas(state: PizzaStateModel) {
    return state.pizzas;
  }
  @Selector()
  static selectedPizza(state: PizzaStateModel) {
    return state.selectedPizza;
  }
  @Selector()
  static loaded(state: PizzaStateModel) {
    return state.loaded;
  }

  @Selector()
  static loading(state: PizzaStateModel) {
    return state.loading;
  }

  @Selector() // get pizza with updated topping
  static visualizedPizza(state: PizzaStateModel) {
    //   const toppings = selectedToppings.
    //  // const toppings = (selectedToppings as number[]).map(id => allToppings[id]);
    //   return { ...state.selectedPizza, toppings };
  }

  //---------------- load pizza ----------
  @Action(LoadPizzas)
  loadPizzas(sc: StateContext<PizzaStateModel>) {
    sc.patchState({ loading: true });
    return this.pizzaService.getPizzas().pipe(
      map((pizzas: Pizza[]) => {
        setTimeout(() => {
          sc.dispatch(new LoadPizzasSuccess(pizzas));
        }, 0);
      }),
      catchError((err: any) =>
        of(
          setTimeout(() => {
            sc.dispatch(new LoadPizzasFail(err));
          }, 0)
        )
      )
    );
  }

  @Action(LoadPizzasSuccess)
  loadPizzasSuccess(
    sc: StateContext<PizzaStateModel>,
    action: LoadPizzasSuccess
  ) {
    sc.setState({
      ...sc.getState(),
      pizzas: action.payload,
      loaded: true,
      loading: false
    });
  }

  @Action(LoadPizzasFail)
  loadPizzasFail(sc: StateContext<PizzaStateModel>) {
    sc.patchState({ loading: false, loaded: false });
  }

  //----------- create pizza -------
  @Action(CreatePizza)
  createPizza(sc: StateContext<PizzaStateModel>, action: CreatePizza) {
    sc.patchState({ loading: true });
    return this.pizzaService.createPizza(action.payload).pipe(
      map((pizza: Pizza) => {
        setTimeout(() => {
          sc.dispatch(new CreatePizzaSuccess(pizza));
        }, 0);
      }),
      catchError((err: any) =>
        of(
          setTimeout(() => {
            sc.dispatch(new CreatePizzaFail(err));
          }, 0)
        )
      )
    );
  }

  @Action(CreatePizzaSuccess)
  createPizzaSuccess(
    sc: StateContext<PizzaStateModel>,
    action: CreatePizzaSuccess
  ) {
    const { pizzas } = sc.getState();
    pizzas.push(action.payload);
    sc.setState({ ...sc.getState(), pizzas, loading: false });

    sc.dispatch(
      new Go({
        path: ['/products']
      })
    );
  }

  // ----------Update Pizza ------
  @Action(UpdatePizza)
  updatePizza(sc: StateContext<PizzaStateModel>, action: UpdatePizza) {
    sc.patchState({ loading: true });
    return this.pizzaService.updatePizza(action.payload).pipe(
      map(() =>
        setTimeout(() => {
          sc.dispatch(new UpdatePizzaSuccess(action.payload));
        }, 0)
      ),
      catchError(err =>
        of(
          setTimeout(() => {
            sc.dispatch(new UpdatePizzaFail());
          }, 0)
        )
      )
    );
  }

  @Action(UpdatePizzaSuccess)
  updatePizzaSuccess(
    sc: StateContext<PizzaStateModel>,
    action: UpdatePizzaSuccess
  ) {
    let { pizzas } = sc.getState();

    pizzas = pizzas.map(
      (pizza: Pizza) =>
        pizza.id === action.payload.id ? action.payload : pizza
    );
    sc.setState({ ...sc.getState(), pizzas, loading: false });

    sc.dispatch(
      new Go({
        path: ['/products']
      })
    );
  }

  // ------remove pizza --------
  @Action(RemovePizza)
  removePizza(sc: StateContext<PizzaStateModel>, action: RemovePizza) {
    return this.pizzaService.removePizza(action.payload).pipe(
      map(() =>
        setTimeout(() => {
          sc.dispatch(new RemovePizzaSuccess(action.payload));
        }, 0)
      ),
      catchError(err =>
        of(
          setTimeout(() => {
            sc.dispatch(new RemovePizzaFail());
          }, 0)
        )
      )
    );
  }

  @Action(RemovePizzaSuccess)
  removePizzaSuccess(
    sc: StateContext<PizzaStateModel>,
    action: RemovePizzaSuccess
  ) {
    let { pizzas } = sc.getState();
    pizzas = pizzas.filter((pizza: Pizza) => pizza.id !== action.payload.id);
    sc.setState({ ...sc.getState(), pizzas, loading: false });

    sc.dispatch(
      new Go({
        path: ['/products']
      })
    );
  }

  // ---- selected Pizza ----
  @Action(SelectedPizza)
  selectedPizza(sc: StateContext<PizzaStateModel>, action: SelectedPizza) {
    let { pizzas } = sc.getState();
    const selectedPizza = pizzas.find(
      (pizza: Pizza) => pizza.id === action.payload
    );
    sc.patchState({ selectedPizza });
  }

  @Action([RemovePizzaFail, UpdatePizzaFail, CreatePizzaFail])
  handlePizzaFail(sc: StateContext<PizzaStateModel>) {
    sc.patchState({ loading: false });
  }

  @Action(UpdatePizzaToppings)
  updatePizzaToppings(sc: StateContext<PizzaStateModel>) {
    // this.store.select()
  }
}
