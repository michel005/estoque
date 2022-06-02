import { useEffect } from "react";
import ListaComponent from "../../components/ListaComponent";
import useFormulario, { STATUS } from "../../hookies/useFormulario";
import API from "../../API";
import EntradaFormularioPage from "./EntradaFormularioPage";
import EntradaPageStyled from "./EntradaPage.style";
import GeneralConstants from "../../constants/GeneralConstants";

function EntradaPage({ setErro, lista, pageInfo, termoBuscaSalvo, buscarTodos }: any) {
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

                setComplementos({
                    itens: itens,
                    fornecedores: fornecedores,
                });
            });
        });
    }, [lista]);

    const { status, atual, setAtual, complementos, setComplementos, eventos } = useFormulario({
        setErro: setErro,
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
        eventoAntes: () => {},
        eventoDepois: () => {
            buscarTodos({ termoBusca: termoBuscaSalvo });
        },
    });

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

    var events = {
        insert: () => {
            eventos.statusCadastrar();
        },
        update: (item: any) => {
            eventos.statusAlterar(item);
        },
        delete: (item: any) => {
            eventos.excluir(item);
        },
        page: (pagina: any) => {
            buscarTodos({ pagina: pagina });
        },
        filter: (value: any) => {
            buscarTodos({ termoBusca: value });
        },
    };

    return (
        <EntradaPageStyled>
            {status === STATUS.OCIOSO && <ListaComponent dataType="entrada" data={lista.content} detailMapper={detail} events={events} pageInfo={pageInfo} />}
            {status !== STATUS.OCIOSO && (
                <EntradaFormularioPage entrada={atual} setAtual={setAtual} status={status} listaFornecedores={complementos.fornecedores} listaItens={complementos.itens} eventos={eventos} />
            )}
        </EntradaPageStyled>
    );
}

export default EntradaPage;
