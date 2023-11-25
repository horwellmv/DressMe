import { Component } from '@angular/core';
import { ArticuloService } from 'src/app/servicios/articulo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  
  listaArticulos: any []=[]; 

  constructor(private articuloServ: ArticuloService){}
  
  ngOnInit(): void {
    this.articuloServ.traerArticulos().subscribe(articulos =>{
      console.log('Articulos recibidios desde Firestore => ', articulos);
      this.listaArticulos = articulos;
    });
  }

}
