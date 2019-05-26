import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  apiUrl = "http://localhost:8080/rest";
  constructor(private http: HttpClient) { }

  login(nick, pass){
  	let formData = new FormData();
  	formData.append("nick",nick);
  	formData.append("pass",pass);
  	return this.http.post(this.apiUrl+"/login", formData, {responseType:'text'});
  }

}
