import {Http} from "@angular/http";
import {Agendamento} from "./agendamento";
import {Injectable} from "@angular/core";
import {AgendamentoDao} from "./agendamento-dao";

@Injectable()
export class AgendamentoService {
  constructor(
    private _http: Http,
    private _agendamentoDao: AgendamentoDao
  ) { }

  private _montaUri(agendamento: Agendamento) {
    return `https://aluracar.herokuapp.com/salvarpedido?carro=${agendamento.carro.nome}&preco=${agendamento.valor}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
  }

  agenda( agendamento: Agendamento) {
    const api = this._montaUri(agendamento);

    return this._agendamentoDao.ehAgendamentoDubplicado(agendamento)
      .then(existe => {
        if (existe) throw new Error('Esse agendamento já foi realizado!');
        return this._http
          .get(api)
          .toPromise()
          .then(() => agendamento.confirmado = true, err => console.error(err))
          .then(() => this._agendamentoDao.salva(agendamento))
          .then(() => agendamento.confirmado);
      })
  }

  reagenda(agendamento: Agendamento) {
    const api = this._montaUri(agendamento);
    return this._http
          .get(api)
          .toPromise()
          .then(() => agendamento.confirmado = true, err => console.error(err))
          .then(() => this._agendamentoDao.salva(agendamento))
          .then(() => agendamento.confirmado);
  }
}
