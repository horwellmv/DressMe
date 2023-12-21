import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { Iarticulo } from '../interfaces/iarticulo';
import { Firestore, collection, getDoc, collectionData, DocumentReference, addDoc, DocumentData } from '@angular/fire/firestore';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CajaService {
  private selectedArticuloRef: DocumentReference<DocumentData> | undefined;
  facturaItems: any[] = [];

  constructor(private firestore: Firestore) { }

  setSelectedArticulo(articuloRef: DocumentReference<DocumentData>): void {
    this.selectedArticuloRef = articuloRef;
  }


  traerArticulos(): Observable<Iarticulo[]> {
    const articulosRef = collection(this.firestore, 'articulos');
    return collectionData(articulosRef, { idField: 'id' }) as Observable<Iarticulo[]>;
  }
  traerArticuloPorId(articuloRef: DocumentReference<DocumentData>): Observable<Iarticulo | undefined> {
    return from(getDoc(articuloRef)).pipe(
      catchError((error: any) => {
        console.error('Error al obtener el documento:', error);
        return of(undefined);
      }),
      map((snap: any) => (snap.exists() ? { id: snap.id, ...snap.data() } as Iarticulo : undefined))

    );
  }
  async agregarFactura(facturaData: any): Promise<DocumentReference<DocumentData>> {
    const facturasCollectionRef = collection(this.firestore, 'facturas');
    return addDoc(facturasCollectionRef, facturaData);
  }
  async seleccionarArticulo(articulo: any, cantidadSeleccionada: number): Promise<void> {
    const facturaItem = {
      articulo: articulo.titulo,
      cantidad: cantidadSeleccionada,
      precioUnitario: articulo.precio,
      total: articulo.precio * cantidadSeleccionada,
    };

    if (articulo.selected) {
      this.agregarArticuloAFactura(facturaItem);
    } else {
      this.eliminarArticuloDeFactura(facturaItem.articulo);
    }
  }

  private agregarArticuloAFactura(item: any): void {
    this.facturaItems.push(item);
  }

  private eliminarArticuloDeFactura(articulo: string): void {
    const index = this.facturaItems.findIndex((item) => item.articulo === articulo);
    if (index !== -1) {
      this.facturaItems.splice(index, 1);
    }
  }


}