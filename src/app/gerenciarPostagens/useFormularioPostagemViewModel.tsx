import { useForm } from "react-hook-form";
import { IFormularioPostagem } from "../../interfaces/IFormularioPostagem";
import { ServicoPostagem } from "../../servicos/modeloPostagem";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const useFormularioPostagensViewModel = () => {
    const [alerta, setAlerta] = useState({ exibe: false, titulo: "", mensagem: "", onConfirm: () => { }, });
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFormularioPostagem>();
    const { tokenJWT } = useAutenticacao();
    const postagemServico = new ServicoPostagem();
    const estadoFormulario = useLocation();
    const { ehEdicao, editarObjeto } = estadoFormulario.state || {};

    const navegacao = useNavigate();
    const vaiParaPostagens = () => { navegacao("/gerenciarPostagens") }

    const abrirConfirmacaoSalvar = (data: any) => {
        setAlerta({
            exibe: true,
            titulo: "Confirmar ação",
            mensagem: ehEdicao
                ? "Deseja realmente atualizar esta postagem?"
                : "Deseja realmente cadastrar esta postagem?",
            onConfirm: async () => {
                setAlerta((prev) => ({ ...prev, show: false }));
                if (ehEdicao) {
                    await editarPostagem(data);
                } else {
                    await cadastrarPostagem(data);
                }
            },
        });
    };

    const cadastrarPostagem = async (dadosFormulario: IFormularioPostagem) => {
        if (!tokenJWT) return;
        try {
            const postagemCadastrada = await postagemServico.cadastrar(tokenJWT, dadosFormulario);
            if (postagemCadastrada) return vaiParaPostagens();
        } catch (error) {
            alert("Erroo")
        }
    }

    const editarPostagem = async (dadosFormulario: IFormularioPostagem) => {
        if (!tokenJWT) return;
        try {
            if (await postagemServico.editar(tokenJWT, dadosFormulario, editarObjeto.id))
                vaiParaPostagens();
        } catch (error) {
            alert("Erro ao editar usuario");
        }
    }

    useEffect(() => {
        if (ehEdicao && editarObjeto) {
            setValue("titulo", editarObjeto.titulo);
            setValue("descricao", editarObjeto.descricao);
            setValue(
                "visibilidade",
                editarObjeto.visibilidade ? "true" : "false"
            );
        }
    }, [ehEdicao, editarObjeto, setValue]);


    return {
        register,
        handleSubmit,
        errors,
        abrirConfirmacaoSalvar,
        alerta,
        setAlerta,
        ehEdicao,
        editarObjeto
    }
}