import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor( public _usuarioService: UsuarioService,
                public _modalUploadService: ModalUploadService) { }

  ngOnInit() {

    this.cargarUsuarios();

    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarUsuarios());

  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
        .subscribe( (resp: any) => {

            this.totalRegistros = resp.total;
            this.usuarios = resp.usuarios;

            this.cargando = false;
     });
  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if (desde < 0 ) {
      return;
    }

    this.desde += valor;

    this.cargarUsuarios();

  }

  buscarUsuarios( termino: string ) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuario( termino )
    .subscribe( (usuarios: Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;

    });

  }

  borrarUsuario( usuario: Usuario) {

    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No se puede borrar', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Se eliminara al usuario ' + usuario.nombre ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe( resp => {

          this.cargarUsuarios();

          swal(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
          );
        });
      }
    });
  }

  guardarUsuario( usuario: Usuario) {

    this._usuarioService.actualizarUsuario(usuario).subscribe();

  }

  mostrarModal(id: string) {

      this._modalUploadService.mostrarModal('usuarios', id);

  }

}
