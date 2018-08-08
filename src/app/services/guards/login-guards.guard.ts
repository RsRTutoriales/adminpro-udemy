import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { tryParse } from '../../../../node_modules/@types/selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardsGuard implements CanActivate {

  constructor( public usuarioService: UsuarioService, private router: Router) {}

  canActivate() {

    if (this.usuarioService.estaLogueado()) {
      console.log('paso el guard');
      return true;
    } else {
      console.log('bloqueado por el guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
