import { Component, inject } from '@angular/core';
import { User, user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Iperfil } from 'src/app/interfaces/iperfil';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent {
  formPerfil: FormGroup;
  private firestore: Firestore = inject(Firestore);
  private authSevice: AuthService = inject(AuthService);

  perfil: Iperfil = {
    nombre: "",
    email: "",
    password: "",
    admin: false,
  }

  perfiles$: Observable<Iperfil[]>;

  constructor(private fb: FormBuilder, private auth: AngularFireAuth, private router: Router) {

    // get a reference to the user-profile collection
    const perfilesCollection = collection(this.firestore, 'perfiles');

    // get documents (data) from the collection using collectionData
    this.perfiles$ = collectionData(perfilesCollection) as Observable<Iperfil[]>;

    this.formPerfil = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      admin: [],
    })
  }

  async crearPerfil() {
    // Creamos usuario con mail y contraseña
    const resp = await this.authSevice.registrarPerfil(this.formPerfil.value).catch(error => {
      console.log(error);
    });
    if (resp) {
      console.log('Exito a crear usuario => ', resp.user); // regresa el usuario => Pediente agregar el user al Iperfil como parametro 

      // Preparamos el objeto Iperfil
      this.perfil = this.formPerfil.value;
      const path = 'perfiles';
      const id = resp.user?.uid;
      this.perfil.id = id;
      console.log('Perfil creado con User => ', this.perfil)

      // Cargamos el perfil en la Db
      await this.authSevice.crearDocPerfil(this.perfil, path, id);
      this.formPerfil.reset();
    }
  }

  async eliminarPerfil(perfil: Iperfil) {
    const resp = await this.authSevice.borrarPerfil(perfil);
    console.log('Exito al borrar perfil => ', resp);
  }

}
