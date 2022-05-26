import store from "../../store";
import { useEffect, useState } from "react";
import ListaComponent from "../../components/ListaComponent";
import ItemPageStyled from "./ItemPage.style";
import useFormulario, { STATUS } from "../../hookies/useFormulario";
import ItemFormularioPage from "./ItemFormularioPage";
import API from "../../API";
import JanelaStyled from "../../components/JanelaStyled";

function ItemPage({ lista, pageInfo, erro, termoBuscaSalvo, buscarTodos }: any) {

    const [categorias, setCategorias] = useState([]);
    const {
        status,
        atual,
        error: formError,
        eventos
    } = useFormulario({
        defaultAtual: {},
        urlCadastro: '/item/cadastrar',
        urlAlteracao: '/item/alterar?id=@#ID@#',
        urlExclusao: '/item/excluir?id=@#ID@#',
        eventoAntes: () => {
            API.get('/item/buscaCategorias').then((response) => {
                setCategorias(response.data);
            });
        },
        eventoDepois: () => {
            buscarTodos({termoBusca: termoBuscaSalvo})
        }
    })

    useEffect(() => {
        document.title = store.getState().appName +  ' - Itens';
    });

    var detail = [
        { title: 'Dados gerais' },
        { 
            fields: [
                'nome', 'categoria', 'quantidade', 'minValor', 'maxValor'
            ] 
        }
    ];

    var events = {
        insert: () => {
            eventos.statusCadastrar();
        },
        update: (item: any) => {
            eventos.statusAlterar(item);
        },
        delete: (item: any) => {
            eventos.statusExcluir(item);
        },
        page: (pagina: any) => {
            buscarTodos({ pagina: pagina });
        },
        filter: (value: any) => {
            buscarTodos({ termoBusca: value });
        }
    }

    return (
        <ItemPageStyled>
            <ListaComponent dataType="item" data={lista.content} detailMapper={detail} events={events} pageInfo={pageInfo} />
            {status !== STATUS.OCIOSO && <ItemFormularioPage item={atual} error={formError} status={status} categorias={categorias} eventos={eventos} />}
        </ItemPageStyled>
    );
};

export default ItemPage;