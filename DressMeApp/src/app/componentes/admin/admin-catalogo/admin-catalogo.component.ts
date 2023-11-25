import { Component } from '@angular/core';
import { ArticuloService } from 'src/app/servicios/articulo.service';
@Component({
  selector: 'app-admin-catalogo',
  templateUrl: './admin-catalogo.component.html',
  styleUrls: ['./admin-catalogo.component.css']
})
export class AdminCatalogoComponent {

  listaArticulos: any []=[]; 

  constructor(private articuloServ: ArticuloService){}
  
  ngOnInit(): void {
    this.articuloServ.traerArticulos().subscribe(articulos =>{
      console.log('Articulos recibidios desde Firestore => ', articulos);
      this.listaArticulos = articulos;
    });
  }

}