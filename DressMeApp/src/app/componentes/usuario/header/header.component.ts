import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Itienda } from 'src/app/interfaces/itienda';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private firestore: Firestore = inject(Firestore);
  
  tiendas$!: Observable<Itienda[]>;

  constructor(){
    // Obtiene la referencia a la coleccion de la tienda
    const tiendaCollection = collection(this.firestore, 'tienda');
    // Obtiene los datos de documentos en la coleccion
    this.tiendas$ = collectionData(tiendaCollection) as Observable<Itienda[]>;
  }


}
