import { Component } from '@angular/core';
import {Alert, AlertController, NavController, NavParams} from 'ionic-angular';
import {Carro} from "../../domain/carro/carro";
import {HomePage} from "../home/home";
import {Agendamento} from "../../domain/agendamento/agendamento";
import {AgendamentoService} from "../../domain/agendamento/agendamento-service";
import { Vibration } from '@ionic-native/vibration';

@Component({
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public agendamento: Agendamento;
  public carro: Carro;
  public precoTotal: number;
  private _alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentoService: AgendamentoService,
    private _alertCtrl: AlertController,
    private _vibration: Vibration) {

    this.carro = this.navParams.get('carro');
    this.precoTotal = this.navParams.get('precoTotal');
    this.agendamento = new Agendamento(this.carro, this.precoTotal);

    this._alerta = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [{text: 'Ok', handler: () => this.navCtrl.setRoot(HomePage)}]
    });
  }

  agenda() {

    if (!this.agendamento.nome || !this.agendamento.endereco || !this.agendamento.email) {
      this._vibration.vibrate(500);
      this._alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Você deve preencher todas as informações',
        buttons: [{text: 'Ok'}]
      }).present();

      return;
    }

    this._agendamentoService
      .agenda(this.agendamento)
      .then(confirmado => {
        confirmado ?
          this._alerta.setSubTitle('Agendamento realizado com sucesso!') :
          this._alerta.setSubTitle('Não foi possivel realizar o agendamento. Tente novamente mais tarde!');
        this._alerta.present();
      })
      .catch(err => {
        console.error(err);
        this._alerta.setSubTitle(err.message);
        this._alerta.present();
      });
  }
}
