import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CorsInterceptor } from './cors.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutoComponent } from './produto/produto.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    // Registre o interceptor
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent] // Apenas o componente raiz (AppComponent) deve ser declarado aqui
})
export class AppModule { }
