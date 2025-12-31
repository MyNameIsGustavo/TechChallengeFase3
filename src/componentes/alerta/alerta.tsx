import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AlertaProps {
    exibe: boolean;
    onClose: () => void;
    titulo: string;
    mensagem: string;
    campos?: { name: string; label: string; placeholder: string }[];
    botoes?: { label: string; onClick: (values: any) => void; variant?: string }[];
}

export const Alerta: React.FC<AlertaProps> = ({
    exibe,
    onClose,
    titulo,
    mensagem,
    campos = [],
    botoes = []
}) => {
    const [values, setValues] = React.useState<any>({});
    const handleChange = (name: string, value: string) => { setValues((prev: any) => ({ ...prev, [name]: value })); };

    return (
        <Modal show={exibe} onHide={onClose} centered backdrop="static" style={{ zIndex: 2000 }} >
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{mensagem}</p>
                {campos.map((f) => (
                    <Form.Group className="mb-3" key={f.name}>
                        <Form.Label>{f.label}</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={f.placeholder}
                            value={values[f.name] || ""}
                            onChange={(e) => handleChange(f.name, e.target.value)}
                        />
                    </Form.Group>
                ))}
            </Modal.Body>
            <Modal.Footer>
                {botoes.map((btn, idx) => (
                    <Button
                        key={idx}
                        variant={btn.variant || "primary"}
                        onClick={() => btn.onClick(values)}
                    >
                        {btn.label}
                    </Button>
                ))}
            </Modal.Footer>
        </Modal>
    );
};