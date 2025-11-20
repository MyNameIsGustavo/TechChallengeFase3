import React, { createContext, useContext, ReactNode, useState } from "react";
import { VisaoModeloUsuario } from "../modelos/usuario/visaoModeloUsuario";
import { IUsuario } from "../interfaces/IUsuario";
import { ICredenciais } from "../interfaces/ICredenciais";

interface AutenticacaoContextType {
    tokenJWT: string | null;
    informacoesUsuario: IUsuario | null;
    realizarLogin: (credenciais: ICredenciais) => Promise<boolean>;
}

const autenticacaoContext = createContext<AutenticacaoContextType | undefined>(undefined);

interface AutenticacaoProviderProps {
    children: ReactNode;
}

export const AutenticacaoProvider: React.FC<AutenticacaoProviderProps> = ({ children }) => {
    const [tokenJWT, setTokenJWT] = useState<string | null>(null);
    const [informacoesUsuario, setInformacoesUsuario] = useState<IUsuario | null>(null);
    const visaoModeloDeUsuario = new VisaoModeloUsuario();

    const realizarLogin = async (credenciais: ICredenciais): Promise<boolean> => {
        try {
            const hashToken = await visaoModeloDeUsuario.login(credenciais);

            if (hashToken) {
                setTokenJWT(hashToken);
                const informacoes = await visaoModeloDeUsuario.buscarInformacoes(hashToken);

                setInformacoesUsuario(informacoes);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error("Erro ao fazer login", error);
            return false;
        }
    }

    return (
        <autenticacaoContext.Provider value={{ tokenJWT, informacoesUsuario, realizarLogin }}>
            {children}
        </autenticacaoContext.Provider>
    );
};

export const useAutenticacao = (): AutenticacaoContextType => {
    const context = useContext(autenticacaoContext);

    if (!context) throw new Error("Erro ao criar useAutenticacao");
    
    return context;
};