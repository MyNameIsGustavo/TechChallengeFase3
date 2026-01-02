import { useAutenticacao } from "../../contextos/useAutenticacao";
import { IComentariosPorPostagem, ICurtidasPorPostagem, IPostagemPorMes, IUsuarioPorPapel, IUsuarioPorPostagem } from "../../modelos/IDashboard";
import { DashboardService } from "../../servicos/modeloDashboard";
import { useEffect, useState } from "react";

export const useDashboardViewModel = () => {
    const { tokenJWT } = useAutenticacao();
    const dashboardServico = new DashboardService();

    const [usuariosPorPapel, setUsuariosPorPapel] = useState<IUsuarioPorPapel[]>([]);
    const [usuariosPorPostagem, setUsuariosPorPostagem] = useState<IUsuarioPorPostagem[]>([]);
    const [curtidasPorPostagem, setCurtidasPorPostagem] = useState<ICurtidasPorPostagem[]>([]);
    const [comentariosPorPostagem, setComentariosPorPostagem] = useState<IComentariosPorPostagem[]>([]);
    const [postagemPorMes, setPostagemPorMes] = useState<IPostagemPorMes[]>([]);

    const buscaInformacoes = async () => {
        if (!tokenJWT) return;

        const [
            postagemPorMes,
            usuariosPorPapel,
            usuariosPorPostagem,
            curtidasPorPostagem,
            comentariosPorPostagem
        ] = await Promise.all([
            dashboardServico.listarPostagemPorMes(tokenJWT),
            dashboardServico.listarUsuarioPorPapel(tokenJWT),
            dashboardServico.listarUsuarioPorPostagem(tokenJWT),
            dashboardServico.listarCurtidasPorPostagem(tokenJWT),
            dashboardServico.listarComentarioPorPostagem(tokenJWT),
        ]);

        setUsuariosPorPapel(usuariosPorPapel ?? []);
        setUsuariosPorPostagem(usuariosPorPostagem ?? []);
        setCurtidasPorPostagem(curtidasPorPostagem ?? []);
        setComentariosPorPostagem(comentariosPorPostagem ?? []);
        setPostagemPorMes(postagemPorMes ?? []);
    };

    useEffect(() => {
        buscaInformacoes();
    }, [tokenJWT]);

    return {
        usuariosPorPapel,
        usuariosPorPostagem,
        curtidasPorPostagem,
        comentariosPorPostagem,
        postagemPorMes
    };
};

