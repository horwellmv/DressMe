import { Component, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Iarticulo } from 'src/app/interfaces/iarticulo';

@Component({
  selector: 'app-nuevo-articulo',
  templateUrl: './nuevo-articulo.component.html',
  styleUrls: ['./nuevo-articulo.component.css']
})

export class NuevoArticuloComponent {

  private firestore: Firestore = inject(Firestore);
  
  // ARREGLOS PARA USAR EN LOS METODOS DE LA CLASE
  ArticuloForm: FormGroup; // async crearArticulo() => Asigna los Values del form html al Objeto Articulo
  fileEvent: [] = []; // crearListaArchivos($event: any) => lista de eventos al cargar las imagenes en el imput html.
  imagenes: string[] = []; // URL de las imagenes en el storage para pasar como atributo al obj
  adjuntar: boolean = false; // Oculta el input de imagenes hasta no hacer primero el formulario

  // CREA UNA INSTANCIA DE ARTICULO BASE 
  articulo:  Iarticulo ={
    titulo: "undefined",
    publico: "undefined",
    categoria: "undefined",
    detalle: "undefined",
    imagen: [],
    precio: 0,
    disponible: true,
    fecha: new Date(),
  };

  constructor(
    private storage: Storage,
    private fb: FormBuilder) {

    //  CREA UNA INSTANCIA DE FORMULARIO BASE - ESTE RECIBIRÁ LOS DATOS DESDE EL HTML FORM
    this.ArticuloForm = this.fb.group({
      titulo: ['', [Validators.required]],
      publico: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      detalle: ['Sin detalles.'],
      imagen: [[''],[Validators.required]],
      disponible: [true],
      precio: [[Validators.required]],
    })
  }

  ngOnInit(): void {

  }

  // EJECUTA AL SUBMIT DEL FORM HTML
  async crearArticulo() { 
    this.adjuntar=true;
    console.log("Ejecutando crearArticulo() => valores del form: ",this.ArticuloForm.value);  // Este es un test Unitario
  }

  // EJECUTA AL SELECCIONAR LOS IMPUT DE IMAGENES
  crearListaArchivos($event: any) {
    this.fileEvent = []; // Limpia los eventos previos
    this.imagenes = []; // limpia la lista de URLs previas
    this.fileEvent = $event.target.files; // ejecuta al seleccionar los archivos adjuntos.
    console.log("CrearListaArchivos() => Eventos del Input en : ", this.fileEvent , "thisImagenes deberia estar limpia: =>", this.imagenes);  // Este es un test Unitario
  }

  // EJECUTA AL CONFIRMAR Y FINALIZAR EL FORM
  async SubirArticulo(){
    if (!this.articulo) {
      console.log('Error en metodo subirArticulo(), no se ecnuetra articulo');
      return;
    }
    try {
      for (let i = 0; i < this.fileEvent.length; i++) {
        const file : any = this.fileEvent[i];
        console.log("file name: ", file.name)  // Este es un test Unitario
  
        //Crea la REFERENCIA DE RUTA a cada imagen. EJEMPLO:  Catalogo/masculino/gala/nombreDeImagen.jpg
        const imgRef = ref(this.storage,
          `catalogo/${this.ArticuloForm.value.publico}`+
          `/${this.ArticuloForm.value.categoria}`+
          `/${this.ArticuloForm.value.titulo}`+
          `/${file.name}`);
        console.log("referencia creada desde el file: ", imgRef); // Este es un test Unitario
  
        // ESTE METODO ES NATIVO DE FIREBASE Y SUBE LAS IMAGENESA STORAGE
        uploadBytes(imgRef, file).then(resp => {
          console.log("respuesta del metodo que sube al storage => ",resp);
          getDownloadURL(imgRef).then((url) => {
            this.imagenes.push(url);
            console.log("uploadBytes => URL de descarga: ", url);  // Este es un test Unitario => ME DEVUELVE LAS URL PARA NMOSTRAR IMAGENES
          })
        }).catch(err => console.log('error desde metodo uploadBytes', err));  // Este es un test Unitario de error
      }
      
      setTimeout(() => {
        this.setearArticulo();
      }, 10000);
      
      console.log("setearArticulo desde llamada : REVISAR ____ Este es el ultimo articulo actualizado => ", this.articulo); // Este es un test Unitario
      setTimeout(() => {
        this.enviarObjFirebase(this.articulo);
      }, 20000);

    } catch (error) {
      console.log('error en metodo subirArticulo(): ', error, " Este es el articulo con error: ", this.articulo) // Este es un test Unitario de error
    }
    this.adjuntar=false;
  }

  //  ESTE METODO TOMA LOS DATOS DEL FORMULARIO Y CREA CON ELLOS EL ARTICULO
  setearArticulo (){
    this.articulo = this.ArticuloForm.value;
    this.articulo.fecha = new Date;
    if (this.imagenes.length<this.fileEvent.length) {
      console.log(this.imagenes.length,this.fileEvent.length)
    }
    this.articulo.imagen = this.imagenes; //LOGRAR QUE SE CARGEN LAS URL DE IMAGENES EN LA LISTA IMAGENES
    console.log("ARTICULO desde METODO setearArticulo() paso el timeOut=> : ", this.articulo)  // Este es un test Unitario - 
  }

  //  ESTE METODO RECIBE UN ARTICULO POR PARAMETRO Y LO CARGA EN LA BASE DE DATOS
  async enviarObjFirebase(art :Iarticulo){
    const docRef = await addDoc(collection(this.firestore, 'articulos'), art);
    console.log('Exito en subirArticulo() esto es el articulo enviado: ', art);   // Este es un test Unitario - 
  }
}