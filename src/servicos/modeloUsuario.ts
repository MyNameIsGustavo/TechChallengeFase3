import { ICredenciais } from "../interfaces/ICredenciais";
import { IUsuario, IUsuarioAlteracao, IUsuarioEdicao } from "../modelos/IUsuario";
import { chronosAPI } from "../conexoes/chronosAPI";

export class UsuarioService {

    private readonly baseRoute = "/usuarios";

    private authHeader(tokenJWT: string) {
        return {
            headers: {
                Authorization: `Bearer ${tokenJWT}`,
            }
        };
    }

    async login(dadosLogin: ICredenciais): Promise<string | null> {
        try {
            const { data } = await chronosAPI.post<string>(
                "/login",
                dadosLogin
            );
            return data;
        } catch {
            return null;
        }
    }

    async buscarPorId(tokenJWT: string, id: number) {
        try {
            const { data } = await chronosAPI.get<IUsuario>(
                `${this.baseRoute}/${id}`,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }

    async buscarInformacoes(tokenJWT: string) {
        try {
            const { data } = await chronosAPI.get<IUsuario>(
                `${this.baseRoute}/buscaInformacoes`,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }

    async listarTodos(tokenJWT: string) {
        try {
            const { data } = await chronosAPI.get<IUsuario[]>(
                `${this.baseRoute}`,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }

    async deletar(tokenJWT: string, id: number) {
        try {
            await chronosAPI.delete(
                `${this.baseRoute}/${id}`,
                this.authHeader(tokenJWT)
            );
            return true;
        } catch {
            return null;
        }
    }

    async cadastrar(tokenJWT: string, usuario: IUsuario) {
        try {
            const formData = new FormData();
            formData.append("nomeCompleto", usuario.nomeCompleto);
            formData.append("email", usuario.email);
            formData.append("telefone", usuario.telefone);
            formData.append("senha", usuario.senha);
            formData.append("papelUsuarioID", usuario.papelUsuarioID.toString());

            if (usuario.caminhoImagem && usuario.caminhoImagem.length > 0) formData.append("caminhoImagem", usuario.caminhoImagem[0]);

            const { data } = await chronosAPI.post<IUsuario>(
                `${this.baseRoute}`,
                formData,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }

    async editar(tokenJWT: string, usuario: IUsuarioEdicao, id: number) {
        try {
            const formData = new FormData();
            formData.append("nomeCompleto", usuario.nomeCompleto);
            formData.append("email", usuario.email);
            formData.append("telefone", usuario.telefone);
            if (usuario.senha && usuario.senha.length > 0) formData.append("senha", usuario.senha);
            formData.append("papelUsuarioID", usuario.papelUsuarioID.toString());
            if (usuario.caminhoImagem && usuario.caminhoImagem.length > 0) formData.append("caminhoImagem", usuario.caminhoImagem[0]);

            const { data } = await chronosAPI.put<IUsuario>(
                `${this.baseRoute}/${id}`,
                formData,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            return null;
        }
    }

    async alterar(tokenJWT: string, usuario: IUsuarioAlteracao) {
        try {
            const formData = new FormData();
            formData.append("nomeCompleto", usuario.nomeCompleto);
            formData.append("telefone", usuario.telefone);
            if (usuario.senha && usuario.senha.length > 0) formData.append("senha", usuario.senha);
            if (usuario.caminhoImagem && usuario.caminhoImagem.length > 0) formData.append("caminhoImagem", usuario.caminhoImagem[0]);

            const { data } = await chronosAPI.put<IUsuario>(`${this.baseRoute}`, formData, this.authHeader(tokenJWT));
            return data;
        } catch (error) {
            console.error("Erro ao editar usuário:", error);
            return null;
        }
    }
}
