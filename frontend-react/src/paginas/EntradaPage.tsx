import { useContext, useEffect } from "react";
import API from "../API";
import ListaComponent from "../components/ListaComponent";
import GeneralConstants from "../constants/GeneralConstants";
import { CRUDContext } from "../hookies/context/CRUDContext";
import EntradaPageStyled from "./Entrada.style";

export default function EntradaPage() {
    const entradaContext = useContext(CRUDContext).entrada;
    
    useEffect(() => {
        document.title = GeneralConstants.AppName + " - Entradas";
        API.get("/item/buscarTodos").then((responseItens) => {
            var itens: any[] = [];
            var valoresItens = Object.keys(responseItens.data);
            valoresItens.map((valueItens) => {
                itens[responseItens.data[valueItens].nome] = responseItens.data[valueItens].nome;
                return valueItens;
            });

            API.get("/fornecedor/buscarTodos").then((responseFornec) => {
                var fornecedores: any[] = [];
                var valoresFornec = Object.keys(responseFornec.data);
                valoresFornec.map((valueFornec) => {
                    fornecedores[responseFornec.data[valueFornec].id] = responseFornec.data[valueFornec].nome + " (" + responseFornec.data[valueFornec].cpfCnpj + ")";
                    return valueFornec;
                });

                entradaContext.setFornecedores(fornecedores);
                entradaContext.setItens(itens);
            });
        });
    }, [entradaContext.busca.lista]);

    var detail = [
        { title: "Dados gerais" },
        {
            fields: ["descricao", "dataEntrada", "status"],
        },
        { title: "Fornecedor" },
        {
            fields: ["fornecedor", "cpfCnpj", "tipoPessoa"],
        },
        {
            fields: ["fornecedorEmail"],
        },
        { title: "Valores" },
        {
            fields: ["valor", "quantidadeItens", "quantidade"],
        },
    ];

    return (
        <EntradaPageStyled>
            <ListaComponent dataType="entrada" detailMapper={detail} />
        </EntradaPageStyled>
    );
}
