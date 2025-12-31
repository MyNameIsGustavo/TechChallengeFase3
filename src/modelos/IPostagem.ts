import { IComentario } from "./IComentario";
import { ICurtida } from "./ICurtida";
import { IEstatisticasPostagem } from "./IEstatisticaPostagem";
import { IUsuario } from "./IUsuario";

export interface IPostagem {
    id: number;
    titulo: string;
    descricao: string;
    visibilidade: boolean | string;
    dataPublicacao: string;
    caminhoImagem: string;
    autor: IUsuario;
    curtidas: ICurtida[];
    comentarios: IComentario[];
    estatisticas: IEstatisticasPostagem;
}