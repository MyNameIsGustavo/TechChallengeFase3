import { useForm } from "react-hook-form";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { ComentariosService } from "../../servicos/modeloComentario";
import { CurtidasService } from "../../servicos/modeloCurtidas";
import { IComentario } from "../../interfaces/IComentario";
import { useState } from "react";

interface UseCartaoParams { curtidas: number; comentarios: IComentario[]; postagemID: number; }

export const useCartaoViewModel = ({ curtidas, comentarios, postagemID }: UseCartaoParams) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IComentario>();
    const { tokenJWT, informacoesUsuario } = useAutenticacao();

    const [isCurtido, setIsCurtido] = useState(false);
    const [likes, setLikes] = useState(curtidas);
    const [listaComentarios, setListaComentarios] = useState<IComentario[]>(comentarios);

    const curtidaService = new CurtidasService();
    const comentarioService = new ComentariosService();

    const curtirPostagem = async () => {
        if (!tokenJWT || isCurtido) return;

        await curtidaService.curtir(tokenJWT, postagemID);
        setIsCurtido(true);
        setLikes(prev => prev + 1);
    };

    const descurtirPostagem = async () => {
        if (!tokenJWT || !isCurtido) return;

        await curtidaService.descurtir(tokenJWT, postagemID);
        setIsCurtido(false);
        setLikes(prev => Math.max(prev - 1, 0));
    };

    const comentarPostagem = async (conteudo: string) => {
        if (!tokenJWT) return;

        const novoComentario = await comentarioService.cadastrar(
            tokenJWT,
            postagemID,
            conteudo
        );

        if (novoComentario) {
            setListaComentarios(prev => [novoComentario, ...prev]);
            setValue("conteudo", "");
        }
    };

    

    return {
        curtirPostagem,
        descurtirPostagem,
        comentarPostagem,
        isCurtido,
        setIsCurtido,
        register,
        handleSubmit,
        errors,
        setValue,
        informacoesUsuario,
        likes,
        listaComentarios,
    }
}