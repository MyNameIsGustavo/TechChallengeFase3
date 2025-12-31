import { useEffect, useState } from "react"
import { ILayoutTabela } from "../../componentes/tabela/tabela";
import { IPostagem } from "../../modelos/IPostagem";
import { ServicoPostagem } from "../../servicos/modeloPostagem";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { useNavigate } from "react-router-dom";

export const useGerenciarPostagensViewModel = () => {
    const [postagens, setPostagens] = useState<IPostagem[]>([]);
    const [alerta, setAlerta] = useState({ exibe: false, titulo: "", mensagem: "", onConfirm: () => { } });
    
    const { tokenJWT } = useAutenticacao();

    const postagemServico = new ServicoPostagem();
    const navegacao = useNavigate();
    const vaiParaFormularioPostagem = () => { navegacao("/formularioPostagem"); }

    const abrirConfirmacaoExclusao = (id: number) => {
        setAlerta({
            exibe: true,
            titulo: "Confirmar exclusão",
            mensagem: "Tem certeza que deseja remover esta postagem?",
            onConfirm: async () => {
                setAlerta({ ...alerta, exibe: false });
                await deletarPostagem(id);
            },
        });
    };

    const buscarPostagens = async () => {
        if (!tokenJWT) return;
        try {
            const postagens = await postagemServico.listarTodas(tokenJWT);
            if (postagens && Array.isArray(postagens)) {
                const postagensFormatadas = postagens.map(postagens => ({
                    ...postagens,
                    dataPublicacao: postagens.dataPublicacao ? new Intl.DateTimeFormat('pt-BR').format(new Date(postagens.dataPublicacao)) : '',
                    visibilidade: postagens.visibilidade ? 'Verdadeiro' : 'Falso',
                }));
                setPostagens(postagensFormatadas);
            } else {
                setPostagens([]);
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    const deletarPostagem = async (id: number) => {
        if (!tokenJWT) return;
        try {
            if (await postagemServico.deletar(tokenJWT, id)) buscarPostagens();
        } catch (error) {
            console.error("Erro ao remover usuário:", error);
        }
    };

    const selecionarPost = async (id: number) => {
        if (!tokenJWT) return;
        try {
            const postagem = await postagemServico.listarPorId(tokenJWT, id);
            navegacao('/formularioPostagem', {
                state: { ehEdicao: true, editarObjeto: postagem }
            });
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    }

    const colunas: ILayoutTabela<IPostagem>[] = [
        { key: 'id', label: 'ID' },
        { key: 'titulo', label: 'Titulo' },
        { key: 'descricao', label: 'Descricao' },
        { key: 'visibilidade', label: 'Visibilidade' },
        { key: 'dataPublicacao', label: 'Data de cadastro' },
    ];

    useEffect(() => {
        buscarPostagens();
    }, [tokenJWT]);

    return {
        postagens,
        colunas,
        abrirConfirmacaoExclusao,
        alerta,
        setAlerta,
        vaiParaFormularioPostagem,
        selecionarPost
    }
}