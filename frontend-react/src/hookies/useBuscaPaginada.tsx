import { useState } from "react";
import API from "../API";

export default function useBuscaPaginada({ urlBuscaPaginada, setErro }) {
    const [lista, setLista] = useState<any>({});
    const [pageInfo, setPageInfo] = useState<any>({
        atual: 0,
        total: 0,
    });
    const tamanhoPagina = 10;

    const [termoBuscaSalvo, setTermoBuscaSalvo] = useState<any>({});

    function buscarTodos({ termoBusca = termoBuscaSalvo, pagina = 0 }) {
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
                setErro(error.response.data);
            });
    }

    return { lista, pageInfo, termoBuscaSalvo, buscarTodos };
}
