import { Component, OnInit } from '@angular/core';


import { Cliente } from '../interfaces/cliente';

import { ClientesService } from '../services/clientes.service';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

	cliente: Cliente = {
		firtsname: null,
		lastname: null,
		phone: null,
		adress: null,
		deparment: null,
		city: null,
		agente_id: null
	};

	departamentos = [];
	municipios = [];
	agentes = [];

	id_r: any;
	editing: boolean = false;

	clientes: any;

	constructor( private clienteService: ClientesService, private activatedRoute: ActivatedRoute, private http: HttpClient ) {

		this.clienteService.getDeparment().subscribe( (data: any) => {
			this.departamentos = data;
		});

		this.clienteService.getMunicipio().subscribe( (data: any) => {
			this.municipios = data;
		});

		this.clienteService.getAgente().subscribe( (data: any) => {
			this.agentes = data;
		});

		this.id_r = this.activatedRoute.snapshot.params['id'];

		if(this.id_r){
			this.editing = true;
			this.http.get(`http://localhost/company-inc-back/public/api/clientes/${this.id_r}`).subscribe( (data: any) => {
				this.cliente = data;
			})
		} else {
			this.editing = false;
		}


	}

	ngOnInit(): void {
	}

	saveClient(){
		if(this.editing){
			this.clienteService.put(this.cliente).subscribe( (data) => {
				console.log('Dato actualizado correcamente');
			});
		} else {
			this.clienteService.save(this.cliente).subscribe( (data) => {
				console.log('Dato guardado correcamente');
			});
		}
	}

}
