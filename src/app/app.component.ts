import { PerfilPage } from './../pages/perfil/perfil';
import { LoginPage } from './../pages/login/login';
import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AgendamentosPage} from "../pages/agendamentos/agendamentos";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  public paginas = [
    { titulo: 'Perfil', component: PerfilPage},
    { titulo: 'Agendamentos', component: AgendamentosPage}
  ];
  @ViewChild(Nav) public nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrePagina(pagina) {
    console.log(pagina);
    this.nav.push(pagina.component);
  }
}

