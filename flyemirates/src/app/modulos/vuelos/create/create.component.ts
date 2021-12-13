import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutaModelo } from 'src/app/modelos/ruta.model';
import { VueloModelo } from 'src/app/modelos/vuelo.model';
import { RutaService } from 'src/app/servicios/ruta.service';
import { VueloService } from 'src/app/servicios/vuelo.service';
import Swal from 'sweetalert2'




@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private vueloService: VueloService,
    private router: Router,
    private rutaService: RutaService,) {  }
    
    listadoAeropuertos: RutaModelo[] = []

  fgValidacion = this.fb.group({
    fecha_inicio: ['', [Validators.required]],
    hora_inicio: ['', [Validators.required]],
    fecha_fin: ['', [Validators.required]],
    hora_fin: ['', [Validators.required]],
    asientos_vendidos: ['', [Validators.required]],
    nombre_piloto: ['', [Validators.required]],
    ruta: ['', [Validators.required]],
  });


  ngOnInit(): void {
  }

  store() {
    let vuelo = new VueloModelo();
    vuelo.fecha_inicio =  new Date(this.fgValidacion.controls["fecha_inicio"].value).toISOString()
    vuelo.hora_inicio = this.fgValidacion.controls["hora_inicio"].value;
    vuelo.fecha_fin = new Date(this.fgValidacion.controls["fecha_fin"].value).toISOString()
    vuelo.hora_fin = this.fgValidacion.controls["hora_fin"].value;
    vuelo.asientos_vendidos = this.fgValidacion.controls["asientos_vendidos"].value;
    vuelo.nombre_piloto = this.fgValidacion.controls["nombre_piloto"].value;
    vuelo.ruta = this.fgValidacion.controls["ruta"].value;
    


    this.vueloService.store(vuelo).subscribe((data: VueloModelo) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/vuelos/get']);
    },
      (error: any) => {
        console.log(error)
        alert("Error en el envio");
      })
  }


  getAllRutas(){
    this.rutaService.getAll().subscribe((data: RutaModelo[]) => {
      this.listadoAeropuertos = data
      console.log(data)
    })
  }


}
