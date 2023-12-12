import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Itienda } from 'src/app/interfaces/itienda';
import { TiendaService } from 'src/app/servicios/tienda.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private firestore: Firestore = inject(Firestore);
  private fb: FormBuilder = inject(FormBuilder);
  private tiendaService: TiendaService = inject(TiendaService);

  tiendaForm!: FormGroup;
  tiendas$!: Observable<Itienda[]>;
  editar = false;

  tienda: Itienda = {
    titulo: '',
    direccion: '',
    footer: '',
    email: '',
    whatsapp: 0,
    instagram: ''
  }

  constructor() {

    // Obtiene la referencia a la coleccion de la tienda
    const tiendaCollection = collection(this.firestore, 'tienda');

    // Obtiene los datos de documentos en la coleccion
    this.tiendas$ = collectionData(tiendaCollection) as Observable<Itienda[]>;

    // recupera el formulario - Tiene validaciones de ser necesarias
    this.tiendaForm = this.fb.group({
      titulo: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      footer: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: ['', [Validators.required]],
      instagram: ['', [Validators.required]],
    })
  }

  precargarForm(tienda: Itienda) {
    this.tiendaForm.setValue({
      titulo: tienda.titulo,
      direccion: tienda.direccion,
      footer: tienda.footer,
      email: tienda.email,
      whatsapp: tienda.whatsapp,
      instagram: tienda.instagram
    })
    this.editar= true;
  }

  async actualizarTienda(){
    this.tienda = this.tiendaForm.value;
    const path = 'tienda';
    const id = '1HJ7lmEadr6q6VKT1Y3Q';

    // Cargamos los cambios en firebase
    const resp = await this.tiendaService.actualizarTienda(this.tienda, path, id);
    console.log('tienda actualizada => ');
    console.log(resp);
    this.editar=false;
  }

}