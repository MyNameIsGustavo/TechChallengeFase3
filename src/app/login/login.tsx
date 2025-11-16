import { Form, Button, Container } from "react-bootstrap";

export const Login = () => {
    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>E-mail:</Form.Label>
                    <Form.Control type="email" placeholder="Insira seu e-mail" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha:</Form.Label>
                    <Form.Control type="password" placeholder="Insira sua senha" />
                </Form.Group>
                <Button variant="success w-50" type="submit">Entrar</Button>
            </Form>
        </Container>
    )
}