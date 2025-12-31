import { Container } from "react-bootstrap"
import { MenuSuperior } from "../../componentes/menuSuperior/menuSuperior"
import { TfiTag } from "react-icons/tfi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useGerenciarUsuariosViewModel } from "./useGerenciarUsuariosViewModel";
import { Alerta } from "../../componentes/alerta/alerta";
import { Tabela } from "../../componentes/tabela/tabela";

export const GerenciarUsuarios = () => {
    const { colunas, usuarios, abrirConfirmacaoExclusao, alerta, setAlerta, vaiParaFormularioUsuarios, selecionarUsuario } = useGerenciarUsuariosViewModel();

    const IconeAdicionar = IoAddCircleOutline as unknown as React.FC<{ size?: number, className?: string; }>;
    const IconeTag = TfiTag as unknown as React.FC<{ size?: number, className?: string; }>;

    return (
        <Container fluid>
            <MenuSuperior />
            <div className="d-flex flex-column flex-md-row justify-content-between px-4">
                <h4 className="text-center text-md-start mb-3 mb-md-0">Gerenciar usuários</h4>
                <div className="d-flex flex-column flex-md-row">
                    <div className="d-flex text-center px-2 mb-2 mb-md-0" onClick={vaiParaFormularioUsuarios} style={{ cursor: "pointer", alignItems: 'center', justifyContent: 'center' }}>
                        <IconeAdicionar size={22} />
                        <span className="ms-1">Cadastrar usuário</span>
                    </div>
                </div>
            </div>
            <Tabela colunas={colunas} dados={usuarios} aoDeletar={abrirConfirmacaoExclusao} aoEditar={selecionarUsuario} />
            <Alerta
                exibe={alerta.exibe}
                onClose={() => setAlerta({ ...alerta, exibe: false })}
                titulo={alerta.titulo}
                mensagem={alerta.mensagem}
                botoes={[
                    { label: "Confirmar", onClick: alerta.onConfirm, variant: "success" },
                    { label: "Cancelar", onClick: () => setAlerta({ ...alerta, exibe: false }), variant: "danger" },
                ]}
            />
        </Container>
    )
}