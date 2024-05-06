import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CountiresRoutingModule } from './countries-routing.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

@NgModule({
  declarations: [SelectorPageComponent],
  imports: [CommonModule, CountiresRoutingModule, ReactiveFormsModule],
})
export class CountriesModule {}
