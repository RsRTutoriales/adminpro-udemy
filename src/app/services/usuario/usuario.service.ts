import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  Usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, private router: Router) {
    this.cargarStorage();
  }

  estaLogueado(): boolean {
     return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.Usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.Usuario = null;
    }
  }

  logout() {
    this.Usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);

  }

  login(usuario: Usuario, recuerdame: boolean = false) {

    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario).pipe(
      map( (resp: any) => {

        localStorage.setItem('id', resp.id);
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));

        this.Usuario = usuario;
        this.token = resp.token;

        return true;
      })
    );

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


