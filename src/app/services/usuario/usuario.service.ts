import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public http: HttpClient) { }


  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario);

  }

}


