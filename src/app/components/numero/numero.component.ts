import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-numero',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './numero.component.html',
  styleUrl: './numero.component.css'
})
export class NumeroComponent {
  @Input()
  segmentos= ['b', 'c'];
}
