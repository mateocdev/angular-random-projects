import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductPageComponent],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    ProductsRoutingModule,
  ],
})
export class ProductsModule {}
