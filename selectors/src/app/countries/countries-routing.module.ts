import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesModule } from './countries.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

// localhost:4200/countries/
const routes: Routes = [
  {
    path: '',
    component: CountriesModule,
    children: [
      {
        path: 'selector',
        component: SelectorPageComponent,
      },
      {
        path: '**',
        redirectTo: 'selector',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountiresRoutingModule {}
