import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CajaService } from 'src/app/servicios/caja.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iarticulo } from 'src/app/interfaces/iarticulo';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, addDoc } from '@angular/fire/firestore';
@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
  articulos$: Observable<any[]> = new Observable<any[]>(); // Inicialización en el constructor
  facturas$: Observable<any[]> = new Observable<any[]>(); // Inicialización en el constructor
  totalVentas: number = 0;

  precio: number = 0;
  cantidadSeleccionada: number = 1; // Nueva propiedad para almacenar la cantidad seleccionada
  articulosSeleccionados: any[] = [];
  mostrarFormularioAgregarArticulos = false;
  facturaItems: any[] = [];
  facturaForm: FormGroup; // Agrega un FormGroup para el formulario

  obtenerTituloArticuloSeleccionado(): string {
    return this.articulosSeleccionados.map(a => a.titulo).join(', ');
  }
  constructor(private cajaService: CajaService, private fb: FormBuilder, private firestore: AngularFirestore) {
    this.facturaForm = this.fb.group({
      articulo: [''],
      fechaAlquiler: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      cliente: ['', Validators.required],
      numeroFactura: [''], // Agrega el campo para el número de factura

    });
  }


  ngOnInit() {
    this.articulos$ = this.cajaService.traerArticulos();
    this.facturas$ = this.cajaService.traerfacturas();

    // Suma las ventas desde facturas en firestore
    this.facturas$.forEach(element => {
      element.map(fact => this.totalVentas = this.totalVentas + fact.total);
      //console.log(this.totalVentas);
    });
  }


  abrirFormularioAgregarArticulos() {
    this.mostrarFormularioAgregarArticulos = true;
    this.generarNumeroFactura(); // Llama a la función para generar el número de factura

  }

  cerrarFormularioAgregarArticulos() {
    this.mostrarFormularioAgregarArticulos = false;
    this.limpiarFormulario();
  }

  seleccionarArticulo(articulo: any) {
    // Si el artículo está seleccionado, agregarlo a la facturaItems
    if (articulo.selected) {
      const facturaItem = {
        articulo: articulo.titulo,
        cantidad: this.cantidadSeleccionada,
        precioUnitario: articulo.precio,
        total: articulo.precio * this.cantidadSeleccionada,
        
      };

      this.facturaItems.push(facturaItem);
    } else {
      // Si el artículo está deseleccionado, eliminarlo de facturaItems
      const index = this.facturaItems.findIndex((item) => item.articulo === articulo.titulo);
      if (index !== -1) {
        this.facturaItems.splice(index, 1);
      }
    }
  }


  limpiarFormulario() {
    this.facturaForm.reset();
    this.facturaItems = []; // Limpia la lista de items de la factura
  }


  async agregarAFactura() {
    if (this.facturaForm.valid) {
      this.generarNumeroFactura(); // Mueve la generación del número de factura aquí

      const facturaData = {
        numeroFactura: this.facturaForm.get('numeroFactura')?.value || '',
        articulos: this.facturaItems,
        fechaAlquiler: this.facturaForm.get('fechaAlquiler')?.value || '',
        fechaEntrega: this.facturaForm.get('fechaEntrega')?.value || '',
        cliente: this.facturaForm.get('cliente')?.value || '',
        total: this.calcularPrecioTotal(),
      };

      try {
        await this.cajaService.agregarFactura(facturaData);

        // Resto del código para limpiar el formulario y otros estados
        this.facturaForm.reset();
        this.facturaItems = [];

        console.log('Factura agregada exitosamente.');
      } catch (error) {
        console.error('Error al agregar la factura:', error);
        // Manejar el error según tus necesidades
      }
    } else {
      console.error('Formulario no válido. Asegúrate de completar todos los campos requeridos.');
    }
  }

  generarNumeroFactura() {
    const numeroAleatorio = Math.floor(Math.random() * 1000000) + 1; // Genera un número aleatorio entre 1 y 1000000
    this.facturaForm.controls['numeroFactura'].setValue(numeroAleatorio);
  }

  calcularPrecioTotal(): number {
    return this.facturaItems.reduce((total, item) => total + item.total, 0);
  }

}

