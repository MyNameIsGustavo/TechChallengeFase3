import { Form, Button, Container } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { useControllerLogin } from "./visaoControllerLogin";

export const Login = () => {
    const { control, handleSubmit, errors, login } = useControllerLogin();

    return (
        <Container className="mt-5" style={{ maxWidth: "450px" }}>
            <Form onSubmit={handleSubmit(login)}>

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

                <Form.Group className="mb-3">
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

                <Button variant="success w-100" type="submit">Entrar</Button>
            </Form>
        </Container>
    );
};