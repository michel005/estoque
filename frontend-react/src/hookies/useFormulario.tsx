import { useEffect, useState } from "react";
import API from "../API";

export const STATUS = {
    OCIOSO: "O",
    CADASTRAR: "C",
    ALTERAR: "A"
};

export default function useFormulario({ setErro, urlCadastro, urlAlteracao, urlExclusao, defaultAtual, eventoAntes = () => {}, eventoDepois = () => {} }) {
    const [status, setStatus] = useState<any>(STATUS.OCIOSO);
    const [atual, setAtual] = useState<any>({});
    const [complementos, setComplementos] = useState<any>({});

    function statusCadastrar(atualExterno = defaultAtual) {
        eventoAntes();
        setStatus(STATUS.CADASTRAR);
        setErro(null);
        setAtual(atualExterno);
    }

    function statusAlterar(atualExterno) {
        eventoAntes();
        setStatus(STATUS.ALTERAR);
        setErro(null);
        setAtual(atualExterno);
    }

    function statusOcioso() {
        setStatus(STATUS.OCIOSO);
        setErro(null);
        setAtual(null);
    }

    function resetError() {
        setErro(null);
    }

    function preencheErro(resposta: any) {
        setErro(resposta[Object.keys(resposta)[0]]);
    }

    function cadastrar(atualExterno) {
        API.post(urlCadastro, atualExterno)
            .then(() => {
                eventoDepois();
                statusOcioso();
            })
            .catch((error) => {
                preencheErro(error.response.data);
            });
    }

    function alterar(atualExterno) {
        API.post(urlAlteracao.replace("@#ID@#", atual.id), atualExterno)
            .then(() => {
                eventoDepois();
                statusOcioso();
            })
            .catch((error) => {
                preencheErro(error.response.data);
            });
    }

    function excluir(atualExterno) {
        API.post(urlExclusao.replace("@#ID@#", atualExterno.id))
            .then(() => {
                eventoDepois();
                statusOcioso();
            })
            .catch((error) => {
                preencheErro(error.response.data);
            });
    }

    return {
        status,
        atual,
        setAtual,
        complementos,
        setComplementos,
        eventos: {
            statusCadastrar,
            statusAlterar,
            statusOcioso,
            resetError,
            cadastrar,
            alterar,
            excluir,
            setErro,
        },
    };
}
