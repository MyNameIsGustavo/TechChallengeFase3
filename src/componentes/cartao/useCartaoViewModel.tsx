import { useForm } from "react-hook-form";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { ComentariosService } from "../../servicos/modeloComentario";
import { CurtidasService } from "../../servicos/modeloCurtidas";
import { IComentario } from "../../interfaces/IComentario";


export const useCartaoViewModel = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IComentario>();

    const curtidaService = new CurtidasService();
    const comentarioService = new ComentariosService();

    const { tokenJWT, informacoesUsuario } = useAutenticacao();

    const curtir = async (postagemID: number) => {
        if (!tokenJWT) return;
        return await curtidaService.curtir(tokenJWT, postagemID);
    }

    const descurtir = async (postagemID: number) => {
        if (!tokenJWT) return;
        return await curtidaService.descurtir(tokenJWT, postagemID);
    }

    const comentar = async (postagemID: number, conteudo: string) => {
        if (!tokenJWT) return;
        return await comentarioService.cadastrar(tokenJWT, postagemID, conteudo);
    }

    const descomentar = async (postagemID: number, comentarioID: number) => {
        if (!tokenJWT) return;
        return await comentarioService.deletar(tokenJWT, postagemID, comentarioID);
    }

    return {
        curtir,
        descurtir,
        comentar,
        descomentar, 
        
        register,
        handleSubmit,
        errors,
        setValue,
        informacoesUsuario
    }
}