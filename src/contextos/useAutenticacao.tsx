import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { UsuarioService } from "../servicos/modeloUsuario";
import { IUsuario } from "../modelos/IUsuario";
import { ICredenciais } from "../interfaces/ICredenciais";
import { useNavigate } from "react-router-dom";

interface AutenticacaoContextType {
    tokenJWT: string | null;
    informacoesUsuario: IUsuario | null;
    realizarLogin: (credenciais: ICredenciais) => Promise<boolean>;
    logout: () => void;
}

const autenticacaoContext = createContext<AutenticacaoContextType | undefined>(undefined);

interface AutenticacaoProviderProps {
    children: ReactNode;
}

export const AutenticacaoProvider: React.FC<AutenticacaoProviderProps> = ({ children }) => {
    const [tokenJWT, setTokenJWT] = useState<string | null>(null);
    const [informacoesUsuario, setInformacoesUsuario] = useState<IUsuario | null>(null);
    const usuarioServico = new UsuarioService();
    const navegacao = useNavigate();

    useEffect(() => {
        const tokenSalvo = localStorage.getItem("tokenJWT");
        if (tokenSalvo && !tokenJWT) {
            setTokenJWT(tokenSalvo);
        }
    }, []);

    useEffect(() => {
        const carregarUsuario = async () => {
            if (!tokenJWT) {
                setInformacoesUsuario(null);
                return;
            }

            try {
                const dadosUsuario = await usuarioServico.buscarInformacoes(tokenJWT);
                setInformacoesUsuario(dadosUsuario);
            } catch (error) {
                console.error("Token inválido ou expirado", error);
                logout();
            }
        };

        carregarUsuario();
    }, [tokenJWT]);

    const realizarLogin = async (credenciais: ICredenciais): Promise<boolean> => {
        try {
            const hashToken = await usuarioServico.login(credenciais);

            if (!hashToken) return false;

            setTokenJWT(hashToken);
            localStorage.setItem("tokenJWT", hashToken);
            return true;
        } catch (error) {
            console.error("Erro ao fazer login", error);
            return false;
        }
    };

    const logout = () => {
        setTokenJWT(null);
        setInformacoesUsuario(null);
        localStorage.removeItem("tokenJWT");
        navegacao("/");
    };

    return (
        <autenticacaoContext.Provider value={{ tokenJWT, informacoesUsuario, realizarLogin, logout }}>
            {children}
        </autenticacaoContext.Provider>
    );
};

export const useAutenticacao = (): AutenticacaoContextType => {
    const context = useContext(autenticacaoContext);

    if (!context) throw new Error("Erro ao criar useAutenticacao");

    return context;
};