import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent {
  private firestore: Firestore = inject(Firestore);

  users$: Observable<UserProfile[]>;
  //usersCollection: CollectionReference;

  usuarios$: Observable<Usuarios[]>;

    constructor() {
        // get a reference to the user-profile collection
        const userProfileCollection = collection(this.firestore, 'users');
        const usuariosCollection = collection(this.firestore, 'usuarios');

        // get documents (data) from the collection using collectionData
        this.users$ = collectionData(userProfileCollection) as Observable<UserProfile[]>;
        this.usuarios$ = collectionData(usuariosCollection) as Observable<Usuarios[]>;
    }

    pepe: Usuarios = {
      
      nombre: 'test1',
      email: 'test1@gmail.com',
      turno: new Date,
      estado: true
    }
    



    async addUsuario() {
      //if (!usuario) return;
      try {
        const docRef = await addDoc(collection(this.firestore, 'usuarios'), this.pepe)
      } catch (error) {
        console.log('error en metodo addusuarios: ', error)
      }
    }

}

export interface UserProfile {
  username: string;
}

export interface Usuarios {
  id?: string;
  nombre: string;
  email: string;
  turno: Date;
  estado: boolean;
}

