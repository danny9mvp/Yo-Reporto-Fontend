import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { Router } from '@angular/router';
import { ReporteService } from '../services/reporte.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ImgUrService } from '../services/img-ur.service';
@Component({
  selector: 'app-child',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {  
  formReporte: FormGroup;  
  nick:string;
  reportes:any;
  foto:File=null;   

  constructor(private reporteService:ReporteService, private imgUrService:ImgUrService ,private router:Router, 
    private formBuilder:FormBuilder) { }    

  onFileChange(event) {
     this.foto = event.target.files[0]; // <--- File Object for future use.     
  }

  onSubmit(){    
    console.log(this.foto);    
    this.imgUrService.postImgUr(this.foto).subscribe(data=>{      
      var reporte = {
        titulo:this.formReporte.controls['titulo'].value, descripcion:this.formReporte.controls['descripcion'].value,
        usuario:this.nick, fecha:new Date().toUTCString(), estado: 'En espera', ubicacion: 1,foto: data[0].link
      };
      this.reporteService.crearReporte(reporte).subscribe(data=>{
        console.log(data);
      },
      error=>{
        console.log(error);
      });
    },
    error=>{
      console.log(error);
    });      
  }

  ngOnInit() {  	
  	if(window.sessionStorage)
    	this.nick = sessionStorage.getItem("nick");
    this.reporteService.listarReportes().subscribe(data =>{
    	this.reportes = data;
    	console.log(data);
    },
    err=>{
    	console.log(err);
    });
    this.formReporte = this.formBuilder.group({titulo:['', Validators.required], descripcion:['', Validators.required], 
      foto:[null, Validators.required]});    
  }

}
