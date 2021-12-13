import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AeropuertoModelo } from 'src/app/modelos/aeropuerto.model';
import { AeropuertoService } from 'src/app/servicios/aeropuerto.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
   nombre: ['', [Validators.required]],
   ciudad: ['', [Validators.required]],
   pais: ['', [Validators.required]],
   coord_x: ['', [Validators.required]],
   coord_y: ['', [Validators.required]],
   siglas: ['', [Validators.required]],
   tipo: ['', [Validators.required]],
  
  });

  id: string=''

  constructor(private fb: FormBuilder,
    private aeropuertoService: AeropuertoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }
//método para traer la informacion del registro
  buscarRegistro(id: string){
    this.aeropuertoService.getWithId(id).subscribe((data: AeropuertoModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["nombre"].setValue(data.nombre)
      this.fgValidacion.controls["ciudad"].setValue(data.ciudad)
      this.fgValidacion.controls["pais"].setValue(data.pais)
      this.fgValidacion.controls["coord_x"].setValue(data.coord_x)
      this.fgValidacion.controls["coord_y"].setValue(data.coord_y)
      this.fgValidacion.controls["siglas"].setValue(data.siglas)
      this.fgValidacion.controls["tipo"].setValue(data.tipo)
           
    })
  }
 //metodo para editar la informacion 
  edit(){
    let aeropuerto = new AeropuertoModelo();
    aeropuerto.id = this.fgValidacion.controls["id"].value;
    aeropuerto.nombre = this.fgValidacion.controls["nombre"].value;
    aeropuerto.pais = this.fgValidacion.controls["pais"].value;
    aeropuerto.coord_x = this.fgValidacion.controls["coord_x"].value;
    aeropuerto.coord_y = this.fgValidacion.controls["coord_y"].value;
    aeropuerto.siglas = this.fgValidacion.controls["siglas"].value;
    aeropuerto.tipo = this.fgValidacion.controls["tipo"].value;
  
    this.aeropuertoService.update(aeropuerto).subscribe((data: AeropuertoModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/aeropuertos/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }


}

