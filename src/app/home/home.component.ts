import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-child',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  
  nick:string;
  constructor(private router:Router) { }

  ngOnInit() {  	
  	if(window.sessionStorage)
    	this.nick = sessionStorage.getItem("nick");
  }

}
