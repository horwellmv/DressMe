import { Component, inject } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Itienda } from 'src/app/interfaces/itienda';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private firestore: Firestore = inject(Firestore);
  private auth: AngularFireAuth = inject(AngularFireAuth);
  private router: Router = inject(Router);
  
  
  tiendas$!: Observable<Itienda[]>;

  constructor(){
    // Obtiene la referencia a la coleccion de la tienda
    const tiendaCollection = collection(this.firestore, 'tienda');
    // Obtiene los datos de documentos en la coleccion
    this.tiendas$ = collectionData(tiendaCollection) as Observable<Itienda[]>;
  }


  logOut(){
    console.log("funciona logout");
    this.auth.signOut();
    this.router.navigate(['/auth']);    
  }

}
