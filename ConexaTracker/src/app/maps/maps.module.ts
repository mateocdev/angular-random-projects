import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { MapsRoutingModule } from './maps-routing.module';

@NgModule({
  declarations: [MiniMapComponent],
  imports: [CommonModule, MapsRoutingModule],
})
export class MapsModule {}
