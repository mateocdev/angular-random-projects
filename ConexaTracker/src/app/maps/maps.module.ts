import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { MapsRoutingModule } from './maps-routing.module';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
(mapboxgl as any).accessToken =
  'pk.eyJ1IjoibWF0ZW9jZGV2IiwiYSI6ImNseTNlMHVxZzAydnEya3B5enJiaWMwN2gifQ.n88Ro4p-a4Xv4wXoSudGfA';

@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent,
  ],
  imports: [CommonModule, MapsRoutingModule],
})
export class MapsModule {}
