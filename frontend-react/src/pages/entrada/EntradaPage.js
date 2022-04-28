import { connect } from "react-redux";
import styled from "styled-components";
import EntradaAction from "../../actions/EntradaAction";
import store from "../../store";
import { useState } from "react";
import ListaComponent from "../../components/ListaComponent";

const EntradaPageStyled = styled.div`
width: 100%;

.colunaId {
    max-width: 80px;
}

.colunaDataEntrada {
    max-width: 180px;
}

.colunaDescricao {
    min-width: 25%;
}

.colunaStatus {
    width: 120px;
}

.colunaValor {
    width: 150px;
}

@media print {
    .filtros, .comandoslinha {
        display: none;
    }

    .lista .entrada {
        display: none;
    }

    .lista .entrada.selecionado {
        box-shadow: none;
        display: flex;

        .coluna {
            display: none;
        }

        .coluna.nome {
            display: flex;
            font-weight: bold;
            font-size: 36px;
        }
    }

    .paginacao {
        display: none;
    }
}
`;

function EntradaPage({ entrada, columnMapper }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Entradas';
        setConstructorHasRun(true);
    };

    constructor();

    var detail = [
        { title: 'Dados gerais' },
        { 
            fields: [
                'descricao', 'dataEntrada', 'status'
            ] 
        },
        { title: 'Fornecedor' },
        { 
            fields: [
                'fornecedor', 'cpfCnpj', 'tipoPessoa'
            ] 
        },
        { title: 'Valores' },
        { 
            fields: [
                'valor', 'quantidadeItens', 'quantidade'
            ] 
        }
    ];

    var events = {
        print: () => {
            window.print();
        },
        update: (item) => {
            store.dispatch(EntradaAction.statusAlterar(item.eventoEntrada.id));
        },
        delete: (item) => {
            store.dispatch(EntradaAction.statusExcluir(item));
        },
        page: (pagina) => {
            store.dispatch(EntradaAction.buscarPagina({pagina: pagina}));
        },
        filter: (value) => {
            store.dispatch(EntradaAction.buscarTodos(value));
        }
    }

    return (
        <EntradaPageStyled>
            <ListaComponent dataType="entrada" columnMapper={columnMapper} data={entrada.list} detailMapper={detail} events={events} pageInfo={entrada} />
        </EntradaPageStyled>
    );
};

const EntradaPageConnected = connect((state) => { 
    return {
        entrada: state.entrada,
        columnMapper: state.tabela.entrada.columnMapper
    }
 })(EntradaPage);

 export default EntradaPageConnected;