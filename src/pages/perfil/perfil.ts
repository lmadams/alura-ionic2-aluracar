import { UsuarioService } from './../../domain/usuario/usuario-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _usuarioService: UsuarioService) {}

  get usuarioLogado() {
    return this._usuarioService.obtemUsuarioLogado();
  }

}
