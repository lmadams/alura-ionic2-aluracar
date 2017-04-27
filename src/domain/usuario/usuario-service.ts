import { Usuario } from './usuario';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

const KEY_AVATAR = 'avatarUrl';

@Injectable()
export class UsuarioService {

    private _usuarioLogado: Usuario;

    constructor(
        private _http: Http
    ) {}

    public efetuaLogin(email: string, senha: string) {
        let api = `https://aluracar.herokuapp.com/login?email=${email}&senha=${senha}`;

        return this._http
            .get(api)
            .map(res => res.json().usuario)
            .toPromise()
            .then(dado => {
                let usuario = new Usuario(dado.nome, dado.dataNascimento, dado.email, dado.telefone);
                this._usuarioLogado = usuario;
                return usuario;
            });
    }

    obtemUsuarioLogado() {
        return this._usuarioLogado;
    }

    guardaAvatar(url: string) {
      localStorage.setItem(KEY_AVATAR, url);
    }

    obtemAvatar(): any {
      localStorage.getItem(KEY_AVATAR);
    }
}
