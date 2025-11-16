import { IPostagem } from "../../interfaces/IPostagem";
import { chronosAPI } from "../../servicos/chronosAPI";

export class ModeloPostagem {
    constructor() { }

    async listarTodasPostagens(tokenJWT: string) {
        try {
            const postagensListadasJSON = await chronosAPI.get<IPostagem>(`postagem`, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`
                }
            });

            return postagensListadasJSON.data;
        } catch (error) {
            return null;
        }
    }

    async listarPostagemPorId(tokenJWT: string, id: number) {
        try {
            const postagensListadasPorIDJSON = await chronosAPI.get<IPostagem>(`postagem/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`
                }
            });

            return postagensListadasPorIDJSON.data;
        } catch (error) {
            return null;
        }
    }

    async cadastrarPostagem(tokenJWT: string, dadosFormulario: string) {
        try {
            const postagemCadastradaJSON = await chronosAPI.post<IPostagem>(`postagem`, dadosFormulario, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`
                }
            });

            return postagemCadastradaJSON.data;
        } catch (error) {
            return null;
        }
    }

    async editarPostagem(tokenJWT: string, dadosFormulario: string, id: number) {
        try {
            const postagemEditadaJSON = await chronosAPI.put<IPostagem>(`postagem/${id}`, dadosFormulario, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`
                }
            });

            return postagemEditadaJSON.data;
        } catch (error) {
            return null;
        }
    }

    async deletarPostagem(tokenJWT: string, id: number) {
        try {
            const postagensDeletadaJSON = await chronosAPI.delete<IPostagem>(`postagem/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`
                }
            });

            return postagensDeletadaJSON.data;
        } catch (error) {
            return null;
        }
    }
}