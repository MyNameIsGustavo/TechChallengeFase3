import { Image, Row, Col, Badge } from "react-bootstrap";
import { IPostagem } from "../../modelos/IPostagem";
import { Fragment } from "react/jsx-runtime";

interface DetalhePostagemProps { postagem: IPostagem; }

export const PostagemDetalhada = ({ postagem }: DetalhePostagemProps) => {
    return (
        <Fragment>
            <h4 className="mb-2">{postagem.titulo}</h4>
            <div className="d-flex align-items-center gap-2 mb-3">
                <Image src="https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg"
                    roundedCircle width={45} height={45}
                />
                <div>
                    <strong>{postagem.autor?.nomeCompleto ?? "Professor"}</strong>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>{new Date(postagem.dataPublicacao).toLocaleString()}</div>
                </div>
            </div>
            {postagem.caminhoImagem && (<Image src={postagem.caminhoImagem} fluid className="mb-3 rounded" />)}
            <p style={{ fontSize: "1rem", lineHeight: 1.6 }}><strong>{postagem.autor?.nomeCompleto ?? "Professor"}</strong>: {postagem.descricao}</p>
            <div className="d-flex gap-3 mt-3">
                <Badge bg="secondary">{postagem.estatisticas?.totalCurtidas ?? 0} Curtidas</Badge>
                <Badge bg="secondary">{postagem.estatisticas?.totalComentarios ?? 0} Comentários</Badge>
            </div>

            <div>
                <h5 className="text-center mt-2">Comentários</h5>
                {postagem.comentarios && postagem.comentarios.length > 0 ? (
                    postagem.comentarios.map((comentario) => (
                        <Row key={comentario.id} className="mb-2">
                            <Col>
                                <strong>{comentario.usuario?.nomeCompleto ?? "Usuário desconhecido"}</strong>: {comentario.conteudo}
                            </Col>
                        </Row>
                    ))
                ) : (
                    <p className="text-muted">Nenhum comentário disponível.</p>
                )}
            </div>
        </Fragment>
    );
};
