import { useContext, useState } from "react";
import API from "../API";
import { ErrorContext } from "./context/ErrorContext";

export interface BuscaPaginadaType {
    lista: [] | null, 
    pageInfo: JSON | null, 
    termoBuscaSalvo: any | null, 
    buscarTodos: Function | null
}

export default function useBuscaPaginada({ urlBuscaPaginada }) {
    const erro = useContext(ErrorContext);
    const [lista, setLista] = useState<any>({content:[]});
    const [buscando, setBuscando] = useState(false);
    const [tamanhoPagina, setTamanhoPagina] = useState(30);
    const [termoBuscaSalvo, setTermoBuscaSalvo] = useState<any>({});
    const [pageInfo, setPageInfo] = useState<any>({
        atual: 0,
        total: 0,
    });

    function buscarTodos({ termoBusca = termoBuscaSalvo, pagina = 0 }) {
        setBuscando(true);
        var url = urlBuscaPaginada.replace("@#PAGINA@#", pagina + "");
        url = url.replace("@#TAMANHO@#", tamanhoPagina + "");
        API.post(url, termoBusca)
            .then((response) => {
                setTermoBuscaSalvo(termoBusca);
                setPageInfo({
                    atual: pagina,
                    total: response.data.totalPages,
                });
                setLista(response.data);
            })
            .catch((error) => {
                erro.error = error.response.data;
            })
            .finally(() => {
                setBuscando(false);
            });
    }

    return { lista, pageInfo, termoBuscaSalvo, buscando, buscarTodos, tamanhoPagina, setTamanhoPagina };
}
