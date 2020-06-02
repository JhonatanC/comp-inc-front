import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { ClientesService } from '../services/clientes.service';

@Injectable({
  providedIn: 'root'
})
/*export class AuthGuard implements CanActivate {

	constructor( private clientesService: ClientesService, private router: Router ){

	}

	canActivate(){
		if( this.clientesService.isAuthAgent() ) {
			return true;
		} else {
			this.router.navigateByUrl('/login');
			return false;
		}
	}
  
}
*/