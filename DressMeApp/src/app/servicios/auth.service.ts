import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Iperfil } from '../interfaces/iperfil';
import { Firestore, collection, addDoc, doc, deleteDoc, collectionData, setDoc } from '@angular/fire/firestore';
import { AngularFirestore} from "@angular/fire/compat/firestore";
import { getAuth, deleteUser } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, 
              private firestore: Firestore, 
              private AngFirestore: AngularFirestore) { }

  crearDocPerfil(perfil : Iperfil, path: string, id: string | undefined){
    const collection = this.AngFirestore.collection(path);
    return collection.doc(id).set(perfil)
  }

  login(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  registrarPerfil(perfil: Iperfil) {
    return this.auth.createUserWithEmailAndPassword(perfil.email, perfil.password)
  }

  borrarPerfil(perfil : Iperfil){
    const perfilDocRef = doc (this.firestore, `perfiles/${perfil.id}`); // Son importantes el uso de las comillas invertidas.
    return deleteDoc(perfilDocRef) // falta borrar tambien el usuario auth login  de Authsevice firebase
  }

}