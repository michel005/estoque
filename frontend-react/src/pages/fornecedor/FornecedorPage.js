import { connect } from "react-redux";
import store from "../../store";
import styled from "styled-components";
import { useState } from "react";
import FornecedorAction from "../../actions/FornecedorAction";
import ListaComponent from "../../components/ListaComponent";

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

function FornecedorPage({ fornecedor, columnMapper }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Fornecedores';
        setConstructorHasRun(true);
    }

    constructor();

    var filters = {
        nome: {
            name: 'Nome Completo',
            selected: false
        },
        tipoPessoa: {
            name: 'Tipo Pessoa',
            selected: false
        },
        cpfCnpj: {
            name: 'CPF/CNPJ',
            selected: false
        }
    };

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
        print: () => {
            window.print();
        },
        update: (item) => {
            store.dispatch(FornecedorAction.statusAlterar(item));
        },
        delete: (item) => {
            store.dispatch(FornecedorAction.statusExcluir(item));
        },
        page: (pagina) => {
            store.dispatch(FornecedorAction.buscarPagina({
                pagina: pagina
            }));
        },
        filter: (value) => {
            store.dispatch(FornecedorAction.buscarTodos(value));
        }
    }

    return (
        <FornecedorPageStyled>
            <ListaComponent dataType="fornecedor" columnMapper={columnMapper} data={fornecedor.list} detailMapper={detail} events={events} filtersDefinition={filters} pageInfo={fornecedor} />
        </FornecedorPageStyled>
        );
};

const FornecedorPageConnected = connect((state) => { 
    return {
        fornecedor: state.fornecedor,
        columnMapper: state.tabela.fornecedor.columnMapper
    }
 })(FornecedorPage);

export default FornecedorPageConnected;