import { useForm } from "react-hook-form";
import { IUsuario, IUsuarioEdicao } from "../../modelos/IUsuario";
import { UsuarioService } from "../../servicos/modeloUsuario";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const useFormularioUsuarioViewModel = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<IUsuario>({ defaultValues: { papelUsuarioID: 1 } });
    const { tokenJWT } = useAutenticacao();
    const [alerta, setAlerta] = useState({ exibe: false, titulo: "", mensagem: "", onConfirm: () => { }, });

    const usuarioServico = new UsuarioService();
    const navegacao = useNavigate();
    const estadoFormulario = useLocation();
    const { ehEdicao, editarObjeto } = estadoFormulario.state || {};
    const vaiParaGerenciarUsuarios = () => { navegacao("/gerenciarUsuarios") }

    const abrirConfirmacaoSalvar = (data: any) => {
        setAlerta({
            exibe: true,
            titulo: "Confirmar ação",
            mensagem: ehEdicao
                ? "Deseja realmente atualizar esta usuário?"
                : "Deseja realmente cadastrar esta usuário?",
            onConfirm: async () => {
                setAlerta((prev) => ({ ...prev, show: false }));
                if (ehEdicao) {
                    await editar(data);
                } else {
                    await cadastrar(data);
                }
            },
        });
    };

    const cadastrar = async (dadosFormulario: IUsuario) => {
        if (!tokenJWT) return;
        try {
            const usuarioCadastrado = await usuarioServico.cadastrar(tokenJWT, dadosFormulario);
            if (usuarioCadastrado) return vaiParaGerenciarUsuarios();
        } catch (error) {
            alert("Erroo")
        }
    }

    const editar = async (dadosFormulario: IUsuarioEdicao) => {
        if (!tokenJWT) return;

        const dadosParaEnviar = { ...dadosFormulario };
        if (!dadosParaEnviar.senha || dadosParaEnviar.senha.trim() === "") {delete dadosParaEnviar.senha;}
        try {
            if (await usuarioServico.editar(tokenJWT, dadosParaEnviar, editarObjeto.id))vaiParaGerenciarUsuarios();
        } catch {
            alert("Erro ao editar usuário");
        }
    };

    useEffect(() => {
        if (ehEdicao && editarObjeto) {
            setValue("nomeCompleto", editarObjeto.nomeCompleto);
            setValue("telefone", editarObjeto.telefone);
            setValue("email", editarObjeto.email);
            setValue("papelUsuarioID", editarObjeto.papelUsuarioID);
        }
    }, [ehEdicao, editarObjeto, setValue]);

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        abrirConfirmacaoSalvar,
        alerta,
        setAlerta,
        ehEdicao,
        editarObjeto
    }
}