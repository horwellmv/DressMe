import { Component } from '@angular/core';
import { Iarticulo } from 'src/app/interfaces/iarticulo';
import { ArticuloService } from 'src/app/servicios/articulo.service';
@Component({
  selector: 'app-admin-catalogo',
  templateUrl: './admin-catalogo.component.html',
  styleUrls: ['./admin-catalogo.component.css']
})
export class AdminCatalogoComponent {

  listaArticulos: Iarticulo[] = []; 

  constructor(private articuloServ: ArticuloService){}
  
  ngOnInit(): void {
    this.traerArticulos();
  }

  traerArticulos(){
    this.articuloServ.traerArticulos().subscribe(articulos =>{
      this.listaArticulos = articulos;
      // console.log(articulos);
    });
  }

  modificarArticulo(articulo : Iarticulo){

  }

  async borrarArticulo(articulo: Iarticulo){
    const respuesta =await this.articuloServ.borrarArticulo(articulo);
    console.log('respuesta del metodo BorrarArticulo',respuesta)
  }

}