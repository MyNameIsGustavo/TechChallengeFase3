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

interface CartaoPostagemProps {
    usuario: string;
    fotoUsuario: string;
    imagemPost: string;
    descricao: string;
    likesInicial?: number;
    titulo: string;
    postagemID: number;
    comentarios: IComentario[];
    curtidas?: { usuarioId: number }[];
    selecionar: () => void;
    abrirModal: () => void;
}

export const Cartao = ({
    usuario,
    fotoUsuario,
    imagemPost,
    descricao,
    likesInicial = 0,
    titulo,
    postagemID,
    comentarios,
    curtidas,
    selecionar,
    abrirModal,
}: CartaoPostagemProps) => {
    const IconeCoracao = BsHeart as unknown as React.FC<{ size?: number }>;
    const IconeCoracaoFill = BsHeartFill as unknown as React.FC<{ size?: number }>;
    const IconeComentario = BsChat as unknown as React.FC<{ size?: number }>;
    const IconeBotoes = BsThreeDots as unknown as React.FC<{ size?: number }>;
    const IconeEnviar = BsSend as unknown as React.FC<{ size?: number }>;
    const IconeLixeira = BsTrash as unknown as React.FC<{ size?: number }>;
    const IconeEditar = BsPencil as unknown as React.FC<{ size?: number }>;

    const [curtido, setCurtido] = useState(false);
    const [likes, setLikes] = useState(likesInicial);
    const [expandirDescricao, setExpandirDescricao] = useState(false);
    const [listaComentarios, setListaComentarios] = useState<IComentario[]>(comentarios);

    const {
        curtir,
        descurtir,
        comentar,
        descomentar,
        informacoesUsuario,
        register,
        handleSubmit,
        setValue,
    } = useCartaoViewModel();

    useEffect(() => {
        if (!informacoesUsuario || !curtidas) return;

        const jaCurtiu = curtidas.some(
            (c) => c.usuarioId === informacoesUsuario.id
        );

        setCurtido(jaCurtiu);
    }, [curtidas, informacoesUsuario]);

    return (
        <Card
            className="shadow-sm mb-4 mx-auto w-100"
            style={{
                borderRadius: 8,
                maxWidth: "400px",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
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
            <Card.Header
                className="d-flex align-items-center bg-white border-0"
                onClick={abrirModal}
            >
                <img
                    src={fotoUsuario}
                    alt="Perfil"
                    width={60}
                    height={60}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                />
                <div className="d-flex flex-column flex-grow-1 ms-2">
                    <strong>{usuario}</strong>
                    <small className="text-muted">{titulo}</small>
                </div>
                <IconeBotoes />
            </Card.Header>

            <Card.Img src={imagemPost} alt="Post" style={{ maxHeight: "300px", objectFit: "cover" }} />

            <Card.Body>
                {/* AÇÕES */}
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <div>
                        <Button
                            variant="link"
                            className={`p-0 me-2 border-0 ${curtido ? "text-danger" : "text-dark"
                                }`}
                            onClick={(e) => {
                                e.stopPropagation();

                                if (curtido) {
                                    descurtir(postagemID);
                                    setCurtido(false);
                                    setLikes((prev) => Math.max(prev - 1, 0));
                                } else {
                                    curtir(postagemID);
                                    setCurtido(true);
                                    setLikes((prev) => prev + 1);
                                }
                            }}
                            aria-label="Curtir"
                        >
                            {curtido ? (
                                <IconeCoracaoFill size={23} />
                            ) : (
                                <IconeCoracao size={23} />
                            )}
                        </Button>

                        <Button
                            variant="link"
                            className="p-0 me-2 border-0 text-dark"
                            aria-label="Comentar"
                        >
                            <IconeComentario size={25} />
                        </Button>
                    </div>

                    {
                        informacoesUsuario?.papelUsuarioID !== 2 && (<Button
                            variant="link"
                            className="p-0 text-dark"
                            aria-label="Editar"
                            onClick={selecionar}
                        >
                            <IconeEditar size={24} />
                        </Button>)
                    }
                </div>

                <strong className="d-block mb-1">{likes} Curtidas</strong>

                <p className="mb-2" style={{ fontSize: "0.95rem" }}>
                    <strong>{usuario}</strong>:{" "}
                    {expandirDescricao
                        ? descricao
                        : descricao.slice(0, 80) +
                        (descricao.length > 80 ? "..." : "")}
                    {descricao.length > 80 && (
                        <button
                            className="btn btn-link p-0 ms-1"
                            style={{ fontSize: "0.85rem" }}
                            onClick={() =>
                                setExpandirDescricao(!expandirDescricao)
                            }
                        >
                            {expandirDescricao ? "ver menos" : "ver mais"}
                        </button>
                    )}
                </p>

                <p className="mb-2" style={{ fontSize: "0.95rem" }}>
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
                                                    onClick={async () => {
                                                        const removido =
                                                            await descomentar(
                                                                postagemID,
                                                                comentario.id
                                                            );
                                                        if (removido) {
                                                            setListaComentarios(
                                                                (prev) =>
                                                                    prev.filter(
                                                                        (c) =>
                                                                            c.id !==
                                                                            comentario.id
                                                                    )
                                                            );
                                                        }
                                                    }}
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
                </p>

                <Form
                    onSubmit={handleSubmit(async (data) => {
                        const novoComentario = await comentar(
                            postagemID,
                            data.conteudo
                        );
                        if (novoComentario) {
                            setListaComentarios((prev) => [
                                novoComentario,
                                ...prev,
                            ]);
                            setValue("conteudo", "");
                        }
                    })}
                >
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
