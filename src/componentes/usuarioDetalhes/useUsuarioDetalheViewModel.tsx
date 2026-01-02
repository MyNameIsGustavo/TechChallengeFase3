import { useForm } from "react-hook-form";
import { IUsuario, IUsuarioAlteracao } from "../../modelos/IUsuario";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { useState } from "react";
import { UsuarioService } from "../../servicos/modeloUsuario";
import { useLocation } from "react-router-dom";

export const useUsuarioDetalheViewModel = () => {
    const usuarioServico = new UsuarioService();

    const { tokenJWT, informacoesUsuario, logout } = useAutenticacao();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<IUsuario>({
        defaultValues: {
            nomeCompleto: informacoesUsuario?.nomeCompleto,
            telefone: informacoesUsuario?.telefone,
            caminhoImagem: undefined,
            senha: "",
            papelUsuarioID: informacoesUsuario?.papelUsuarioID,
            email: informacoesUsuario?.email
        },
    });

    const [alerta, setAlerta] = useState({ exibe: false, titulo: "", mensagem: "", onConfirm: () => { }, });

    const abrirConfirmacaoSalvar = (data: any) => {
        setAlerta({
            exibe: true,
            titulo: "Confirmar ação",
            mensagem: "Deseja realmente atualizar as informações?",
            onConfirm: async () => {
                setAlerta((prev) => ({ ...prev, show: false }));
                await editar(data);
            },
        });
    };

    const editar = async (dadosFormulario: IUsuario) => {
        if (!tokenJWT) return;

        const dadosParaEnviar: IUsuarioAlteracao = {
            nomeCompleto: dadosFormulario.nomeCompleto,
            telefone: dadosFormulario.telefone,
            ...(dadosFormulario.senha && dadosFormulario.senha.trim() !== "" && { senha: dadosFormulario.senha }),
            caminhoImagem: dadosFormulario.caminhoImagem
        };
        try {
            if (await usuarioServico.alterar(tokenJWT, dadosParaEnviar)) logout();
        } catch {
            alert("Erro ao editar usuário");
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        setValue,
        informacoesUsuario,
        alerta,
        setAlerta,
        abrirConfirmacaoSalvar
    }
}
