import { createContext, useEffect, useState } from "react";
import API from "../../API";
import useBuscaPaginada from "../useBuscaPaginada";
import useFormulario, { STATUS } from "../useFormulario";

interface CRUDContextType {
    item: {
        form: any;
        busca: any;
        categorias: Array<any>;
    };
    fornecedor: {
        form: any;
        busca: any;
    };
    entrada: {
        form: any;
        busca: any;
        fornecedores: Array<any>;
        setFornecedores: any;
        itens: Array<any>;
        setItens: any;
    };
}

const default_form_value = {
    status: STATUS.OCIOSO,
    atual: null,
    setAtual: () => {},
    complementos: null,
    setComplementos: () => {},
    statusCadastrar: () => {},
    statusAlterar: () => {},
    statusOcioso: () => {},
    resetError: () => {},
    salvar: () => {},
    cadastrar: () => {},
    alterar: () => {},
    excluir: () => {},
};

const default_busca_value = {
    lista: {},
    pageInfo: null,
    termoBuscaSalvo: {},
    buscarTodos: () => {},
};

const CRUDContext = createContext<CRUDContextType>({
    item: {
        form: default_form_value,
        busca: default_busca_value,
        categorias: [],
    },
    fornecedor: {
        form: default_form_value,
        busca: default_busca_value,
    },
    entrada: {
        form: default_form_value,
        busca: default_busca_value,
        fornecedores: [],
        setFornecedores: () => {},
        itens: [],
        setItens: () => {},
    },
});

const CRUDContextProvider = ({ children }) => {
    const [categorias, setCategorias] = useState([]);
    const [fornecedores, setFornecedores] = useState([]);
    const [itens, setItens] = useState([]);
    const item = {
        form: useFormulario({
            defaultAtual: { nome: "NOVO ITEM" },
            urlCadastro: "/item/cadastrar",
            urlAlteracao: "/item/alterar?id=@#ID@#",
            urlExclusao: "/item/excluir?id=@#ID@#",
            eventoAntes: () => {
                API.get("/item/buscaCategorias").then((response) => {
                    var itens: any = [];
                    response.data.map((value: any) => {
                        itens[value] = value;
                    });
                    setCategorias(itens);
                });
                return true;
            },
            eventoDepois: () => {
                item.busca.buscarTodos({ pagina: item.busca.pageInfo.atual });
                return true;
            },
        }),
        busca: useBuscaPaginada({
            urlBuscaPaginada: "/item/buscaTudoComQuantidade?pagina=@#PAGINA@#&tamanho=@#TAMANHO@#",
        }),
        categorias,
    };
    const fornecedor = {
        form: useFormulario({
            defaultAtual: { nome: "Novo Fornecedor", tipoPessoa: "F" },
            urlCadastro: "/fornecedor/cadastrar",
            urlAlteracao: "/fornecedor/alterar?id=@#ID@#",
            urlExclusao: "/fornecedor/excluir?id=@#ID@#",
            eventoDepois: () => {
                fornecedor.busca.buscarTodos({ pagina: fornecedor.busca.pageInfo.atual });
                return true;
            },
        }),
        busca: useBuscaPaginada({
            urlBuscaPaginada: "/fornecedor/buscaPaginadaPorTermos?pagina=@#PAGINA@#&tamanho=@#TAMANHO@#",
        }),
    };
    const entrada = {
        form: useFormulario({
            defaultAtual: {
                eventoEntrada: {
                    id: null,
                    descricao: "Nova Entrada de Itens",
                    status: "PENDENTE",
                    fornecedor: null,
                },
                itens: [],
            },
            urlCadastro: "/evento/entrada/cadastrarModelo",
            urlAlteracao: "/evento/entrada/alterarModelo",
            urlExclusao: "/evento/entrada/excluir?id=@#ID@#",
            eventoDepois: () => {
                entrada.busca.buscarTodos({ pagina: entrada.busca.pageInfo.atual });
                return true;
            },
        }),
        busca: useBuscaPaginada({
            urlBuscaPaginada: "/evento/entrada/buscaPorDataEntrada?pagina=@#PAGINA@#&tamanho=@#TAMANHO@#",
        }),
        fornecedores,
        setFornecedores,
        itens,
        setItens,
    };

    return (
        <CRUDContext.Provider
            value={{
                item: item,
                fornecedor: fornecedor,
                entrada: entrada,
            }}
        >
            {children}
        </CRUDContext.Provider>
    );
};

export { CRUDContext, CRUDContextType };

export default CRUDContextProvider;
