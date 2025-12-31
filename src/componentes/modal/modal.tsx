import { Modal } from "react-bootstrap";
import { ReactNode } from "react";

interface ModalGenericoProps {
    mostrar: boolean;
    fechar: () => void;
    titulo?: string;
    tamanho?: "sm" | "lg" | "xl";
    children: ReactNode;
}

export const ModalGenerico = ({ mostrar, fechar, titulo, tamanho = "lg", children }: ModalGenericoProps) => (
    <Modal show={mostrar} onHide={fechar} centered size={tamanho}>
        {titulo && (
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
        )}
        <Modal.Body className="p-4">{children}</Modal.Body>
    </Modal>
);
