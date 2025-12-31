import { IPapelUsuario } from "../modelos/IPapelUsuario";
import { chronosAPI } from "../conexoes/chronosAPI";

export class PapelUsuarioService {

    private readonly baseRoute = "/papelUsuario";

    private authHeader(tokenJWT: string) {
        return {
            headers: {
                Authorization: `Bearer ${tokenJWT}`,
            }
        };
    }

    async listarTodos(tokenJWT: string) {
        try {
            const { data } = await chronosAPI.get<IPapelUsuario[]>(
                `${this.baseRoute}`,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }

    async buscarPorId(tokenJWT: string, id: number) {
        try {
            const { data } = await chronosAPI.get<IPapelUsuario>(
                `${this.baseRoute}/${id}`,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }

    async deletar(tokenJWT: string, id: number) {
        try {
            await chronosAPI.delete(`${this.baseRoute}/${id}`, this.authHeader(tokenJWT));
            return true;
        } catch {
            return null;
        }
    }

    async cadastrar(tokenJWT: string, payload: IPapelUsuario) {
        try {
            const { data } = await chronosAPI.post(
                `${this.baseRoute}`,
                payload,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }

    async editar(tokenJWT: string, payload: IPapelUsuario, id: number) {
        try {
            const { data } = await chronosAPI.put(
                `${this.baseRoute}/${id}`,
                payload,
                this.authHeader(tokenJWT)
            );
            return data;
        } catch {
            return null;
        }
    }
}