import { ModeloPapelUsuario } from "./modeloPapelUsuario";

export class VisaoModeloPapelUsuario {
    private modeloPapelUsuario: ModeloPapelUsuario;

    constructor() { this.modeloPapelUsuario = new ModeloPapelUsuario() }

    async listarPapelUsuarioPorID(tokenJWT: string, id: number) {
        return await this.modeloPapelUsuario.listarPapelUsuarioPorID(tokenJWT, id);
    }

    async listarTodosPapeisUsuarios(tokenJWT: string) {
        return await this.modeloPapelUsuario.listarTodosPapeisUsuarios(tokenJWT);
    }

    async deletarPapelUsuario(tokenJWT: string, id: number) {
        return await this.modeloPapelUsuario.deletarPapelUsuario(tokenJWT, id);
    }

    async cadastrarPapelUsuario(tokenJWT: string, papelUsuario: string) {
        return await this.modeloPapelUsuario.cadastrarPapelUsuario(tokenJWT, papelUsuario);
    }

    async editarPapelUsuario(tokenJWT: string, papelUsuario: string, id: number) {
        return await this.modeloPapelUsuario.editarPapelUsuario(tokenJWT, papelUsuario, id);
    }
}