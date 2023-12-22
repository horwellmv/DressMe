import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iarticulo } from '../interfaces/iarticulo';
import { Firestore, collection, addDoc, doc, deleteDoc, collectionData, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private firestore: Firestore) {}

  agregarArticulo(articulo: Iarticulo): Promise<void> {
    const articuloRef = collection(this.firestore, 'articulos');
    return addDoc(articuloRef, articulo).then(() => {});
  }

  traerArticulos(): Observable<Iarticulo[]> {
    const articulosRef = collection(this.firestore, 'articulos');
    return collectionData(articulosRef, { idField: 'id' }) as Observable<Iarticulo[]>;
  }

  borrarArticulo(articulo: Iarticulo): Promise<void> {
    const articuloDocRef = doc(this.firestore, `articulos/${articulo.id}`);
    return deleteDoc(articuloDocRef).then(() => {});
  }

  actualizarArticulo(articulo: Iarticulo): Promise<void> {
    const articuloDocRef = doc(this.firestore, `articulos/${articulo.id}`);
    return setDoc(articuloDocRef, articulo).then(() => {});
  }
}

