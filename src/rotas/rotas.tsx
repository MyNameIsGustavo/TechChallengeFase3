import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../app/login/login";
import { AutenticacaoProvider } from "../contextos/useAutenticacao";

export const ChronosRotas = () => {
    return (
        <AutenticacaoProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </AutenticacaoProvider>
    );
}