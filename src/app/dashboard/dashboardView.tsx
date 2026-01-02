import { Container, Row, Col } from "react-bootstrap";
import { MenuSuperior } from "../../componentes/menuSuperior/menuSuperior";
import { GraficoBarra } from "../../componentes/graficos/barra/graficoBarra";
import { GraficoLinha } from "../../componentes/graficos/barra/graficoLinha";
import { GraficoPizza } from "../../componentes/graficos/barra/graficoPizza";
import { useDashboardViewModel } from "./useDashboardViewModel";
import {
    IComentariosPorPostagem,
    ICurtidasPorPostagem,
    IPostagemPorMes,
    IUsuarioPorPapel,
    IUsuarioPorPostagem
} from "../../modelos/IDashboard";

export const Dashboard = () => {
    const {
        usuariosPorPapel,
        usuariosPorPostagem,
        postagemPorMes,
        comentariosPorPostagem,
        curtidasPorPostagem
    } = useDashboardViewModel();

    return (
        <Container fluid>
            <MenuSuperior />

            <Container className="mt-4 mb-5">
                <Container
                    fluid
                    className="p-4 shadow rounded bg-white"
                    style={{ maxWidth: "1200px" }}
                >
                    <h3 className="mb-4 text-center text-secondary"> Dashboard - Chronos</h3>

                    <Row className="g-4">
                        <Col xs={12} md={6}>
                            <div style={{ height: 320 }}>
                                <GraficoPizza<IUsuarioPorPapel>
                                    dados={usuariosPorPapel}
                                    titulo="Usuários por Papel"
                                    getLabel={(item) => item.papel}
                                    getValue={(item) => item.total}
                                />
                            </div>
                        </Col>

                        <Col xs={12} md={6}>
                            <div style={{ height: 320 }}>
                                <GraficoLinha<IUsuarioPorPostagem>
                                    dados={usuariosPorPostagem}
                                    titulo="Usuários com mais Postagens"
                                    getLabel={(item) => item.usuario}
                                    getValue={(item) => item.total}
                                />
                            </div>
                        </Col>

                        <Col xs={12} md={6}>
                            <div style={{ height: 320 }}>
                                <GraficoBarra<IPostagemPorMes>
                                    dados={postagemPorMes}
                                    titulo="Postagens por Mês"
                                    getLabel={(item) => item.mes}
                                    getValue={(item) => item.totalPostagens}
                                />
                            </div>
                        </Col>

                        <Col xs={12} md={6}>
                            <div style={{ height: 320 }}>
                                <GraficoBarra<IComentariosPorPostagem>
                                    dados={comentariosPorPostagem}
                                    titulo="Postagens mais Comentadas"
                                    getLabel={(item) => item.titulo}
                                    getValue={(item) => item.totalComentarios}
                                />
                            </div>
                        </Col>

                        <Col xs={12}>
                            <div style={{ height: 360 }}>
                                <GraficoBarra<ICurtidasPorPostagem>
                                    dados={curtidasPorPostagem}
                                    titulo="Postagens mais Curtidas"
                                    getLabel={(item) => item.titulo}
                                    getValue={(item) => item.totalCurtidas}
                                />
                            </div>
                        </Col>

                    </Row>
                </Container>
            </Container>
        </Container>
    );
};
