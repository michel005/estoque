import { connect } from "react-redux";
import styled from "styled-components";
import EntradaAction from "../../actions/EntradaAction";
import Calendar from "../../components/Calendar";
import SelectField from "../../components/forms/SelectField";
import Message from "../../components/Message";
import store from "../../store";
import ButtonStyled from "../../components/ButtonStyled";
import EntradaActionTypes from "../../constants/EntradaActionTypes";
import TextField from "../../components/forms/TextField";
import JanelaStyled from "../../components/JanelaStyled";
import ChoiceMessage from "../../components/ChoiceMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LightTableStyled from "../../components/LightTableStyled";

const EntradaPageStyled = styled.div`
    width: 100%;

    .form {
        display: flex;
        flex-direction: row;

        .campos {
            margin-right: 14px;
            width: 300px;
        }
    }

    .conteudo {
        display: flex;
        flex-direction: row;
        margin-top: 14px;
        height: calc(100% - 70px);

        .filtro {

            & > button {
                margin-top: 14px;
                width: 100%;
            }

        }

        table {
            margin-left: 14px;
            height: 100%;

            tbody {
                height: calc(100% - 64px);
            }
        }
    }

    .listaItensContainer {

        .adicionadorItens {
            display: flex;
            flex-direction: row;
            margin-bottom: 14px;

            .quantidade {
                margin-left: 14px;
            }

            .aux {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                margin-left: 14px;
            }
        }

        table {
            width: 100%;
            height: 500px;

            tbody {
                height: calc(100% - 62px);
            }
        }

    }
`;

function EntradaPage({ status, entradas, error, current, size, page, currentDate, itemList, fornecedorList, pageInfo }) {
    const [constructorHasRun, setConstructorHasRun] = useState(false);

    function constructor() {
        if (constructorHasRun) return;
        document.title = store.getState().appName +  ' - Entradas';
        setConstructorHasRun(true);
    };

    function mostrarFormularioCadastrar() {
        store.dispatch(EntradaAction.statusCadastrar());
    }

    function mostrarFormularioAlterar(entrada) {
        store.dispatch(EntradaAction.statusAlterar(entrada.id));
    }

    function mostrarFormularioExcluir(entrada) {
        store.dispatch(EntradaAction.statusExcluir(entrada));
    }
    
    function excluir() {
        store.dispatch(EntradaAction.excluir(current));
    }

    function salvar() {
        var curr = current;
        curr.eventoEntrada.descricao = document.getElementById('descricaoEntrada').value;
        if (document.getElementById('listaStatus').value !== '') {
            curr.eventoEntrada.status = document.getElementById('listaStatus').value;
        } else {
            curr.eventoEntrada.status = null;
        }
        if (document.getElementById('listaFornecedor').value !== '') {
            curr.eventoEntrada.fornecedor = {
                id: document.getElementById('listaFornecedor').value
            };
        } else {
            curr.eventoEntrada.fornecedor = null;
        }

        if (status === EntradaActionTypes.STATUS_CADASTRAR) {
            store.dispatch(EntradaAction.cadastrar(curr));
        } else
        if (status === EntradaActionTypes.STATUS_ALTERAR) {
            store.dispatch(EntradaAction.alterar(curr));
        }
    }

    function atualizar() {
        if (currentDate == null) {
            store.dispatch(EntradaAction.statusOcioso());
        } else {
            store.dispatch(EntradaAction.buscarTodos(currentDate));
        }
    }

    function fecharJanela() {
        store.dispatch(EntradaAction.statusOcioso());
    }

    function fecharMensagemErro() {
        store.dispatch(EntradaAction.resetarErro());
    }

    function atualizaFiltro(data) {
        store.dispatch(EntradaAction.atualizarData(data));
    }

    function buscarPagina(pagina) {
        store.dispatch(EntradaAction.buscarPagina({ pagina: pagina - 1 }));
    }

    function adicionarItem() {
        var item = document.getElementById('listaItens').value;
        var quantidade = document.getElementById('quantidade').value;
        if (item.trim() !== '' && quantidade.trim() !== '') {
            store.dispatch(EntradaAction.adicionaItemNoCurrentEntrada({ nomeItem: item, quantidade: quantidade }));
            document.getElementById('listaItens').value = '';
            document.getElementById('quantidade').value = '';
        } else {
            store.dispatch(EntradaAction.mostrarErro({
                "ERRO": "Informe um item válido antes de prosseguir"
            }));
        }
    }

    function removerItem(item) {
        store.dispatch(EntradaAction.removeItemNoCurrentEntrada(item.nome));
    }

    function setCurrent(x) {
        x(currentDate);
        store.dispatch(EntradaAction.defineDataEntradaCalendar(x));
    }

    constructor();

    return (
        <EntradaPageStyled>
            <div className="cabecalho">
                <h1><FontAwesomeIcon icon={faArrowUp} />Entradas</h1>
            </div>

            <div className="conteudo">
                <div className="filtro">
                    <Calendar reduced={true} whenModifyCurrentDate={(data) => atualizaFiltro(data) } setCurrentVariable={setCurrent} title="Data Base"></Calendar>
                    <ButtonStyled onClick={mostrarFormularioCadastrar} className="primary">Cadastrar</ButtonStyled>
                    <ButtonStyled disabled={currentDate === null} onClick={atualizar}>Atualizar</ButtonStyled>
                </div>

                <LightTableStyled>
                    <thead>
                        <tr>
                            <th width="15%">Data / Hora</th>
                            <th width="50%">Descrição</th>
                            <th width="25%">Fornecedor</th>
                            <th width="10%">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entradas.map((entrada, index) => {
                            return ( 
                            <tr key={index}>
                                <td width="15%" className="dataEntrada">{entrada.dataEntrada}</td>
                                <td width="50%">
                                    <ButtonStyled onClick={() => mostrarFormularioAlterar(entrada)} className="link">{entrada.descricao}</ButtonStyled>
                                </td>
                                <td width="25%" className="fornecedor">{entrada.fornecedor !== null ? entrada.fornecedor.nome + ' (' + entrada.fornecedor.cpfCnpj + ')' : ''}</td>
                                <td width="10%" className="status">{entrada.status}</td>
                            </tr> );
                        })}
                        {currentDate === null ? 
                        <tr>
                            <td colSpan={4}>Selecione uma <b>Data Base</b></td>
                        </tr> : 
                        entradas.length === 0 ?
                        <tr className="nohover">
                            <td colSpan={4}>Nenhum registro encontrado</td>
                        </tr> : <></>}
                    </tbody>
                    {entradas.length !== 0 ?
                    <tfoot>
                        <tr>
                            <th colSpan={4}>
                                <ButtonStyled disabled={page <= 0} onClick={() => buscarPagina(page)}>{'<'}</ButtonStyled>
                                {pageInfo.map((value, index) => {
                                    return ( <ButtonStyled className={value.page === (page + 1) ? 'primary' : ''} key={index} onClick={() => buscarPagina(value.page)}>{value.page}</ButtonStyled> )
                                })}
                                <ButtonStyled disabled={((page + 1) === pageInfo.length) || pageInfo.length === 0} onClick={() => buscarPagina(page + 2)}>{'>'}</ButtonStyled>
                            </th>
                        </tr>
                    </tfoot> : <></> }
                </LightTableStyled>
            </div>

            {status === EntradaActionTypes.STATUS_CADASTRAR || status === EntradaActionTypes.STATUS_ALTERAR ? <>
                <JanelaStyled>
                    <div className="content">
                        <div className="title">Formulário de Entrada de Itens</div>
                        <div className="innerContent">
                            <div className="form">
                                <div className="campos">
                                    {status === EntradaActionTypes.STATUS_ALTERAR ? <TextField label="ID da Entrada" fieldID="idItem" defaultValue={current.eventoEntrada.id} disabled={current.id !== null} /> : <></> }
                                    {status === EntradaActionTypes.STATUS_ALTERAR ? <div className="space"></div> : <></> }
                                    <TextField label="Descrição" fieldID="descricaoEntrada" defaultValue={current.eventoEntrada.descricao} nullable={false} />
                                    <div className="space"></div>
                                    {status === EntradaActionTypes.STATUS_ALTERAR ? <TextField label="Data Entrada" defaultValue={current.eventoEntrada.dataEntrada} disabled={true} /> : <></> }
                                    {status === EntradaActionTypes.STATUS_ALTERAR ? <div className="space"></div> : <></> }
                                    <SelectField list={[ 
                                        {text: 'Pendênte', value: 'PENDENTE'}, 
                                        {text: 'Aprovado', value: 'APROVADO'}, 
                                        {text: 'Cancelado', value: 'CANCELADO'} 
                                    ]} nativeSelect={true} label="Status" fieldID="listaStatus" defaultValue={current.eventoEntrada.status} nullable={false} />
                                    <div className="space"></div>
                                    <SelectField list={fornecedorList} nativeSelect={true} label="Fornecedor" fieldID="listaFornecedor" defaultValue={current.eventoEntrada.fornecedor === null || current.eventoEntrada.fornecedor === undefined ? null : current.eventoEntrada.fornecedor.id} nullable={false} />
                                    <div className="space"></div>
                                </div>
                                <div className="listaItensContainer">
                                    <div className="adicionadorItens">
                                        <SelectField list={itemList} label="Item" fieldID="listaItens" />
                                        <TextField type="number" label="Quantidade" fieldID="quantidade" />
                                        <div className="aux"><ButtonStyled onClick={adicionarItem} className="primary">Adicionar</ButtonStyled></div>
                                    </div>
                                    <LightTableStyled>
                                        <thead>
                                            <tr>
                                                <th width="70%">Nome Item</th>
                                                <th width="20%" className="alignRight">Quantidade</th>
                                                <th width="10%"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {current.itens.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td width="70%">{value.nomeItem}</td>
                                                        <td width="20%" className="alignRight">{value.quantidade}</td>
                                                        <td width="10%" className="buttonCell"><ButtonStyled onClick={() => removerItem(value)} className="alert"><FontAwesomeIcon icon={faTrash} /></ButtonStyled></td>
                                                    </tr>
                                                )
                                            })}
                                            {current.itens.length === 0 ? <tr className="nohover"><td colSpan={3}>Nenhum item adicionado</td></tr> : <></>}
                                        </tbody>
                                    </LightTableStyled>
                                </div>
                            </div>
                            <div className="commands">
                                <ButtonStyled className="primary" onClick={salvar}>Salvar</ButtonStyled>
                                {current.eventoEntrada.id === null ? <></> : <ButtonStyled className="alert" onClick={() => mostrarFormularioExcluir(current.eventoEntrada)}>Excluir</ButtonStyled>}
                                <ButtonStyled onClick={fecharJanela}>Fechar</ButtonStyled>
                            </div>
                        </div>
                    </div>
                </JanelaStyled>
            </> : <></>}

            {status === EntradaActionTypes.STATUS_EXCLUIR ? <>
                <ChoiceMessage title="Exclusão de Evento de Entrada" text={'Deseja realmente excluir a entrada "' + current.descricao + '"?'} choices={[ { name: 'Sim', command: excluir }, { name: 'Não, cancelar!', command: fecharJanela } ]} />
            </> : <></>}

            {error !== null ? <Message title="Erro na Entrada de Estoque" text={error.toString()} closeEvent={fecharMensagemErro} /> : <></>}
        </EntradaPageStyled>
    );
};

const EntradaPageConnected = connect((state) => { 
    return {
        status: state.entrada.status,
        entradas: state.entrada.list,
        error: state.entrada.error,
        current: state.entrada.currentEntrada,
        size: state.entrada.size,
        page: state.entrada.page,
        currentDate: state.entrada.currentDate,
        itemList: state.entrada.itemList,
        fornecedorList: state.entrada.fornecedoresList,
        pageInfo: state.entrada.pageInfo
    }
 })(EntradaPage);

 export default EntradaPageConnected;