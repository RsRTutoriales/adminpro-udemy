import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map, retry } from 'rxjs/operators';
import swal from 'sweetalert2';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public http: HttpClient,
              private router: Router,
              public _SubirArchivoService: SubirArchivoService,
            public _usuarioService: UsuarioService) { }

  cargarHospitales(desde: number = 0) {

    const url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url);

  }


  obtenerHospital(	id:	string	) {

    const url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp.hospital;
      })
    );

  }

  borrarHospital(	id:	string	) {

    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }

  crearHospital( nombre: string	) {

    const url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;

    // const hospital = new Hospital(nombre);

    // return this.http.post(url, hospital)
    // .pipe(
    //   map( (resp: any) => {
    //     swal('Hospital creado', hospital.nombre, 'success');
    //     return resp.hospital;
    //   })
    // );


    // solucinon profesor
    return this.http.post(url, {nombre})
    .pipe(
      map( (resp: any) => {
        // swal('Hospital creado', nombre, 'success');
        return resp.hospital.nombre;
      })
    );


  }

  buscarHospital(	termino:	string	) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url).pipe(
      map( (resp: any) => resp.hospitales )
    );
  }

  actualizarHospital(	hospital:	Hospital	) {

    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital).pipe(
      map( (resp: any) => {

        swal('Hospital actualizado', hospital.nombre, 'success');

        return true;

      })
    );

  }

}
