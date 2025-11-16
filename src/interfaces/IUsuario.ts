export interface IUsuario {
    id: number;
    nomeCompleto: string;
    telefone: string;
    email: string;
    senha: string;
    dataCadastro: Date;
    papelUsuarioID: number;
}