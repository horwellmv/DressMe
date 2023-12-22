import { Component, OnInit } from '@angular/core';
import { Iarticulo } from 'src/app/interfaces/iarticulo';
import { ArticuloService } from 'src/app/servicios/articulo.service';

@Component({
  selector: 'app-admin-catalogo',
  templateUrl: './admin-catalogo.component.html',
  styleUrls: ['./admin-catalogo.component.css']
})
export class AdminCatalogoComponent implements OnInit {

  listaArticulos: Iarticulo[] = [];
  articuloSeleccionado: Iarticulo | null = null;

  constructor(private articuloServ: ArticuloService) {}

  ngOnInit(): void {
    this.traerArticulos();
  }

  traerArticulos() {
    this.articuloServ.traerArticulos().subscribe(articulos => {
      this.listaArticulos = articulos;
    });
  }

  modificarArticulo(articulo: Iarticulo) {
    this.articuloSeleccionado = { ...articulo };
  }

  async guardarCambios() {
    if (this.articuloSeleccionado) {
      try {
        await this.articuloServ.actualizarArticulo(this.articuloSeleccionado);
        console.log('Cambios guardados');
        this.traerArticulos();
      } catch (error) {
        console.error('Error al guardar cambios:', error);
      }
    }
    this.articuloSeleccionado = null;
  }

  async borrarArticulo(articulo: Iarticulo) {
    const respuesta = await this.articuloServ.borrarArticulo(articulo);
    console.log('respuesta del metodo BorrarArticulo', respuesta);
    this.traerArticulos();
  }
  
}
