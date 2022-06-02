import { useEffect, useState } from "react";
import ListaComponent from "../../components/ListaComponent";
import ItemPageStyled from "./ItemPage.style";
import useFormulario, { STATUS } from "../../hookies/useFormulario";
import ItemFormularioPage from "./ItemFormularioPage";
import API from "../../API";
import GeneralConstants from "../../constants/GeneralConstants";

function ItemPage({ setErro, lista, pageInfo, buscarTodos }: any) {
    useEffect(() => {
        document.title = GeneralConstants.AppName + " - Itens";
    });

    const [categorias, setCategorias] = useState([]);
    const { status, atual, eventos } = useFormulario({
        setErro: setErro,
        defaultAtual: {},
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
        },
        eventoDepois: () => {
            buscarTodos({ pagina: pageInfo.atual });
        },
    });

    var detail = [
        { title: "Dados gerais" },
        {
            fields: ["nome", "categoria", "quantidade", "minValor", "maxValor"],
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
        <ItemPageStyled>
            <ListaComponent dataType="item" data={lista.content} detailMapper={detail} events={events} pageInfo={pageInfo} textoPerguntaExclusao={'Deseja realmente excluir o item "@#nome@#"?'} />
            {status !== STATUS.OCIOSO && <ItemFormularioPage item={atual} status={status} categorias={categorias} eventos={eventos} />}
        </ItemPageStyled>
    );
}

export default ItemPage;
