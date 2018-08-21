import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';
import { utils } from '../../../../node_modules/protractor';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos = 0;

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  cargarMedicos() {

    const url = URL_SERVICIOS + '/medico';

    return this.http.get(url).pipe(
      map( (resp: any) => {
        this.totalMedicos = resp.total;
        console.log(resp);
        return resp.medicos;
      })
    );
  }

  cargarMedico( id: string ) {

    const url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url).pipe(
      map( (resp: any) => {
        return  resp.medico;
      } )
    );

  }

  buscarMedicos( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url).pipe(
      map( (resp: any) => resp.medicos )
    );

  }

  borrarMedico(id: string) {

    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(
      map( resp => {
        swal('Medico borrado', 'borrado', 'success');
        return resp;
      })
    );

  }

  guardarMedico(medico: Medico) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {

      // actualizando
      url += '/' + medico._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, medico).pipe(
        map( (resp: any) => {

          swal('Medico Actualizado', medico.nombre, 'success');
          return resp.medico;

        })
      );

    } else {

      // creando

      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, medico).pipe(
        map( (resp: any) => {

          swal('Medico Creado', medico.nombre, 'success');
          return resp.medico;
        })
      );

    }


  }

}
