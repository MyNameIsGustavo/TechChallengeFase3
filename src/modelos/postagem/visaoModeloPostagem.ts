import { ModeloPostagem } from "./modeloPostagem";

export class VisaoModeloPostagem {
    private modeloPostagem: ModeloPostagem;

    constructor() { this.modeloPostagem = new ModeloPostagem() }

    async listarPostagemPorId(tokenJWT: string, id: number) {
        return await this.modeloPostagem.listarPostagemPorId(tokenJWT, id);
    }

    async listarTodasPostagens(tokenJWT: string) {
        return await this.modeloPostagem.listarTodasPostagens(tokenJWT);
    }

    async deletarPostagem(tokenJWT: string, id: number) {
        return await this.modeloPostagem.deletarPostagem(tokenJWT, id);
    }

    async cadastrarPostagem(tokenJWT: string, papelUsuario: string) {
        return await this.modeloPostagem.cadastrarPostagem(tokenJWT, papelUsuario);
    }

    async editarPostagem(tokenJWT: string, papelUsuario: string, id: number) {
        return await this.modeloPostagem.editarPostagem(tokenJWT, papelUsuario, id);
    }
}