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
        setTermo,
        pesquisar,
        selecionarPost,
        mostrarModal,
        setMostrarModal,
        postagemSelecionada,
        setPostagemSelecionada, informacoesUsuario
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
                    usuario={dados.autor?.nomeCompleto ?? "Professor"}
                    fotoUsuario="https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"
                    imagemPost={dados.caminhoImagem || "https://fabricionetoimoveis.com.br/img/sem_foto.png"}
                    descricao={dados.descricao}
                    likesInicial={dados.estatisticas?.totalCurtidas ?? 0}
                    postagemID={dados.id}
                    comentarios={dados.comentarios}
                    titulo={dados.titulo}
                     curtidas={dados.curtidas}
                    selecionar={() => selecionarPost(dados.id)}
                    abrirModal={() => {
                        setPostagemSelecionada(dados);
                        setMostrarModal(true);
                    }}
                />
            ))}

            {mostrarModal && postagemSelecionada && (
                <ModalGenerico
                    mostrar={mostrarModal}
                    fechar={() => { setMostrarModal(false); setPostagemSelecionada(null); }}
                    titulo="Detalhes da postagem"
                    tamanho="lg"
                >
                    <PostagemDetalhada postagem={postagemSelecionada} />
                </ModalGenerico>
            )}
        </Container>
    );
};
