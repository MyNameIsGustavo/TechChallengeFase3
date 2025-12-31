import { MenuSuperior } from "../../componentes/menuSuperior/menuSuperior"
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useFormularioPostagensViewModel } from "./useFormularioPostagemViewModel";
import { Alerta } from "../../componentes/alerta/alerta";

export const FormularioPostagem = () => {
    const { register, handleSubmit, errors, abrirConfirmacaoSalvar, alerta, setAlerta, ehEdicao, editarObjeto } = useFormularioPostagensViewModel();

    return (
        <Container fluid>
            <MenuSuperior />
            <Container className="mt-4 p-4 shadow rounded" style={{ maxWidth: "700px", background: "#fff" }}>
                <h3 className="mb-4 text-center" style={{color: "gray"}}>Cockpit de postagem</h3>
                <Form onSubmit={handleSubmit((data) => { abrirConfirmacaoSalvar(data) })}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o título"
                            {...register("titulo", { required: "Título é obrigatório", minLength: { value: 5, message: "Título deve ter no mínimo 5 caracteres" } })}
                        />
                        {errors.titulo && <Form.Text className="text-danger">{errors.titulo.message}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Digite a descrição"
                            {...register("descricao", { required: "Descrição é obrigatória", minLength: { value: 10, message: "Descrição deve ter no mínimo 10 caracteres" } })}
                        />
                        {errors.descricao && <Form.Text className="text-danger">{errors.descricao.message}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Visibilidade:</Form.Label>
                        <Form.Select
                            {...register("visibilidade", { required: "Selecione a visibilidade" })}
                            defaultValue="true"
                        >
                            <option value="true">Verdadeiro</option>
                            <option value="false">Falso</option>
                        </Form.Select>
                        {errors.visibilidade && <Form.Text className="text-danger">{errors.visibilidade.message}</Form.Text>}
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Imagem da Postagem:</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            {...register("caminhoImagem", {
                                validate: (files: FileList) => {
                                    if (ehEdicao) return true;
                                    if (!files || files.length === 0) {
                                        return "Imagem é obrigatória";
                                    }

                                    return true;
                                }
                            })}
                        />
                        {errors.caminhoImagem && <Form.Text className="text-danger">{errors.caminhoImagem.message}</Form.Text>}
                        {
                            ehEdicao ? (
                                <Form.Text className="text-info">
                                    <img
                                        src={editarObjeto.caminhoImagem}
                                        alt="Imagem da postagem"
                                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                                        className="d-flex mx-auto mt-2"
                                    />
                                </Form.Text>
                            ) : (
                                <Form.Text className="text-muted">
                                    Selecione uma imagem para anexar à postagem.
                                </Form.Text>
                            )
                        }


                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100">
                        Salvar Postagem
                    </Button>
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
    );
}