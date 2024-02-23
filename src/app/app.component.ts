import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterOutlet } from '@angular/router';
import { NumeroComponent } from './components/numero/numero.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlexLayoutModule, NumeroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  horas: number = 0;
  minutos: number = 0;
  temporizador: any;
  private activeCount = new Subject<void>();

  segmentos: { [key: number]: string[] } = {
    0: ['a', 'b', 'c', 'd', 'e', 'f'],
    1: ['b', 'c'],
    2: ['a', 'b', 'g', 'e', 'd'],
    3: ['a', 'b', 'g', 'c', 'd'],
    4: ['f', 'g', 'b', 'c'],
    5: ['a', 'f', 'g', 'c', 'd'],
    6: ['a', 'f', 'e', 'd', 'c', 'g'],
    7: ['a', 'b', 'c'],
    8: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    9: ['f', 'a', 'b', 'g', 'c', 'd'],
  };

  segmento1: string[] = [];
  segmento2: string[] = [];
  segmento3: string[] = [];
  segmento4: string[] = [];

  ngOnInit() {
    this.activeCount.subscribe(() => {
      clearInterval(this.temporizador);
    });
  }

  stop() {
    this.activeCount.next();
    this.temporizador = null;
  }

  start() {
    if (!this.temporizador) {
      this.temporizador = setInterval(() => this.actualizarHora(), 300);
    }
  }

  actualizarHora() {
    this.minutos++;

    if (this.minutos === 60) {
      this.minutos = 0;
      this.horas++;

      if (this.horas === 24) {
        this.horas = 0;
      }
    }

    const horasString = this.horas.toString().padStart(2, '0');
    const minutosString = this.minutos.toString().padStart(2, '0');

    this.segmento1 = this.getSegmentos(+minutosString.charAt(1));
    this.segmento2 = this.getSegmentos(+minutosString.charAt(0));
    this.segmento3 = this.getSegmentos(+horasString.charAt(1));
    this.segmento4 = this.getSegmentos(+horasString.charAt(0));
  }

  getSegmentos(segmento: number) {
    return this.segmentos[segmento] || this.segmentos[0];
  }
}
