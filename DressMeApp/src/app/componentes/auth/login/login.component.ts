import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginUsuario: FormGroup;
  autenticando= false; // esto es logica del spinner para UX
  
  constructor(private fb:FormBuilder,private auth: AngularFireAuth,private router: Router){
    this.loginUsuario= this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
  }

  ngOninit(): void {
    
  }

  loginGoogle() {  // Pendiente para loguear con google
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  
  login(){
    const email= this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    this.autenticando=true; // esto es logica del spinner para UX
    
    this.auth.signInWithEmailAndPassword(email,password).then((usuario)=>{
      this.auth.currentUser.then()
      console.log(usuario);
      this.autenticando=false; // esto es logica del spinner para UX
      this.router.navigate(['/auth/dashboard']);
    }).catch((err)=>{
      console.log(err);
      alert(err);
      this.autenticando=false; // esto es logica del spinner para UX
    })
  }

}

