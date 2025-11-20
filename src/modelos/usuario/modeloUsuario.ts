import { ICredenciais } from "../../interfaces/ICredenciais";
import { IUsuario } from "../../interfaces/IUsuario";
import { chronosAPI } from "../../servicos/chronosAPI";

export class ModeloUsuario {
    constructor() { }

    async login(dadosLogin: ICredenciais): Promise<string | null> {
        try {
            const resultadoLogin = await chronosAPI.post<string>("login", dadosLogin);
            return resultadoLogin.data;
        } catch (error) {
            return null;
        }
    }

    async listarUsuarioPorId(tokenJWT: string, id: number) {
        try {
            const usuarioPorID = await chronosAPI.get<IUsuario>(`usuarios/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`
                }
            });

            return usuarioPorID.data;
        } catch (error) {
            return null;
        }
    }

    async buscarInformacoes(tokenJWT: string) {
        try {
            const usuarioPorID = await chronosAPI.get<IUsuario>(`usuarios/buscaInformacoes`, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`
                }
            });

            return usuarioPorID.data;
        } catch (error) {
            return null;
        }
    }

    async listarTodosUsuarios(tokenJWT: string) {
        try {
            const usuariosListados = await chronosAPI.get<IUsuario>(`usuarios`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });

            return usuariosListados.data;
        } catch (error) {
            return null;
        }
    }

    async deletarUsuario(tokenJWT: string, id: number) {
        try {
            const usuarioDeletado = await chronosAPI.delete<IUsuario>(`usuarios/${id}`, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });

            return usuarioDeletado.data;
        } catch (error) {
            return null;
        }
    }

    async cadastrarUsuario(tokenJWT: string, dadosFormulario: string) {
        try {
            const usuarioCadastradoJSON = await chronosAPI.post<IUsuario>(`usuarios`, dadosFormulario, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });

            return usuarioCadastradoJSON.data;
        } catch (error) {
            return null;
        }
    }

    async editarUsuario(tokenJWT: string, dadosFormulario: string, id: number) {
        try {
            const usuarioEditadoJSON = await chronosAPI.put<IUsuario>(`usuarios/${id}`, dadosFormulario, {
                headers: { Authorization: `Bearer ${tokenJWT}` }
            });

            return usuarioEditadoJSON.data;
        } catch (error) {
            return null;
        }
    }
}