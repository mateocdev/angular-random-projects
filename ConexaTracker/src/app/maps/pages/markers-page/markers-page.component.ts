import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}
@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {
  constructor() {}
  @ViewChild('map') divMap?: ElementRef;
  public markers: MarkerAndColor[] = [];

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
    this.readFromLocalStorage();
  }

  createMarker() {
    if (!this.map) throw new Error('map is not defined');
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map?.getCenter();
    this.addMarker(lngLat, color);
  }
  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) throw new Error('map is not defined');
    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);
    this.markers.push({
      color,
      marker,
    });
    this.saveToLocalStorage();
    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  removeMarker(index: number) {
    const marker = this.markers[index];
    marker.marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 15,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(
      ({ color, marker }) => ({
        color,
        lngLat: marker.getLngLat().toArray(),
      })
    );
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);
    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      this.addMarker(new LngLat(lng, lat), color);
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
