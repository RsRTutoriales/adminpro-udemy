import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

   // tslint:disable-next-line:no-input-rename
   @Input('nombre') leyenda = 'leyenda';
   @Input() progreso = 50;

    @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChanges(newValue: number) {

    // const elemHtml: any = document.getElementsByName('progreso')[0];

    if (newValue >= 100) {
      this.progreso = 100;
      // return;
    } else if (newValue <= 0) {
      this.progreso = 0;
     } else {
       this.progreso = newValue;
     }

     // elemHtml.value = this.progreso;

     this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);

  }

  cambiarValor(valor: number) {

    this.progreso =  this.progreso + valor;

    if (this.progreso >= 100) {
      this.progreso = 100;
      // return;
     }

    if (this.progreso <= 0) {
      this.progreso = 0;
      // return;
    }

    this.cambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();

  }

}
