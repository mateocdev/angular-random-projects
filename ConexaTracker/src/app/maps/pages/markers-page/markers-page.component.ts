import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {
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
    const marker = new Marker({
      color: '#3887be',
      draggable: true,
    })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);
  }
  ngOnDestroy(): void {
    this.map?.remove();
  }
}
