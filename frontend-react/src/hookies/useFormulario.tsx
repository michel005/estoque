import { useContext, useEffect, useState } from "react";
import API from "../API";
import { ErrorContext } from "./context/ErrorContext";

export const STATUS = {
    OCIOSO: "O",
    CADASTRAR: "C",
    ALTERAR: "A",
};

export interface FormularioReturnType {
    status: string;
    atual: any | null;
    setAtual: Function;
    complementos: Array<any>;
    setComplementos: Function;
    statusCadastrar: Function;
    statusAlterar: Function;
    statusOcioso: Function;
    resetError: Function;
    cadastrar: Function;
    alterar: Function;
    excluir: Function;
}

export default function useFormulario({
    urlCadastro,
    urlAlteracao,
    urlExclusao,
    defaultAtual,
    tituloErro = "",
    eventoAntes = () => {
        return true;
    },
    eventoDepois = () => {
        return true;
    },
}) {
    const erro = useContext(ErrorContext);
    const [status, setStatus] = useState<string>(STATUS.OCIOSO);
    const [atual, setAtual] = useState<any>(null);
    const [complementos, setComplementos] = useState<any>({});

    function statusCadastrar(atualExterno = defaultAtual) {
        if (eventoAntes()) {
            setStatus(STATUS.CADASTRAR);
            erro.setError(null);
            setAtual(atualExterno);
        }
    }

    function statusAlterar(atualExterno) {
        if (eventoAntes()) {
            setStatus(STATUS.ALTERAR);
            erro.setError(null);
            setAtual(atualExterno);
        }
    }

    function statusOcioso() {
        setStatus(STATUS.OCIOSO);
        erro.setError(null);
        setAtual(null);
    }

    function resetError() {
        erro.setError(null);
    }

    function preencheErro(resposta: any) {
        erro.setError({ title: tituloErro, body: resposta[Object.keys(resposta)[0]] });
    }

    function salvar(atualExterno) {
        if (status === STATUS.CADASTRAR) {
            cadastrar(atualExterno);
        } else {
            alterar(atualExterno);
        }
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
        statusCadastrar,
        statusAlterar,
        statusOcioso,
        resetError,
        salvar,
        cadastrar,
        alterar,
        excluir,
    };
}
