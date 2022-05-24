import { connect } from "react-redux";
import store from "../../store";
import styled from "styled-components";
import { useEffect, useState } from "react";
import FornecedorAction from "../../actions/FornecedorAction";
import ListaComponent from "../../components/ListaComponent";
import useColumnMapper from "../../hookies/useColumnMapper";

const FornecedorPageStyled = styled.div`
width: 100%;

.colunaId {
    min-width: 80px !important;
    width: 80px !important;
}

.colunaNome {
    min-width: 25%;
}

.colunaTipoPessoa {
    min-width: 180px !important;
    width: 180px !important;
}

@media print {
    .filtros, .comandoslinha {
        display: none;
    }

    .lista .fornecedor {
        display: none;
    }

    .lista .fornecedor.selecionado {
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

function FornecedorPage({ fornecedor }: any) {

    useEffect(() => {
        document.title = store.getState().appName +  ' - Fornecedores';
    })

    var detail = [
        { title: 'Dados pessoais' },
        { 
            fields: [
                'nome', 'tipoPessoa', 'cpfCnpj', 'telefone'
            ] 
        },
        { 
            fields: [
                'email'
            ] 
        },
        { title: 'Endereço' },
        { 
            fields: [
                'cidade', 'estado', 'pais', 'cep'
            ] 
        },
        { 
            fields: [
                'rua', 'numero', 'bairro', 'complemento'
            ] 
        }
    ];

    var events = {
        update: (item: any) => {
            store.dispatch(FornecedorAction.statusAlterar(item));
        },
        delete: (item: any) => {
            store.dispatch(FornecedorAction.statusExcluir(item));
        },
        page: (pagina: number) => {
            store.dispatch(FornecedorAction.buscarPagina({
                pagina: pagina
            }));
        },
        filter: (value: any) => {
            store.dispatch(FornecedorAction.buscarTodos(value));
        }
    }

    return (
        <FornecedorPageStyled>
            <ListaComponent dataType="fornecedor" data={fornecedor.list} detailMapper={detail} events={events} pageInfo={fornecedor} />
        </FornecedorPageStyled>
    );
};

const FornecedorPageConnected = connect((state: any) => { 
    return {
        fornecedor: state.fornecedor,
        columnMapper: state.tabela.fornecedor.columnMapper
    }
 })(FornecedorPage);

export default FornecedorPageConnected;