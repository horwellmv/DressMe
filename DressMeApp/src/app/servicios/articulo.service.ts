import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iarticulo } from '../interfaces/iarticulo';
import { Firestore, collection, addDoc, doc, deleteDoc, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private firestore:Firestore) { }

  agregarArticulo(articulo : Iarticulo){
    const articuloRef = collection(this.firestore, 'articulos');
    return addDoc(articuloRef, articulo);
  }

  traerArticulos():Observable <Iarticulo[]>{
    const articulosRef = collection(this.firestore, 'articulos');
    return collectionData( articulosRef, {idField:'id'}) as Observable<Iarticulo[]>;
  }

  borrarArticulo(articulo : Iarticulo){
    const articuloDocRef = doc (this.firestore, `articulos/${articulo.id}`); // Son importantes el uso de las comillas invertidas.
    return deleteDoc(articuloDocRef);
  }

}
