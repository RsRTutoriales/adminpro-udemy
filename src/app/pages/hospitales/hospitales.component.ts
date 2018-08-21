import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde = 0;
  totalRegistros = 0;
  cargando = true;

  constructor(public _hopspitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {

    this.cargarHospitales();

    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarHospitales());

  }

  crearHospital() {

    swal({
      title: 'Crear Hospital',
      type: 'info',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: (hospital) => {
        return this._hopspitalService.crearHospital(hospital)
          .subscribe( resp => {
            this.cargarHospitales();
          });
      },
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {

      console.log(result.value);
      if (result.value) {
        swal('Hospital creado', result.value, 'success');
      }
    });
  }

  cargarHospitales() {
    this.cargando = true;

    this._hopspitalService.cargarHospitales(this.desde)
    .subscribe( (resp: any) => {

        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;

        this.cargando = false;
     });
  }

  buscarHospitales( termino: string ) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hopspitalService.buscarHospital( termino )
    .subscribe( (hospitales: Hospital[]) => {

      this.hospitales = hospitales;
      this.cargando = false;

    });
  }

  actualizarHospital(hospital: Hospital) {

    this._hopspitalService.actualizarHospital(hospital).subscribe();

  }

  borrarHospital(id: string) {

    swal({
      title: 'Esta seguro?',
      text: 'Se eliminara el hospital ',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {

        this._hopspitalService.borrarHospital(id)
        .subscribe( resp => {

          this.cargarHospitales();

          swal(
            'Deleted!',
            'Hospital Borrado',
            'success'
          );
        });
      }
    });



  }

  mostrarModal(id: string) {

    this._modalUploadService.mostrarModal('hospitales', id);

}

}
