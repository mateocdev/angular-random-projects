import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat?: [number, number] = [0, 0];
  @ViewChild('map') divMap?: ElementRef;
  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw new Error('divMap is required');
    if (!this.lngLat) throw new Error('lngLat is required');
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false,
    });
    const marker = new Marker({
      color,
      draggable: false,
    })
      .setLngLat(this.lngLat)
      .addTo(map);
  }
}
