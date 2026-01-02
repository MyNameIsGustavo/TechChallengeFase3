import { useNavigate } from "react-router-dom";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { useState } from "react";

export const useControllerMenuSuperior = () => {
    const { informacoesUsuario, tokenJWT, logout } = useAutenticacao();

    const navigate = useNavigate();
    const vaiParaGerenciarUsuarios = () => navigate("/gerenciarUsuarios");
    const vaiParaGerenciarPostagens = () => navigate("/gerenciarPostagens");
    const vaiParaPaginaInicial = () => navigate("/paginaInicial");
    const vaiParaDashboard = () => navigate("/dashboard");

    const menuItens = [
        { label: "Feed", onClick: vaiParaPaginaInicial, permissoes: [1, 2, 3] },
        { label: "Gerenciar usuários", onClick: vaiParaGerenciarUsuarios, permissoes: [1, 3] },
        { label: "Gerenciar postagens", onClick: vaiParaGerenciarPostagens, permissoes: [1, 3] },
        { label: "Dashboard", onClick: vaiParaDashboard, permissoes: [1, 3] },
    ];

    const [modalUsuario, setModalUsuario] = useState(false);

    return {
        informacoesUsuario,
        tokenJWT,
        menuItens,
        modalUsuario,
        setModalUsuario,
        logout,
        vaiParaPaginaInicial
    };
};