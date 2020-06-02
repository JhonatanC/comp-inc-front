import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';

import { Route, RouterModule } from '@angular/router';
//import { AuthGuard } from './guards/auth.guard';

const routes: Route[] = [
  { path: 'login', component: LoginComponent },
  /*{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'form', component: FormComponent, canActivate: [AuthGuard] },*/
  { path: 'home', component: HomeComponent},
  { path: 'form', component: FormComponent},
  { path: 'form/:id', component: FormComponent},
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
