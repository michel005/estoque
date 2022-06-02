import { useState } from "react";

export default function usePaginaAtual() {
    const [paginaAtual, setPaginaAtual] = useState("inicio");

    return { paginaAtual, setPaginaAtual };
}
