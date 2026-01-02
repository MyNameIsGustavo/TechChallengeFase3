import { Navbar, Container, Offcanvas, Nav, Button, Dropdown, Image } from "react-bootstrap";
import { useControllerMenuSuperior } from "./useControllerMenuSuperior";
import { ModalGenerico } from "../modal/modal";
import { UsuarioDetalhe } from "../usuarioDetalhes/usuarioDetalhe";

export const MenuSuperior = () => {
    const { informacoesUsuario, menuItens, logout, vaiParaPaginaInicial, modalUsuario, setModalUsuario } = useControllerMenuSuperior();

    const permissao = informacoesUsuario?.papelUsuarioID ?? 0;
    const menuVisivel = menuItens.filter(item => item.permissoes.includes(permissao));

    return (
        <Navbar expand={false} style={{ height: "100px" }}>
            <Container fluid className="justify-content-between align-items-center px-4">
                <Navbar.Brand onClick={vaiParaPaginaInicial}><img src="/LogoChronos.png" alt="Chronos" height="50" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar" />
                <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
                    <Offcanvas.Header closeButton>
                        <div className="d-flex align-items-center" onClick={() => setModalUsuario(true)} style={{ cursor: "pointer" }}>
                            <div style={{ width: 50, height: 50, borderRadius: "50%", overflow: "hidden", display: "inline-block", }} className="me-3">
                                <Image
                                    src={(informacoesUsuario?.caminhoImagem as string) || "https://img.freepik.com/vetores-premium/icone-de-perfil-de-usuario-em-estilo-plano-ilustracao-em-vetor-avatar-membro-em-fundo-isolado-conceito-de-negocio-de-sinal-de-permissao-humana_157943-15752.jpg?semt=ais_hybrid&w=740&q=80"}
                                    roundedCircle
                                    width={60}
                                    height={60}
                                    alt="Foto do usuário"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block"
                                    }}
                                />
                            </div>

                            <p className="fs-6 mb-0"
                                style={{ color: "#5f5e5eff", fontWeight: 'bolder' }}>
                                {`Seja bem-vindo, ${informacoesUsuario?.nomeCompleto}.`}
                            </p>
                        </div>
                    </Offcanvas.Header>

                    <Offcanvas.Body
                        className="d-flex flex-column justify-content-between"
                        style={{ height: "100%" }}
                    >
                        <Nav className="flex-column">
                            {menuVisivel.map((item) => (
                                <Nav.Link
                                    key={item.label}
                                    className="fs-6"
                                    style={{ color: "#8a8a8a" }}
                                    onClick={item.onClick}
                                >
                                    {item.label}
                                </Nav.Link>
                            ))}
                        </Nav>
                        <div>
                            <Button className="w-100 bg-success" onClick={logout} style={{ border: "none" }}>
                                Sair
                            </Button>
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

                {
                    modalUsuario && (
                        <ModalGenerico
                            titulo="Detalhes do usuário"
                            mostrar={modalUsuario}
                            fechar={() => setModalUsuario(false)}
                            tamanho="lg"
                        >
                            <UsuarioDetalhe />
                        </ModalGenerico>
                    )
                }

            </Container>
        </Navbar>
    );
};