import { IPostagem } from "../modelos/IPostagem";
import { chronosAPI } from "../conexoes/chronosAPI";
import { IFormularioPostagem } from "../interfaces/IFormularioPostagem";

export class ServicoPostagem {

    private readonly baseRoute = "/postagem";

    private authHeader(tokenJWT: string) {
        return {
            headers: {
                Authorization: `Bearer ${tokenJWT}`,
            }
        };
    }

    async listarTodas(tokenJWT: string, termo?: string): Promise<IPostagem[] | null> {
        try {
            const resposta = await chronosAPI.get<IPostagem[]>(
                this.baseRoute,
                this.authHeader(tokenJWT)
            );
            console.log(resposta.data);
            return resposta.data;
        } catch {
            return null;
        }
    }

    async buscarPorPalavraChave(tokenJWT: string, palavra: string): Promise<IPostagem[] | null> {
        try {
            const resposta = await chronosAPI.get<IPostagem[]>(
                `${this.baseRoute}/palavraChave`,
                {
                    ...this.authHeader(tokenJWT),
                    params: { palavra }
                }
            );
            return resposta.data;
        } catch {
            return null;
        }
    }

    async listarPorId(tokenJWT: string, id: number): Promise<IPostagem | null> {
        try {
            const resposta = await chronosAPI.get<IPostagem>(
                `${this.baseRoute}/${id}`,
                this.authHeader(tokenJWT)
            );
            return resposta.data;
        } catch {
            return null;
        }
    }

    async cadastrar(tokenJWT: string, dadosFormulario: IFormularioPostagem): Promise<IPostagem | null> {
        try {
            const formData = new FormData();
            formData.append("titulo", dadosFormulario.titulo);
            formData.append("descricao", dadosFormulario.descricao);
            formData.append("visibilidade", dadosFormulario.visibilidade);
            if (dadosFormulario.caminhoImagem && dadosFormulario.caminhoImagem.length > 0) formData.append("caminhoImagem", dadosFormulario.caminhoImagem[0]);

            const resposta = await chronosAPI.post<IPostagem>(
                this.baseRoute,
                formData,
                this.authHeader(tokenJWT)
            );
            return resposta.data;
        } catch {
            return null;
        }
    }

    async editar(tokenJWT: string, dadosFormulario: IFormularioPostagem, id: number): Promise<IPostagem | null> {
        try {
            const formData = new FormData();
            formData.append("titulo", dadosFormulario.titulo);
            formData.append("descricao", dadosFormulario.descricao);
            formData.append("visibilidade", dadosFormulario.visibilidade);
            if (dadosFormulario.caminhoImagem && dadosFormulario.caminhoImagem.length > 0) formData.append("caminhoImagem", dadosFormulario.caminhoImagem[0]);

            const resposta = await chronosAPI.put<IPostagem>(
                `${this.baseRoute}/${id}`,
                formData,
                this.authHeader(tokenJWT)
            );
            return resposta.data;
        } catch {
            return null;
        }
    }

    async deletar(tokenJWT: string, id: number): Promise<boolean> {
        try {
            await chronosAPI.delete(
                `${this.baseRoute}/${id}`,
                this.authHeader(tokenJWT)
            );
            return true;
        } catch {
            return false;
        }
    }
}
