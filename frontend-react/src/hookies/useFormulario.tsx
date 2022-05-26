import { useEffect, useState } from "react";
import API from "../API";

export const STATUS = {
    OCIOSO: 'O',
    CADASTRAR: 'C',
    ALTERAR: 'A',
    EXCLUIR: 'E'
}

export default function useFormulario({
    urlCadastro, 
    urlAlteracao, 
    urlExclusao, 
    defaultAtual, 
    eventoAntes = () => {}, 
    eventoDepois = () => {}
}) {
    const [status, setStatus] = useState<any>(STATUS.OCIOSO);
    const [error, setError] = useState<any>(null);
    const [atual, setAtual] = useState<any>({});
    const [complementos, setComplementos] = useState<any>({});

    function statusCadastrar(atualExterno = defaultAtual) {
        eventoAntes();
        setStatus(STATUS.CADASTRAR);
        setError(null);
        setAtual(atualExterno);
    }

    function statusAlterar(atualExterno) {
        eventoAntes();
        setStatus(STATUS.ALTERAR);
        setError(null);
        setAtual(atualExterno);
    }

    function statusExcluir(atualExterno) {
        eventoAntes();
        setStatus(STATUS.EXCLUIR);
        setError(null);
        setAtual(atualExterno);
    }

    function statusOcioso() {
        setStatus(STATUS.OCIOSO);
        setError(null);
        setAtual(null);
    }

    function resetError() {
        setError(null);
    }

    function preencheErro(resposta:any) {
        setError(resposta[Object.keys(resposta)[0]]);
    }

    function cadastrar(atualExterno) {
        API.post(urlCadastro, atualExterno).then(() => {
            eventoDepois();
            statusOcioso();
        }).catch((error) => {
            preencheErro(error.response.data);
        });
    }

    function alterar(atualExterno) {
        API.post(urlAlteracao.replace('@#ID@#', atual.id), atualExterno).then(() => {
            eventoDepois();
            statusOcioso();
        }).catch((error) => {
            preencheErro(error.response.data);
        });
    }

    function excluir() {
        API.post(urlExclusao.replace('@#ID@#', atual.id)).then(() => {
            eventoDepois();
            statusOcioso();
        }).catch((error) => {
            preencheErro(error.response.data);
        });
    }

    return {
        status, 
        atual, 
        setAtual,
        error, 
        complementos, 
        setComplementos, 
        eventos: {
            statusCadastrar, 
            statusAlterar, 
            statusExcluir, 
            statusOcioso, 
            resetError, 
            cadastrar,
            alterar, 
            excluir,
            setError
        }
    };
}