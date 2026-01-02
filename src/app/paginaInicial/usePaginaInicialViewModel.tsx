import { useEffect, useState } from "react"
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { ServicoPostagem } from "../../servicos/modeloPostagem";
import { IPostagem } from "../../modelos/IPostagem";
import { useNavigate } from "react-router-dom";

export const usePaginaInicialViewModel = () => {
    const [postagens, setPostagens] = useState<IPostagem[]>([]);
    const [termo, setTermo] = useState<string>();
    const [mostrarModal, setMostrarModal] = useState(false);
    const [postagemSelecionada, setPostagemSelecionada] = useState<IPostagem | null>(null);
    const { tokenJWT, informacoesUsuario } = useAutenticacao();
    const postagemServico = new ServicoPostagem();
    const navegacao = useNavigate();

    const pesquisar = async () => {
        if (!tokenJWT) return;

        if (!termo || termo.trim() === "") return buscarPostagens();

        const resultado = await postagemServico.buscarPorPalavraChave(tokenJWT, termo);
        setPostagens(resultado ?? []);
    };

    const buscarPostagens = async () => {
        if (!tokenJWT) return;
        try {
            const postagens = await postagemServico.listarTodas(tokenJWT);
            if (postagens && Array.isArray(postagens)) {
                setPostagens(postagens);
            } else {
                setPostagens([]);
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    const selecionarPostagemParaEdicao = async (id: number) => {
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

     const selecionarPostagemModal = async (id: number) => {
        if (!tokenJWT) return;
        try {
            const postagem = await postagemServico.listarPorId(tokenJWT, id);
           setPostagemSelecionada(postagem)
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    }

    useEffect(() => { if (tokenJWT) buscarPostagens() }, [tokenJWT, mostrarModal])

    return {
        postagens,
        termo,
        setTermo,
        pesquisar,
        selecionarPostagemParaEdicao,
        mostrarModal,
        setMostrarModal,
        postagemSelecionada,
        setPostagemSelecionada,
        informacoesUsuario,
        selecionarPostagemModal
    }
}