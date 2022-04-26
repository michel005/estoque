import { connect } from "react-redux";
import styled from "styled-components";
import EntradaAction from "../../actions/EntradaAction";
import Calendar from "../../components/Calendar";
import store from "../../store";
import ButtonStyled from "../../components/ButtonStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faCalendar, faDollarSign, faFastBackward, faFastForward, faFile, faForward, faList, faListAlt, faSimCard, faSync } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ListaComponent from "../../components/ListaComponent";

const EntradaPageStyled = styled.div`
width: 100%;

.colunaId {
    max-width: 80px;
}

.colunaDescricao {
    min-width: 25%;
}

.colunaStatus {
    max-width: 120px;
}

.colunaValor {
    max-width: 120px;
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

function EntradaPage({ entrada }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const tipoPessoaType = { F: 'Física', J: 'Jurídica' };
    const statusType = { PENDENTE: 'Pendente', APROVADO: 'Aprovado', CANCELADO: 'Cancelado' };

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Entradas';
        atualizar();
        setConstructorHasRun(true);
    };

    function atualizar() {
        store.dispatch(EntradaAction.buscarTodos());
    }

    function afterUpdateCurrentDate(date) {
        store.dispatch(EntradaAction.preencherDataAtual(date));
        atualizar();
    }

    function buscarPagina(pagina) {
        store.dispatch(EntradaAction.buscarPagina({
            pagina: pagina
        }));
    }

    constructor();

    var columnMapper = {
        id: {
            name: '#',
            style: 'colunaId',
            getValue: (reg) => {
                return reg.eventoEntrada.id;
            }
        },
        dataEntrada: {
            name: 'Data Entrada',
            icon: faCalendar,
            getValue: (reg) => {
                return reg.eventoEntrada.dataEntrada;
            }
        },
        descricao: {
            name: 'Descricao',
            titleColumn: true,
            getValue: (reg) => {
                return reg.eventoEntrada.descricao;
            },
            style: 'colunaDescricao',
            icon: faFile
        },
        status: {
            name: 'Situação',
            icon: faSync,
            getValue: (reg) => {
                return reg.eventoEntrada.status;
            },
            style: 'colunaStatus',
            convert: statusType
        },
        fornecedor: {
            name: 'Fornecedor',
            nameDesc: 'Nome Completo',
            icon: faSimCard,
            getValue: (reg) => {
                return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.nome;
            }
        },
        tipoPessoa: {
            name: 'Tipo Pessoa',
            icon: faSimCard,
            getValue: (reg) => {
                return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.tipoPessoa;
            },
            convert: tipoPessoaType,
            visible: false
        },
        cpfCnpj: {
            name: 'CPF/CNPJ',
            icon: faSimCard,
            getValue: (reg) => {
                return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.cpfCnpj;
            },
            visible: false
        },
        valor: {
            name: 'Valor Total',
            icon: faDollarSign,
            getValue: (reg) => {
                return reg.itens.map(e => e.valor).reduce((prev, curr) => prev + curr, 0);
            },
            money: true,
            align: 'right',
            style: 'colunaValor'
        },
        quantidadeItens: {
            name: 'Lista Itens',
            icon: faListAlt,
            getValue: (reg) => {
                return reg.itens.length;
            },
            visible: false
        },
        quantidade: {
            name: 'Quantidade de Itens',
            icon: faList,
            getValue: (reg) => {
                return reg.itens.map(e => e.quantidade).reduce((prev, curr) => prev + curr, 0);
            },
            visible: false
        }
    };

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
        }
    }

    return (
        <EntradaPageStyled>
            <div className="filtros">
                <div className="linha">
                    <Calendar title="Data Base" fieldID="filtroDataBase" value={entrada.dataAtual} afterUpdateCurrentDate={afterUpdateCurrentDate} />
                    <div className="comandos">
                        <div className="botoes">
                            <ButtonStyled title="Buscar" className="primary" onClick={() => atualizar()}>Atualizar</ButtonStyled>
                        </div>
                    </div>
                </div>
            </div>
            <ListaComponent columnMapper={columnMapper} data={entrada.list} detailMapper={detail} events={events} />
            <div className="paginacao">
                <ButtonStyled className="transparent" disabled={entrada.page <= 0} onClick={() => buscarPagina(0)}><FontAwesomeIcon icon={faFastBackward} /></ButtonStyled>
                <ButtonStyled className="transparent" disabled={entrada.page <= 0} onClick={() => buscarPagina(entrada.page - 1)}><FontAwesomeIcon icon={faBackward} /></ButtonStyled>
                {entrada.pageInfo.length === 0 ? <ButtonStyled className="nohover transparent">0</ButtonStyled> : <ButtonStyled className="nohover transparent">Página {entrada.page + 1} de { entrada.pageInfo.length }</ButtonStyled> }
                <ButtonStyled className="transparent" disabled={((entrada.page + 1) === entrada.pageInfo.length) || entrada.pageInfo.length === 0} onClick={() => buscarPagina(entrada.page + 1)}><FontAwesomeIcon icon={faForward} /></ButtonStyled>
                <ButtonStyled className="transparent" disabled={((entrada.page + 1) === entrada.pageInfo.length) || entrada.pageInfo.length === 0} onClick={() => buscarPagina(entrada.pageInfo.length - 1)}><FontAwesomeIcon icon={faFastForward} /></ButtonStyled>
            </div>
        </EntradaPageStyled>
    );
};

const EntradaPageConnected = connect((state) => { 
    return {
        entrada: state.entrada
    }
 })(EntradaPage);

 export default EntradaPageConnected;