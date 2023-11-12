import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { LoginComponent } from './componentes/auth/login/login.component';
import { DashboardComponent } from './componentes/admin/dashboard/dashboard.component';
import { AdminCatalogoComponent } from './componentes/admin/admin-catalogo/admin-catalogo.component';
import { CatalogoComponent } from './componentes/usuario/catalogo/catalogo.component';
import { TurnoComponent } from './componentes/usuario/turno/turno.component';
import { HeaderComponent } from './componentes/usuario/header/header.component';
import { FooterComponent } from './componentes/usuario/footer/footer.component';
import { NavbarComponent } from './componentes/admin/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AdminCatalogoComponent,
    CatalogoComponent,
    TurnoComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp({"projectId":"pp3-proyecto","appId":"1:1016829113014:web:1d1a77f1b660b5d9cdac17","storageBucket":"pp3-proyecto.appspot.com","apiKey":"AIzaSyDLkvdAUtikBW7ey-wPy6O9Q3H3k_MuXFc","authDomain":"pp3-proyecto.firebaseapp.com","messagingSenderId":"1016829113014","measurementId":"G-VDSZ8NQ93D"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
