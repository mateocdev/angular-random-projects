import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  constructor() {}

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public lat: number = 4.742518713364163;
  public lng: number = -74.05554665997872;
  public currentCenter: LngLat = new LngLat(this.lng, this.lat);

  ngAfterViewInit(): void {
    if (!this.divMap) throw new Error('divMap is not defined');
    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListener();
  }
  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListener() {
    if (!this.map) throw new Error('map is not defined');
    this.map.on('zoom', (ev) => (this.zoom = this.map!.getZoom()));
    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });
    this.map.on('move', () => {
      const { lat, lng } = this.map!.getCenter();
      this.lat = lat;
      this.lng = lng;
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
