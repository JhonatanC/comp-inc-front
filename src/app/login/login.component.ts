import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { NgForm } from '@angular/forms';
import { AgenteModel } from '../models/agente.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ClientesService } from '../services/clientes.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	url = 'http://localhost/company-inc-back/public/api';

	formularioLogin: FormGroup;

	agente: AgenteModel = {
		name: null,
		cedula: null
	}

	constructor( private formB: FormBuilder, private clientesService: ClientesService, private http: HttpClient, private router: Router ) {
		this.loginForm();
	}

	ngOnInit(): void {
	}

	loginForm(){
		this.formularioLogin = this.formB.group({
			name: [''],
			cedula: ['']
		})
	}

	loginAgent(){
		return this.http.get(`${this.url}/agentes`).subscribe( (data: any) => {

			const nombref = this.formularioLogin.value.name;
			const cedulaf = this.formularioLogin.value.cedula;

			for(let i = 0; i <= data.length; i++ ){
				if( data[i].name == nombref && data[i].cedula == cedulaf ) {
					this.router.navigate(['/home']);
					break;
					//console.log('Ok');
					break;
				} else {
					alert('Datos incorrectos');
					//console.log('Error');
					//this.router.navigate(['/login']);
					break;
				}
			}
		});
	}

}
