import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../contextos/useAutenticacao";

export const useControllerMenuSuperior = () => {
    const { informacoesUsuario, tokenJWT, logout } = useAutenticacao();

    const navigate = useNavigate();
    const vaiParaGerenciarUsuarios = () => navigate("/gerenciarUsuarios");
    const vaiParaGerenciarPostagens = () => navigate("/gerenciarPostagens");
    const vaiParaPaginaInicial = () => navigate("/paginaInicial")

    const menuItens = [
        { label: "Feed", onClick: vaiParaPaginaInicial, permissoes: [1, 2, 3] },
        { label: "Gerenciar usuários", onClick: vaiParaGerenciarUsuarios, permissoes: [1, 3] },
        { label: "Gerenciar postagens", onClick: vaiParaGerenciarPostagens, permissoes: [1, 3] },
    ];

    return {
        informacoesUsuario,
        tokenJWT,
        menuItens,
        logout,
        vaiParaPaginaInicial
    };
};