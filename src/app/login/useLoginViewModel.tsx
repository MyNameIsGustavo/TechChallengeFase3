import { useNavigate } from "react-router-dom";
import { ICredenciais } from "../../interfaces/ICredenciais";
import { useForm } from 'react-hook-form';
import { useAutenticacao } from "../../contextos/useAutenticacao";

export const useControllerLogin = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<ICredenciais>();
    const { realizarLogin } = useAutenticacao();

    const navegacao = useNavigate();
    const vaiParaPaginaInicial = () => { navegacao("/paginaInicial") }
    const vaiParaLogin = () => { navegacao("/") }

    const login = async (credenciais: ICredenciais) => {
        const loginRealizado = await realizarLogin(credenciais);
        if (loginRealizado) return vaiParaPaginaInicial();

        alert("Credenciais inválidas.")
        vaiParaLogin();
    }

    return {
        control,
        handleSubmit,
        errors,
        login
    }
}