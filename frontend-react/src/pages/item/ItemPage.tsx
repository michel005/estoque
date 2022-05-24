import { connect } from "react-redux";
import ItemAction from "../../actions/ItemAction";
import store from "../../store";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ListaComponent from "../../components/ListaComponent";

const ItemPageStyled = styled.div`
width: 100%;

.colunaId {
    max-width: 100px;
}

.colunaCpfCnpj {
    max-width: 150px;
}

.colunaEmail {
    max-width: 250px;
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

function ItemPage({ item }: any) {
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
        update: (item: any) => {
            store.dispatch(ItemAction.statusAlterar(item));
        },
        delete: (item: any) => {
            store.dispatch(ItemAction.statusExcluir(item));
        },
        page: (pagina: any) => {
            store.dispatch(ItemAction.buscarPagina({ pagina: pagina }));
        },
        filter: (value: any) => {
            store.dispatch(ItemAction.buscarTodos(value));
        }
    }

    return (
        <ItemPageStyled>
            <ListaComponent dataType="item" data={item.list} detailMapper={detail} events={events} pageInfo={item} />
        </ItemPageStyled>
    );
};

const ItemPageConnected = connect((state: any) => { 
    return {
        item: state.item
    }
 })(ItemPage);

export default ItemPageConnected;