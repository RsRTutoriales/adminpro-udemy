import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

       this.contarTres().then(
      mensaje => console.log('Termino', mensaje)
      // () => console.log('Termino')
    )
    .catch( error => console.error('Error en la promesa', error));

  }

  ngOnInit() {
  }

  contarTres() {

    return new Promise( (resolve, reject) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador += 1;

        if ( contador === 3 ) {
          resolve('Ok!');
          // reject('simplemente un error');
          clearInterval(intervalo);
        }

      }, 1000);

    });
  }

}
