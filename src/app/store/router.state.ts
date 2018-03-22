import { Location } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';
import { Action, State, StateContext } from 'ngxs';

//------ router model -------
export class RouterStateModel {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}

//---- router action ------
export class Go {
  constructor(public readonly payload: RouterStateModel) {}
}

export class Back {}
export class Forward {}

// --- router state
@State<RouterStateModel>({
  name: 'router'
})
export class RouterState {
  constructor(private router: Router, private location: Location) {}

  @Action(Go)
  go(sc: StateContext<RouterStateModel>, action: Go) {
    const { path, query: queryParams, extras } = action.payload;
    this.router.navigate(path, { queryParams, ...extras });
  }
  @Action(Back)
  back(sc: StateContext<RouterStateModel>) {
    this.location.back();
  }

  @Action(Forward)
  forward(sc: StateContext<RouterStateModel>) {
    this.location.forward();
  }
}
