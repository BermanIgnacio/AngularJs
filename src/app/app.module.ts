import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Pages/home/home.component';
import { RegistroComponent } from './Pages/registro/registro.component';
import { LoginComponent } from './Pages/login/login.component';
import { DetalleComponent } from './Pages/detalle/detalle.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ButtonPokeballComponent } from './Components/button-pokeball/button-pokeball.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent,
    DetalleComponent,
    NavbarComponent,
    FooterComponent,
    ButtonPokeballComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
