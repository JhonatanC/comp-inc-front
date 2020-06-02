import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ClientesService } from '../services/clientes.service';

//import { AuthGuard } from '../guards/auth.guard';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	url = 'http://localhost/company-inc-back/public/api';
	clientes = [];

	constructor( private clientesService: ClientesService, private http: HttpClient, private router: Router ) {
		this.getClientes();
	}

	ngOnInit(): void {
	}

	getClientes(){
		this.http.get(`${this.url}/clientes`).subscribe( (data: any) => {
			this.clientes = data;
		});
	}

	delete(id){
		this.clientesService.delete(id).subscribe( (data) => {
			//console.log('Dato Eliminado con éxito');
			this.getClientes();
		});
	}

	salir(){
		localStorage.removeItem('in_anget');
	}

}
