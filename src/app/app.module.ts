import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { RouterHandler } from './store/router.state';

// bootstrap
// routes
export const ROUTES: Route[] = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule'
  }
];

function noop() {
  return function() {};
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    NgxsModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [RouterHandler]
})
export class AppModule {}
