import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { useControllerLogin } from "./useLoginViewModel";

export const Login = () => {
    const { control, handleSubmit, errors, login } = useControllerLogin();

    return (
        <Container fluid className="vh-100">
            <Row className="h-100">
                <Col md={6} className="d-none d-md-block p-0"><div style={{ height: "100%", backgroundImage: "url('/ChronosLogin.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
                </Col>
                <Col xs={12} md={6} className="d-flex align-items-center justify-content-center p-4">
                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <div className="mb-4">
                            <Image
                                src="/LogoChronos.png"
                                alt="Logo Alberflex"
                                fluid
                                className="d-block mx-auto"
                                style={{ maxWidth: '300px' }}
                            />
                        </div>

                        <Form
                            onSubmit={handleSubmit(login)}
                            className="w-100"
                            style={{ maxWidth: "400px" }}
                        >
                            <Form.Group className="mb-3">
                                <Form.Label>E-mail:</Form.Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "E-mail é obrigatório",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Informe um e-mail válido"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Form.Control
                                            type="email"
                                            placeholder="Insira seu e-mail"
                                            isInvalid={!!errors.email}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email.message}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Senha:</Form.Label>
                                <Controller
                                    name="senha"
                                    control={control}
                                    rules={{
                                        required: "Senha é obrigatória",
                                        minLength: {
                                            value: 6,
                                            message: "A senha deve ter no mínimo 6 caracteres"
                                        }
                                    }}
                                    render={({ field }) => (
                                        <Form.Control
                                            type="password"
                                            placeholder="Insira sua senha"
                                            isInvalid={!!errors.senha}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.senha && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.senha.message}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Button variant="success w-100" type="submit">
                                Entrar
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
