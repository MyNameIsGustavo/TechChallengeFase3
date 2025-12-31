import { useEffect, useState } from "react"
import { ILayoutTabela } from "../../componentes/tabela/tabela";
import { IUsuario } from "../../modelos/IUsuario";
import { useAutenticacao } from "../../contextos/useAutenticacao";
import { UsuarioService } from "../../servicos/modeloUsuario";
import { useNavigate } from "react-router-dom";

export const useGerenciarUsuariosViewModel = () => {
    const [alerta, setAlerta] = useState({ exibe: false, titulo: "", mensagem: "", onConfirm: () => { } });
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const { tokenJWT } = useAutenticacao();
    const usuarioServico = new UsuarioService();
    const navegacao = useNavigate();

    const vaiParaFormularioUsuarios = () => { navegacao("/formularioUsuario") }

    const abrirConfirmacaoExclusao = (id: number) => {
        setAlerta({
            exibe: true,
            titulo: "Confirmar exclusão",
            mensagem: "Tem certeza que deseja remover este usuário?",
            onConfirm: async () => {
                setAlerta({ ...alerta, exibe: false });
                await deletarUsuario(id);
            },
        });
    };

    const buscarUsuarios = async () => {
        if (!tokenJWT) return;
        try {
            const informacoesUsuarios = await usuarioServico.listarTodos(tokenJWT);
            console.log(informacoesUsuarios)
            if (informacoesUsuarios && Array.isArray(informacoesUsuarios)) {
                const usuariosFormatados = informacoesUsuarios.map(usuario => ({
                    ...usuario,
                    dataCadastro: usuario.dataCadastro ? new Intl.DateTimeFormat('pt-BR').format(new Date(usuario.dataCadastro)) : ''
                }));
                setUsuarios(usuariosFormatados);
            } else {
                setUsuarios([]);
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
        }
    };

    const deletarUsuario = async (id: number) => {
        if (!tokenJWT) return;
        try {
            if (await usuarioServico.deletar(tokenJWT, id)) buscarUsuarios();
        } catch (error) {
            console.error("Erro ao remover usuário:", error);
        }
    };

    const selecionarUsuario = async (id: number) => {
        if (!tokenJWT) return;
        try {
            const usuario = await usuarioServico.buscarPorId(tokenJWT, id);
            navegacao('/formularioUsuario', {
                state: { ehEdicao: true, editarObjeto: usuario }
            });
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
        }
    }

    const colunas: ILayoutTabela<IUsuario>[] = [
        { key: 'id', label: 'ID' },
        { key: 'nomeCompleto', label: 'Nome' },
        { key: 'telefone', label: 'Telefone' },
        { key: 'email', label: 'E-mail' },
        { key: 'dataCadastro', label: 'Data de cadastro' },
        { key: 'papelUsuarioID', label: 'Papel usuário' },
    ];

    useEffect(() => { if (tokenJWT) buscarUsuarios() }, [tokenJWT]);

    return {
        usuarios,
        colunas,
        alerta,
        setAlerta,
        abrirConfirmacaoExclusao,
        vaiParaFormularioUsuarios,
        selecionarUsuario
    }
}