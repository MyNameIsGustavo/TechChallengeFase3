import { useNavigate } from "react-router-dom";
import { ICredenciais } from "../../interfaces/ICredenciais";
import { useForm } from 'react-hook-form';
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { useState } from "react";

export const useControllerLogin = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<ICredenciais>();
    const { realizarLogin } = useAutenticacao();

    const navegacao = useNavigate();
    const vaiParaPaginaInicial = () => { navegacao("/paginaInicial") }
    const vaiParaLogin = () => { navegacao("/") }

    const [alerta, setAlerta] = useState({ exibe: false, titulo: "", mensagem: "", onConfirm: () => { }, });

    const login = async (credenciais: ICredenciais) => {
        const loginRealizado = await realizarLogin(credenciais);

        if (loginRealizado) { vaiParaPaginaInicial(); return; }

        setAlerta({
            exibe: true,
            titulo: "Credenciais inválidas.",
            mensagem: "Verifique suas credencias e tente novamente.",
            onConfirm: () => setAlerta(prev => ({ ...prev, exibe: false })),
        });
    };

    return {
        handleSubmit,
        login,
        setAlerta,
        control,
        errors,
        alerta,
    }
}