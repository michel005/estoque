import { connect } from "react-redux";
import styled from "styled-components";
import EntradaAction from "../../actions/EntradaAction";
import store from "../../store";
import { useEffect, useState } from "react";
import ListaComponent from "../../components/ListaComponent";

const EntradaPageStyled = styled.div`
width: 100%;

.colunaId {
    max-width: 80px;
}

.colunaDataEntrada {
    max-width: 180px;
}

.colunaStatus {
    max-width: 140px;
}

.colunaFornecedor {
    max-width: 300px;
}

.colunaCpfCnpj {
    max-width: 150px;
}

.colunaTipoPessoa {
    max-width: 150px;
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

function EntradaPage({ entrada } : any) {

    useEffect(() => {
        document.title = store.getState().appName +  ' - Entradas';
    })

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
        { 
            fields: [
                'fornecedorEmail'
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
        update: (item: any) => {
            store.dispatch(EntradaAction.statusAlterar(item.eventoEntrada.id));
        },
        delete: (item: any) => {
            store.dispatch(EntradaAction.statusExcluir(item));
        },
        page: (pagina: any) => {
            store.dispatch(EntradaAction.buscarPagina({pagina: pagina}));
        },
        filter: (value: any) => {
            store.dispatch(EntradaAction.buscarTodos(value));
        }
    }

    return (
        <EntradaPageStyled>
            <ListaComponent dataType="entrada" data={entrada.list} detailMapper={detail} events={events} pageInfo={entrada} />
        </EntradaPageStyled>
    );
};

const EntradaPageConnected = connect((state: any) => { 
    return {
        entrada: state.entrada,
        columnMapper: state.tabela.entrada.columnMapper
    }
 })(EntradaPage);

 export default EntradaPageConnected;