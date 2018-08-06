import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient) { }

  login(usuario: Usuario, recuerdame: boolean = false) {

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario);

  }

  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
    .pipe(
      map( (resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      })
    );

  }

}


