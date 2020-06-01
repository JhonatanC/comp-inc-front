import { Component, OnInit } from '@angular/core';


import { Cliente } from '../interfaces/cliente';

import { ClientesService } from '../services/clientes.service';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

	formulario: FormGroup;

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

	constructor( private clienteService: ClientesService, private activatedRoute: ActivatedRoute, private http: HttpClient, private formB: FormBuilder, private router: Router ) {

		this.createForm();

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

	get firtsnameValid(){
		return this.formulario.get('firtsname').invalid && this.formulario.get('firtsname').touched
	}

	get lastnameValid(){
		return this.formulario.get('lastname').invalid && this.formulario.get('lastname').touched
	}

	get phoneValid(){
		return this.formulario.get('phone').invalid && this.formulario.get('phone').touched
	}

	get adressValid(){
		return this.formulario.get('adress').invalid && this.formulario.get('adress').touched
	}

	get deparmentValid(){
		return this.formulario.get('deparment').invalid && this.formulario.get('deparment').touched
	}

	get cityValid(){
		return this.formulario.get('city').invalid && this.formulario.get('city').touched
	}

	get agenteValid(){
		return this.formulario.get('agente').invalid && this.formulario.get('agente').touched
	}

	createForm(){
		this.formulario = this.formB.group({
			firtsname: ['', Validators.required ],
			lastname: ['', Validators.required],
			phone: ['',Validators.required],
			adress: ['',Validators.required],
			deparment: ['',Validators.required],
			city: ['',Validators.required],
			agente: ['',Validators.required]
		});
	}

	saveClient(){

		if( this.formulario.invalid ){
			return Object.values( this.formulario.controls ).forEach( (control) => {
				control.markAsTouched();
			});
		}
		
		if(this.editing){
			this.clienteService.put(this.cliente).subscribe( (data) => {
				this.router.navigate(['/home']);
				console.log('Dato actualizado correcamente');
			});
		} else {
			this.clienteService.save(this.cliente).subscribe( (data) => {
				//this.formulario.reset();
				this.router.navigate(['/home']);
				console.log('Dato guardado correcamente');
			});
		}

	}

	/*saveClient(){
		if(this.editing){
			this.clienteService.put(this.cliente).subscribe( (data) => {
				console.log('Dato actualizado correcamente');
			});
		} else {
			this.clienteService.save(this.cliente).subscribe( (data) => {
				console.log('Dato guardado correcamente');
			});
		}
	}*/

}
