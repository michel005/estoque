import { connect } from "react-redux";
import store from "../../store";
import styled from "styled-components";
import { useState } from "react";
import FornecedorAction from "../../actions/FornecedorAction";
import TextField from "../../components/forms/TextField";
import ButtonStyled from "../../components/ButtonStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faSearch, faFastForward, faForward, faFastBackward, faBackward, faUser, faIdCard, faFolderMinus, faPhone, faMailBulk, faLocationArrow, faMap, faMapPin, faMapMarker, faSitemap, faSortNumericUp, faStreetView, faFile } from "@fortawesome/free-solid-svg-icons";
import ButtonOptions from "../../components/forms/ButtonOptions";
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
    min-width: 150px !important;
    width: 150px !important;
}

.colunaEmail {
    min-width: 34%;
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

function FornecedorPage({ fornecedor }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const tipoPessoaType = { F: 'Física', J: 'Jurídica' };

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Fornecedores';
        atualizar();
        setConstructorHasRun(true);
    }
    
    function atualizar() {
        store.dispatch(FornecedorAction.buscarTodos({
            nome: document.getElementById('filtroNome') ? document.getElementById('filtroNome').value : '',
            tipoPessoa: document.getElementById('filtroTipoPessoa') ? document.getElementById('filtroTipoPessoa').value : '',
            cpfCnpj: document.getElementById('filtroCpfCnpj') ? document.getElementById('filtroCpfCnpj').value : '',
            orderBy: 'nome',
            orderByDirection: 'asc'
        }));
    }

    function buscarPagina(pagina) {
        store.dispatch(FornecedorAction.buscarPagina({
            pagina: pagina
        }));
    }

    function limpar() {
        document.getElementById('filtroNome').value = '';
        document.getElementById('filtroTipoPessoa').value = '';
        document.getElementById('filtroCpfCnpj').value = '';
    }

    constructor();

    var columnMapper = {
        id: {
            name: '#',
            style: 'colunaId'
        },
        nome: {
            name: 'Nome',
            titleColumn: true,
            style: 'colunaNome',
            icon: faFolderMinus
        },
        tipoPessoa: {
            name: 'Tipo Pessoa',
            style: 'colunaTipoPessoa',
            convert: tipoPessoaType,
            icon: faUser
        },
        cpfCnpj: {
            name: 'CPF/CNPJ',
            icon: faIdCard
        },
        telefone: {
            name: 'Telefone',
            visible: false,
            icon: faPhone
        },
        email: {
            name: 'E-mail',
            style: 'colunaEmail',
            icon: faMailBulk
        },
        cidade: {
            name: 'Cidade',
            visible: false,
            icon: faLocationArrow
        },
        estado: {
            name: 'Estado',
            visible: false,
            icon: faMap
        },
        pais: {
            name: 'País',
            visible: false,
            icon: faMapPin
        },
        cep: {
            name: 'CEP',
            visible: false,
            icon: faMapMarker
        },
        rua: {
            name: 'Rua',
            visible: false,
            icon: faSitemap
        },
        numero: {
            name: 'Número',
            visible: false,
            icon: faSortNumericUp
        },
        bairro: {
            name: 'Bairro',
            visible: false,
            icon: faStreetView
        },
        complemento: {
            name: 'Complemento',
            visible: false,
            icon: faFile
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
        }
    }

    return (
        <FornecedorPageStyled>
            <div className="filtros">
                <div className="linha noFullWidth">
                    <TextField fieldID="filtroNome" label="Nome" />
                    <TextField fieldID="filtroCpfCnpj" label="CPF/CNPJ" placeholder="Sem pontuação" />
                    <ButtonOptions fieldID="filtroTipoPessoa" label="Tipo Pessoa" list={tipoPessoaType} nullableOption={true} nullableOptionText="Ambos" defaultValue="" />
                    <div className="comandos">
                        <div className="botoes">
                            <ButtonStyled title="Buscar" className="primary" onClick={() => atualizar()}><FontAwesomeIcon icon={faSearch} /></ButtonStyled>
                            <ButtonStyled title="Limpar filtros" onClick={() => limpar()}><FontAwesomeIcon icon={faEraser} /></ButtonStyled>
                        </div>
                    </div>
                </div>
            </div>
            <ListaComponent columnMapper={columnMapper} data={fornecedor.list} detailMapper={detail} events={events} />
            <div className="paginacao">
                <ButtonStyled className="transparent" disabled={fornecedor.page <= 0} onClick={() => buscarPagina(0)}><FontAwesomeIcon icon={faFastBackward} /></ButtonStyled>
                <ButtonStyled className="transparent" disabled={fornecedor.page <= 0} onClick={() => buscarPagina(fornecedor.page - 1)}><FontAwesomeIcon icon={faBackward} /></ButtonStyled>
                {fornecedor.pageInfo.length === 0 ? <ButtonStyled className="nohover transparent">0</ButtonStyled> : <ButtonStyled className="nohover transparent">Página {fornecedor.page + 1} de { fornecedor.pageInfo.length }</ButtonStyled> }
                <ButtonStyled className="transparent" disabled={((fornecedor.page + 1) === fornecedor.pageInfo.length) || fornecedor.pageInfo.length === 0} onClick={() => buscarPagina(fornecedor.page + 1)}><FontAwesomeIcon icon={faForward} /></ButtonStyled>
                <ButtonStyled className="transparent" disabled={((fornecedor.page + 1) === fornecedor.pageInfo.length) || fornecedor.pageInfo.length === 0} onClick={() => buscarPagina(fornecedor.pageInfo.length - 1)}><FontAwesomeIcon icon={faFastForward} /></ButtonStyled>
            </div>
        </FornecedorPageStyled>
        );
};

const FornecedorPageConnected = connect((state) => { 
    return {
        fornecedor: state.fornecedor
    }
 })(FornecedorPage);

export default FornecedorPageConnected;