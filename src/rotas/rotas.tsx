import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../app/login/login";

export const ChronosRotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}