import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  SettingsService,
          SharedService,
          SidebarService,
          UsuarioService,
          LoginGuardsGuard } from './service.index';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardsGuard
  ],
  declarations: []
})
export class ServiceModule { }
