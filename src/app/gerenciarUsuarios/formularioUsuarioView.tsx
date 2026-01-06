import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { MenuSuperior } from "../../componentes/menuSuperior/menuSuperior"
import { useFormularioUsuarioViewModel } from "./useFormularioViewModel";
import { Alerta } from "../../componentes/alerta/alerta";

export const FormularioUsuario = () => {
    const { register, handleSubmit, errors, isSubmitting, abrirConfirmacaoSalvar, alerta, setAlerta, ehEdicao, editarObjeto } = useFormularioUsuarioViewModel();

    return (
        <Container fluid>
            <MenuSuperior />
            <Container className="mt-4 p-4 shadow rounded" style={{ maxWidth: "1000px", background: "#fff" }}>
                <h3 className="mb-4 text-center" style={{ color: "gray" }}>Formulário de usuário</h3>
                <Form onSubmit={handleSubmit(abrirConfirmacaoSalvar)}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="nomeCompleto">
                                <Form.Label>Nome completo:</Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={!!errors.nomeCompleto}
                                    {...register("nomeCompleto", {
                                        required: "Nome é obrigatório",
                                        minLength: {
                                            value: 3,
                                            message: "Mínimo de 3 caracteres"
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nomeCompleto?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="email">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    isInvalid={!!errors.email}
                                    disabled={ehEdicao ? true : false}
                                    {...register("email", {
                                        required: "Email é obrigatório",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Email inválido"
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="telefone">
                                <Form.Label>Telefone:</Form.Label>
                                <Form.Control
                                    type="text"
                                    isInvalid={!!errors.telefone}
                                    {...register("telefone", {
                                        required: "Telefone é obrigatório",
                                        minLength: {
                                            value: 8,
                                            message: "Telefone inválido"
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.telefone?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="papelUsuarioID">
                                <Form.Label>Papel do usuário:</Form.Label>
                                <Form.Select{...register("papelUsuarioID", { valueAsNumber: true })}>
                                    <option value={1}>Docente</option>
                                    <option value={2}>Estudante</option>
                                    <option value={3}>Suporte</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errors.papelUsuarioID?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group className="mb-4">
                                <Form.Label>Imagem do usuário:</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    {...register("caminhoImagem")}
                                />
                                {errors.caminhoImagem && <Form.Text className="text-danger">{errors.caminhoImagem.message}</Form.Text>}
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                        <Form.Group controlId="senha">
                                <Form.Label>Senha:</Form.Label>
                                <Form.Control
                                    type="password"
                                    isInvalid={!!errors.senha}
                                    {...register("senha", {
                                        required: ehEdicao ? false : "Senha é obrigatória",
                                        validate: (value) => {
                                            if (ehEdicao && !value) return true;
                                            if (value.length < 6) return "Mínimo de 6 caracteres";
                                            return true;
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid">{errors.senha?.message}</Form.Control.Feedback>
                                {ehEdicao ? (<Form.Text className="text-danger">Deixe em branco para manter a senha atual.</Form.Text>) : null}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button className="w-100" variant="success" type="submit" disabled={isSubmitting}>Salvar informações!</Button>
                </Form>
            </Container>
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