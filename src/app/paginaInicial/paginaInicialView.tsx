import { Container, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { MenuSuperior } from "../../componentes/menuSuperior/menuSuperior";
import { IoSearchOutline } from "react-icons/io5";
import { Cartao } from "../../componentes/cartao/cartao";
import { usePaginaInicialViewModel } from "./usePaginaInicialViewModel";
import { ModalGenerico } from "../../componentes/modal/modal";
import { PostagemDetalhada } from "../../componentes/postagemDetalhes/postagemDetalhada";

export const PaginaInicial = () => {
    const IconePesquisar = IoSearchOutline as unknown as React.FC<{ size?: number, className?: string; }>;
    const {
        postagens,
        termo,
        mostrarModal,
        postagemSelecionada,
        setTermo,
        pesquisar,
        selecionarPostagemParaEdicao,
        setMostrarModal,
        selecionarPostagemModal
    } = usePaginaInicialViewModel();

    return (
        <Container fluid className="p-0">
            <MenuSuperior />
            <div className="px-3 py-3">
                <Row className="align-items-center g-2">
                    <Col xs={12} md="auto" className="text-center text-md-start"><h4 className="m-0">Central de comunicação</h4></Col>
                    <Col xs={12} md className="d-flex justify-content-center justify-content-md-end">
                        <Form className="w-50" onSubmit={(e) => { e.preventDefault(); pesquisar(); }}>
                            <Form.Group controlId="buscarPublicacao" className="mb-0">
                                <InputGroup>
                                    <Form.Control
                                        type="search"
                                        placeholder="Resultados das provas de final de ano"
                                        value={termo}
                                        onChange={(e) => setTermo(e.target.value)}
                                    />
                                    <Button variant="outline-secondary" onClick={pesquisar}>
                                        <IconePesquisar size={20} />
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>

            {postagens.map((dados) => (
                <Cartao
                    key={dados.id}
                    fotoUsuario={
                        typeof dados.autor.caminhoImagem === "string"
                            ? dados.autor.caminhoImagem
                            : "https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"
                    }
                    usuario={dados.autor?.nomeCompleto ?? "Professor"}
                    imagemPost={dados.caminhoImagem || "https://fabricionetoimoveis.com.br/img/sem_foto.png"}
                    descricao={dados.descricao.toLocaleLowerCase()}
                    numCurtidas={dados.estatisticas?.totalCurtidas ?? 0}
                    numComentarios={dados.estatisticas?.totalComentarios ?? 0}
                    postagemID={dados.id}
                    comentarios={dados.comentarios}
                    iniciaCurtido={dados.estatisticas.usuarioCurtiu}
                    titulo={dados.titulo}
                    autorID={dados.autor.id}
                    selecionar={() => selecionarPostagemParaEdicao(dados.id)}
                    abrirModal={() => {
                        selecionarPostagemModal(dados.id);
                        setMostrarModal(true);
                    }}
                />
            ))}

            {mostrarModal && postagemSelecionada && (
                <ModalGenerico mostrar={mostrarModal} fechar={() => { setMostrarModal(false); }} titulo="Detalhes da postagem" tamanho="lg">
                    <PostagemDetalhada postagem={postagemSelecionada} />
                </ModalGenerico>
            )}
        </Container>
    );
};
