import { connect } from "react-redux";
import ItemAction from "../../actions/ItemAction";
import store from "../../store";
import styled from "styled-components";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextField from "../../components/forms/TextField";
import SelectField from "../../components/forms/SelectField";
import ButtonStyled from "../../components/ButtonStyled";
import { faBackward, faFastBackward, faFastForward, faForward, faSearch } from "@fortawesome/free-solid-svg-icons";
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
        atualizar();
        store.dispatch(ItemAction.statusOcioso());
        setConstructorHasRun(true);
    };

    function atualizar() {
        store.dispatch(ItemAction.buscarTodos(
            { 
                nome: document.getElementById('filtroNome') ? document.getElementById('filtroNome').value : '', 
                categoria: document.getElementById('filtroCategoria') ? document.getElementById('filtroCategoria').value : '',
                orderBy: 'item.nome',
                orderByDirection: 'asc'
            }
        ));
    }

    function buscarPagina(pagina) {
        store.dispatch(ItemAction.buscarPagina({ pagina: pagina }));
    }

    constructor();

    var columnMapper = {
        id: {
            name: '#',
            style: 'colunaId'
        },
        nome: {
            name: 'Nome do Item',
            titleColumn: true,
            style: 'colunaNome'
        },
        categoria: {
            name: 'Categoria'
        },
        quantidade: {
            name: 'Quantidade'
        },
        minValor: {
            name: 'Valor Mínimo',
            align: 'right',
            money: true
        },
        maxValor: {
            name: 'Valor Máximo',
            align: 'right',
            money: true
        }
    };

    var detail = [
        { title: 'Dados principais' },
        { 
            fields: [
                'nome', 'categoria', ''
            ] 
        },
        { title: 'Valores' },
        { 
            fields: [
                'quantidade', 'minValor', 'maxValor'
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
        }
    }

    return (
        <ItemPageStyled>
            <div className="filtros">
                    <div className="linha noFullWidth">
                        <TextField fieldID="filtroNome" label="Nome" />
                        <SelectField fieldID="filtroCategoria" label="Categoria" list={item.categorias} nativeSelect={true} nullableOptionValue="" nullableOptionText="Todas as Categorias" onlyValuesList={true} />
                        <div className="comandos">
                            <div className="botoes">
                                <ButtonStyled title="Buscar" className="primary" onClick={() => atualizar()}><FontAwesomeIcon icon={faSearch} /></ButtonStyled>
                            </div>
                        </div>
                    </div>
                </div>
                <ListaComponent columnMapper={columnMapper} data={item.list} detailMapper={detail} events={events} />
                <div className="paginacao">
                    <ButtonStyled className="transparent" disabled={item.page <= 0} onClick={() => buscarPagina(0)}><FontAwesomeIcon icon={faFastBackward} /></ButtonStyled>
                    <ButtonStyled className="transparent" disabled={item.page <= 0} onClick={() => buscarPagina(item.page - 1)}><FontAwesomeIcon icon={faBackward} /></ButtonStyled>
                    {item.pageInfo.length === 0 ? <ButtonStyled className="nohover transparent">0</ButtonStyled> : <ButtonStyled className="nohover transparent">Página {item.page + 1} de { item.pageInfo.length }</ButtonStyled> }
                    <ButtonStyled className="transparent" disabled={((item.page + 1) === item.pageInfo.length) || item.pageInfo.length === 0} onClick={() => buscarPagina(item.page + 1)}><FontAwesomeIcon icon={faForward} /></ButtonStyled>
                    <ButtonStyled className="transparent" disabled={((item.page + 1) === item.pageInfo.length) || item.pageInfo.length === 0} onClick={() => buscarPagina(item.pageInfo.length - 1)}><FontAwesomeIcon icon={faFastForward} /></ButtonStyled>
                </div>
        </ItemPageStyled>
    );
};

const ItemPageConnected = connect((state) => { 
    return {
        item: state.item
    }
 })(ItemPage);

export default ItemPageConnected;