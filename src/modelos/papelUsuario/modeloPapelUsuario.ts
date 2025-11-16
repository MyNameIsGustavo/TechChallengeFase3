import { IPapelUsuario } from "../../interfaces/IPapelUsuario";
import { chronosAPI } from "../../servicos/chronosAPI";

export class ModeloPapelUsuario {
    constructor() { }

    async listarTodosPapeisUsuarios(tokenJWT: string) {
        try {
            const papelUsuariosListados = await chronosAPI.get<IPapelUsuario>(`papelUsuario`, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`
                }
            });

            return papelUsuariosListados.data;
        } catch (error) {
            return null;
        }
    }

    async listarPapelUsuarioPorID(tokenJWT: string, id: number) {
        try {
            const papelUsuarioPorID = await chronosAPI.get<IPapelUsuario>(`papelUsuario/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`
                }
            });

            return papelUsuarioPorID.data;
        } catch (error) {
            return null;
        }
    }

    async deletarPapelUsuario(tokenJWT: string, id: number) {
        try {
            const papelUsuarioDelete = await chronosAPI.delete<IPapelUsuario>(`papelUsuario/${id}`, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`
                }
            });

            return papelUsuarioDelete.data;
        } catch (error) {
            return null;
        }
    }

    async cadastrarPapelUsuario(tokenJWT: string, papelUsuario: string) {
        try {
            const papelUsuarioCadastrado = await chronosAPI.post<IPapelUsuario>(`papelUsuario`, papelUsuario, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`
                }
            });

            return papelUsuarioCadastrado.data;
        } catch (error) {
            return null;
        }
    }

    async editarPapelUsuario(tokenJWT: string, papelUsuario: string, id: number) {
        try {
            const papelUsuarioEditado = await chronosAPI.post<IPapelUsuario>(`papelUsuario/${id}`, papelUsuario, {
                headers: {
                    Authorization: `Bearer ${tokenJWT}`
                }
            });

            return papelUsuarioEditado.data;
        } catch (error) {
            return null;
        }
    }
}