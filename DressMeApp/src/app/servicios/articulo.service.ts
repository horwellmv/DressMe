import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iarticulo } from '../interfaces/iarticulo';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private firestore:Firestore) { }

  traerArticulos():Observable <Iarticulo[]>{
    const articuloRef = collection(this.firestore, 'articulos');
    return collectionData( articuloRef, {idField:'id'}) as Observable<Iarticulo[]>;
  }

}
