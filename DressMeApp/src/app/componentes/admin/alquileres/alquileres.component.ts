import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Iturno } from 'src/app/interfaces/iturnos';
import { Turnoservice } from 'src/app/servicios/turno.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-alquileres',
  templateUrl: './alquileres.component.html',
  styleUrls: ['./alquileres.component.css']
})
export class AlquileresComponent implements OnInit {
  formTurno: FormGroup;
  turnos$: Observable<Iturno[]> = this.turnoService.obtenerTurnos();

  turno: Iturno = {
    id: "",
    nombre: "",
    email: "",
    telefono: 0,
    fecha: "",
    hora: ""
  }

  edicionActiva = false;

  constructor(
    private fb: FormBuilder,
    private turnoService: Turnoservice,

  ) {
    this.formTurno = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [0, Validators.pattern(/^\d{10}$/)],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.actualizarListaTurnos();
  }

  async actualizarListaTurnos() {
    const turnosResponse = await this.turnoService.obtenerTurnos().toPromise();

    if (turnosResponse) {
      const turnos = turnosResponse as Iturno[];

      // Verifica que haya al menos un turno antes de intentar ordenar
      if (turnos.length > 0) {
        // Ordena los turnos por fecha de manera ascendente
        turnos.sort((a, b) => new Date(a.fecha + ' ' + a.hora).getTime() - new Date(b.fecha + ' ' + b.hora).getTime());

        // Actualiza la lista de turnos ordenados
        this.turnos$ = of(turnos);
      }
    }
  }

  async crearTurno() {
    const nuevoTurno: Iturno = { ...this.formTurno.value };
    await this.turnoService.agregarTurno(nuevoTurno);

    // Limpia el formulario después de agregar un turno
    this.formTurno.reset();
    this.actualizarListaTurnos();
  }

  cancelar() {
    this.formTurno.reset();
  }

  editarTurno(turno: Iturno) {
    this.edicionActiva = true;
    this.formTurno.patchValue(turno);  // Rellena el formulario con los datos del turno seleccionado
    this.formTurno.controls['id'].setValue(turno.id);  // Asegura que el ID se mantenga
  }
  async guardarEdicion() {
    console.log('Guardando Edición');

    if (this.edicionActiva) {
      console.log('Modo Edición Activado');
      const id = this.formTurno.value.id;
      if (id !== undefined) {
        const nuevoTurno: Iturno = { ...this.formTurno.value };
        console.log('Nuevo Turno:', nuevoTurno);

        try {
          await this.turnoService.editarTurno(id, nuevoTurno);
          console.log('Edición Completada');
          this.edicionActiva = false;
          this.formTurno.reset();
          this.actualizarListaTurnos();
        } catch (error) {
          console.error('Error al editar el turno:', error);

        }
      } else {
        console.error('ID de turno indefinido al intentar editar.');
      }
    } else {
      console.log('Modo Creación Activado');
      const nuevoTurno: Iturno = { ...this.formTurno.value };
      console.log('Nuevo Turno:', nuevoTurno);

      this.turnoService.agregarTurno(nuevoTurno)
        .then(() => {
          console.log('Creación Completada');
          this.formTurno.reset();
          this.actualizarListaTurnos();
        })
        .catch(error => {
          console.error('Error al crear el turno:', error);
        });
    }
  }
  cancelarEdicion() {
    this.edicionActiva = false;
    this.formTurno.reset();  // Limpia el formulario
  }
  eliminarTurno(turno: Iturno) {
    const confirmar = window.confirm('¿Estás seguro de eliminar este turno?');
    if (confirmar) {
      const id = turno.id;
      if (id) {
        this.turnoService.eliminarTurno(id).then(() => {
          this.actualizarListaTurnos();
        });
      } else {
        console.error('ID de turno no definido.');
      }
    }
  }
}