import {Http} from "@angular/http";
import {Agendamento} from "./agendamento";
import {Injectable} from "@angular/core";

@Injectable()
export class AgendamentoService {
  constructor(
    private _http: Http
  ) { }

  agenda( agendamento: Agendamento) {
    const api = `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&preco=${agendamento.valor}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
    return this._http
      .get(api)
      .toPromise();
  }
}
