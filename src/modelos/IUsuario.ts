export interface IUsuario {
    id: number;
    nomeCompleto: string;
    telefone: string;
    email: string;
    senha: string;
    dataCadastro: string;
    papelUsuarioID: number;
}

export interface IUsuarioEdicao {
    nomeCompleto: string;
    email: string;
    telefone: string;
    papelUsuarioID: number;
    senha?: string;
}