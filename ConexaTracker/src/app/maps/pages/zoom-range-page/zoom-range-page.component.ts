import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
})
export class ZoomRangePageComponent implements AfterViewInit {
  constructor() {}

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('divMap is not defined');
    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListener();
  }

  mapListener() {
    if (!this.map) throw new Error('map is not defined');
    this.map.on('zoom', (ev) => (this.zoom = this.map!.getZoom()));
    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });
  }

  zoomIn() {
    if (!this.map) throw new Error('map is not defined');
    this.map.zoomIn();
  }

  zoomOut() {
    if (!this.map) throw new Error('map is not defined');
    this.map.zoomOut();
  }

  zoomChanged(value: string) {
    if (!this.map) throw new Error('map is not defined');
    this.map!.zoomTo(Number(value));
  }
}
