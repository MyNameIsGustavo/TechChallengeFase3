import { ICredenciais } from "../../interfaces/ICredenciais";
import { ModeloUsuario } from "./modeloUsuario";

export class VisaoModeloUsuario {
    private modeloUsuario: ModeloUsuario;

    constructor() { this.modeloUsuario = new ModeloUsuario() }

    async login(dadosLogin: ICredenciais): Promise<string | null> {
        return await this.modeloUsuario.login(dadosLogin);
    }

    async listarUsuarioPorId(tokenJWT: string, id: number) {
        return await this.modeloUsuario.listarUsuarioPorId(tokenJWT, id);
    }

    async buscarInformacoes(tokenJWT: string) {
        return await this.modeloUsuario.buscarInformacoes(tokenJWT);
    }

    async listarTodosUsuarios(tokenJWT: string) {
        return await this.modeloUsuario.listarTodosUsuarios(tokenJWT);
    }

    async deletarUsuario(tokenJWT: string, id: number) {
        return await this.modeloUsuario.deletarUsuario(tokenJWT, id);
    }
}