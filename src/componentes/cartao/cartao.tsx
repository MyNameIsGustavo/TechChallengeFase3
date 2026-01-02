import { Card, Button, Form, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
    BsHeart,
    BsHeartFill,
    BsChat,
    BsThreeDots,
    BsSend,
    BsTrash,
    BsPencil,
} from "react-icons/bs";
import { useCartaoViewModel } from "./useCartaoViewModel";
import { IComentario } from "../../modelos/IComentario";
import { PapeisUsuario } from "../../enums/EPapeisUsuarios";

interface CartaoPostagemProps {
    usuario: string;
    fotoUsuario: string;
    imagemPost: string;
    descricao: string;
    numCurtidas?: number;
    numComentarios?: number;
    titulo: string;
    postagemID: number;
    comentarios: IComentario[];
    iniciaCurtido: boolean;
    autorID: number;
    selecionar: () => void;
    abrirModal: () => void;
}

export const Cartao = ({ usuario, fotoUsuario, imagemPost, descricao, numCurtidas = 0, numComentarios = 0, titulo, postagemID, comentarios, iniciaCurtido,  autorID, selecionar, abrirModal, }: CartaoPostagemProps) => {
    const IconeCoracao = BsHeart as unknown as React.FC<{ size?: number }>;
    const IconeCoracaoFill = BsHeartFill as unknown as React.FC<{ size?: number }>;
    const IconeComentario = BsChat as unknown as React.FC<{ size?: number }>;
    const IconeBotoes = BsThreeDots as unknown as React.FC<{ size?: number }>;
    const IconeEnviar = BsSend as unknown as React.FC<{ size?: number }>;
    const IconeLixeira = BsTrash as unknown as React.FC<{ size?: number }>;
    const IconeEditar = BsPencil as unknown as React.FC<{ size?: number }>;

    const {
        likes,
        listaComentarios,
        isCurtido,
        informacoesUsuario,
        curtirPostagem,
        descurtirPostagem,
        comentarPostagem,
        register,
        handleSubmit,
        setValue,
        setIsCurtido,
        descomentarPostagem
    } = useCartaoViewModel({ numCurtidas, numComentarios,  comentarios, postagemID, iniciaCurtido });

    return (
        <Card
            className="shadow-sm mb-4 mx-auto w-100"
            style={{ borderRadius: 8, maxWidth: "400px", cursor: "pointer", transition: "transform 0.2s ease, box-shadow 0.2s ease", }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.1)";
            }}
        >
            <Card.Header className="d-flex align-items-center bg-white border-0" onClick={abrirModal}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", overflow: "hidden", display: "inline-block" }}>
                    <img src={fotoUsuario} alt="Perfil" width={60} height={60} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div className="d-flex flex-column flex-grow-1 ms-2"><strong>{usuario}</strong><small className="text-muted">{titulo}</small></div>
                <IconeBotoes />
            </Card.Header>

            <Card.Img src={imagemPost} alt="Post" style={{ maxHeight: "300px", objectFit: "cover" }} />

            <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div>
                        <Button
                            variant="link"
                            className={`p-0 me-2 border-0 ${isCurtido ? "text-danger" : "text-dark"}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                isCurtido ? descurtirPostagem() : curtirPostagem();
                                setIsCurtido(!isCurtido);
                            }}
                        >
                            {isCurtido
                                ? <IconeCoracaoFill size={23} />
                                : <IconeCoracao size={23} />
                            }
                        </Button>

                        <Button variant="link" className="p-0 me-2 border-0 text-dark" aria-label="Comentar"><IconeComentario size={25} /></Button>
                    </div>

                    {informacoesUsuario?.papelUsuarioID !== PapeisUsuario.ESTUDANTE && informacoesUsuario?.id === autorID && (<Button variant="link" className="p-0 text-dark" aria-label="Editar" onClick={selecionar}><IconeEditar size={24} /> </Button>)}
                </div>

                <strong className="d-block mb-1">{likes} Curtidas</strong>

                <p className="mb-2" style={{ fontSize: "0.95rem" }}>
                    <strong>{usuario}</strong>:{" "}
                    {descricao.length > 80 ? (descricao.length > 80 ? "..." : "") : descricao}
                </p>

                {<p className="mb-2" style={{ fontSize: "0.95rem" }}>
                    {listaComentarios.length > 0 ? (
                        listaComentarios.slice(0, 2).map((comentario) => (
                            <span key={comentario.id}>
                                <Col xl={12}>
                                    <div className="d-flex align-items-center justify-content-between gap-2">
                                        <div>
                                            <strong>
                                                {comentario.usuario?.nomeCompleto ??
                                                    "Usuário desconhecido"}
                                            </strong>
                                            : {comentario.conteudo}
                                        </div>

                                        {comentario.usuario?.id ===
                                            informacoesUsuario?.id && (
                                                <Button
                                                    variant="none"
                                                    className="p-0"
                                                    onClick={() => descomentarPostagem(comentario.id)}

                                                >
                                                    <IconeLixeira size={18} />
                                                </Button>
                                            )}
                                    </div>
                                </Col>
                            </span>
                        ))
                    ) : (
                        <em>Nenhum comentário ainda.</em>
                    )}
                </p>}

                <Form onSubmit={handleSubmit(data => comentarPostagem(data.conteudo))}>
                    <div className="d-flex align-items-center gap-2">
                        <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Adicione um comentário..."
                            {...register("conteudo", { required: true })}
                        />
                        <Button
                            type="submit"
                            variant="none"
                            size="sm"
                            className="p-0 border-0"
                        >
                            <IconeEnviar size={22} />
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};
