import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

	url = 'http://localhost/company-inc-back/public/api';

	constructor( private http: HttpClient ) {

	}

	getDeparment(){
		return this.http.get(`${this.url}/departamentos`);
	}

	getMunicipio(){
		return this.http.get(`${this.url}/municipios`);
	}

	getAgente(){
		return this.http.get(`${this.url}/agentes`);
	}

	save(cliente: Cliente){
		const headers = new HttpHeaders({'Content-Type':'application/json'});
		return this.http.post(`${this.url}/clientes`,cliente,{headers:headers});
	}

	put(cliente){
		const headers = new HttpHeaders({'Content-Type':'application/json'});
		return this.http.put(`${this.url}/clientes/${cliente.id}`,cliente,{headers:headers});
	}

	delete(id){
		return this.http.delete(`${this.url}/clientes/${id}`);
	}
}
