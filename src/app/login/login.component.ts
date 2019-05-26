import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  formLogin: FormGroup;   
  error: boolean;  
  nick: string;
  constructor(private usuarioService:UsuarioService, private formBuilder:FormBuilder, private router:Router) { }

  ngOnInit() {
  	this.formLogin = this.formBuilder.group({usuario:['',Validators.required],pass:['',Validators.required]});
  }

  onSubmit(){  	
  	this.usuarioService.login(this.formLogin.get('usuario').value, this.formLogin.get('pass').value).subscribe(data =>{
  		this.error=false;  		
  		this.nick = data;
  		if(window.sessionStorage){
  			sessionStorage.setItem("nick", this.nick);
  		}
  		this.router.navigateByUrl('home');
  	},
  	error =>{  		  		
  		console.log(error);
  	});
  }  
}
