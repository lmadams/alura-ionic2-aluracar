import { UsuarioService } from './../../domain/usuario/usuario-service';
import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage implements OnInit{

  public urlImage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _usuarioService: UsuarioService,
    private _camera: Camera) { }

  get usuarioLogado() {
    return this._usuarioService.obtemUsuarioLogado();
  }

  ngOnInit() {
    this.urlImage = this._usuarioService.obtemAvatar();
  }

  tiraFoto() {

    const options: CameraOptions = {
      destinationType: this._camera.DestinationType.FILE_URI,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    this._camera.getPicture(options)
      .then(url => {
        this._usuarioService.guardaAvatar(url);
        this.urlImage = url;
      }, (err) => {
        console.error(err);
      });
  }
}
