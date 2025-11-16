export interface IPostagem {
    id: number;
    titulo: string;
    descricao: string;
    visibilidade: true;
    dataPublicacao: Date;
    caminhoImagem: string;
    autorId: number;
}