import { connect } from "react-redux";
import ItemAction from "../../actions/ItemAction";
import store from "../../store";
import styled from "styled-components";
import { useState } from "react";
import ListaComponent from "../../components/ListaComponent";

const ItemPageStyled = styled.div`
width: 100%;

.colunaId {
    min-width: 100px !important;
    width: 100px !important;
}

.colunaNome {
    min-width: 25%;
}

.paginacao {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
    padding: 14px;
    background-color: #fff;

    button {
        margin-right: 7px;

        &:last-child {
            margin-right: 0px;
        }

        &:disabled {
            opacity: 0.2;
        }
    }
}
`;

function ItemPage({ item }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Itens';
        store.dispatch(ItemAction.statusOcioso());
        setConstructorHasRun(true);
    };

    constructor();

    var filter = {
        nome: {
            name: 'Nome',
            selected: false
        },
        categoria: {
            name: 'Categoria',
            selected: false
        }
    }

    var detail = [
        { 
            fields: [
                'nome', 'categoria', 'quantidade', 'minValor', 'maxValor'
            ] 
        }
    ];

    var events = {
        print: () => {
            window.print();
        },
        update: (item) => {
            store.dispatch(ItemAction.statusAlterar(item));
        },
        delete: (item) => {
            store.dispatch(ItemAction.statusExcluir(item));
        },
        page: (pagina) => {
            store.dispatch(ItemAction.buscarPagina({ pagina: pagina }));
        },
        filter: (value) => {
            console.log(value);
            store.dispatch(ItemAction.buscarTodos(value));
        }
    }

    return (
        <ItemPageStyled>
            <ListaComponent dataType="item" data={item.list} detailMapper={detail} events={events} filtersDefinition={filter} pageInfo={item} />
        </ItemPageStyled>
    );
};

const ItemPageConnected = connect((state) => { 
    return {
        item: state.item
    }
 })(ItemPage);

export default ItemPageConnected;