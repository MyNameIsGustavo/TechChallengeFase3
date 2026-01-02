import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Login } from "../app/login/loginView";
import { AutenticacaoProvider } from "../contextos/useAutenticacao";
import { PaginaInicial } from "../app/paginaInicial/paginaInicialView";
import { GerenciarUsuarios } from "../app/gerenciarUsuarios/gerenciarUsuariosView";
import { GerenciarPostagens } from "../app/gerenciarPostagens/gerenciarPostagensView";
import { useEffect } from "react";
import { FormularioPostagem } from "../app/gerenciarPostagens/formularioPostagemView";
import { FormularioUsuario } from "../app/gerenciarUsuarios/formularioUsuarioView";
import { Dashboard } from "../app/dashboard/dashboardView";

const rotaConfig = [
    { path: '/', element: <Login />, title: 'Chronos | Login' },
    { path: '/paginaInicial', element: <PaginaInicial />, title: 'Chronos | Página inicial' },
    { path: '/gerenciarUsuarios', element: <GerenciarUsuarios />, title: 'Chronos | Gerenciar usuários' },
    { path: '/gerenciarPostagens', element: <GerenciarPostagens />, title: 'Chronos | Gerenciar postagens' },
    { path: '/formularioPostagem', element: <FormularioPostagem />, title: 'Chronos | Formulário postagem' },
    { path: '/formularioUsuario', element: <FormularioUsuario />, title: 'Chronos | Formulário usuário' },
    { path: '/dashboard', element: <Dashboard />, title: 'Chronos | Dashboard' },

];

const RotasInternas = () => {
    const location = useLocation();

    useEffect(() => {
        const rota = rotaConfig.find(route => route.path === location.pathname);
        document.title = rota?.title || 'Chronos';
    }, [location.pathname]);

    return (
        <Routes>
            {rotaConfig.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                />
            ))}
        </Routes>
    );
};

export const ChronosRotas = () => {
    return (
        <BrowserRouter>
            <AutenticacaoProvider>
                <RotasInternas />
            </AutenticacaoProvider>
        </BrowserRouter>
    );
};
