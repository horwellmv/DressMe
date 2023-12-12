import { Injectable } from '@angular/core';
import { Itienda } from '../interfaces/itienda';
import { AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor( private AngFirestore: AngularFirestore) { }

  actualizarTienda(tienda : Itienda, path: string, id: string | undefined){
    const collection = this.AngFirestore.collection(path);
    return collection.doc(id).update(tienda)
  }

}
