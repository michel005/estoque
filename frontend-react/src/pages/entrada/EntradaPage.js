import { connect } from "react-redux";
import styled from "styled-components";
import EntradaAction from "../../actions/EntradaAction";
import Calendar from "../../components/Calendar";
import TableStyled from "../../components/TableStyled";
import SelectField from "../../components/forms/SelectField";
import Message from "../../components/Message";
import store from "../../store";
import ButtonStyled from "../../components/ButtonStyled";
import EntradaActionTypes from "../../constants/EntradaActionTypes";
import TextField from "../../components/forms/TextField";
import JanelaStyled from "../../components/JanelaStyled";
import ChoiceMessage from "../../components/ChoiceMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faDotCircle, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const EntradaPageStyled = styled.div`
    width: 100%;

    .space {
        height: 10px;
    }

    .lead {
        color: #999;
    }

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

        .filtro {

            & > button {
                margin-top: 14px;
                width: 100%;
            }

        }

        .tabela {
            margin-left: 14px;
            width: 100%;
            height: 100%;

            .comandos {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                margin-bottom: 14px;

                .termoBusca {
                    margin-left: 14px;
                    width: 350px;
                }

                button {
                    margin-left: 14px;
                }
            }

            table {
                width: 100%;
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
        }

    }
`;

function EntradaPage({ status, entradas, error, current, size, page, currentDate, itemList, pageInfo }) {

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
        curr.eventoEntrada.status = document.getElementById('listaStatus').value;

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
        store.dispatch(EntradaAction.adicionaItemNoCurrentEntrada({ nomeItem: item, quantidade: quantidade }));
        document.getElementById('listaItens').value = '';
        document.getElementById('quantidade').value = '';
    }

    function removerItem(item) {
        store.dispatch(EntradaAction.removeItemNoCurrentEntrada(item.nome));
    }

    function setCurrent(x) {
        x(currentDate);
        store.dispatch(EntradaAction.defineDataEntradaCalendar(x));
    }

    return (
        <EntradaPageStyled>
            <h1>Entradas</h1>
            <div className="lead">
                Efetue a baixa das entradas no seu estoque
            </div>

            <div className="conteudo">
                <div className="filtro">
                    <Calendar whenModifyCurrentDate={(data) => atualizaFiltro(data) } setCurrentVariable={setCurrent}></Calendar>
                    <ButtonStyled onClick={mostrarFormularioCadastrar} className="primary">Cadastrar</ButtonStyled>
                    <ButtonStyled disabled={currentDate === null} onClick={atualizar}>Atualizar</ButtonStyled>
                </div>

                <div className="tabela">
                    <TableStyled>
                        <thead>
                            <tr>
                                <th width="15%">Data / Hora</th>
                                <th width="100%">Descrição</th>
                                <th>Status</th>
                                <th>Comandos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entradas.map((entrada, index) => {
                                return ( 
                                <tr key={index}>
                                    <td className="dataEntrada">{entrada.dataEntrada}</td>
                                    <td className="descricao">{entrada.descricao}</td>
                                    <td className="descricao">{entrada.status}</td>
                                    <td className="buttonCell">
                                        <ButtonStyled onClick={() => mostrarFormularioAlterar(entrada)} title="Alterar"><FontAwesomeIcon icon={faPen} /></ButtonStyled>
                                        <ButtonStyled className="alert" onClick={() => mostrarFormularioExcluir(entrada)} title="Excluir"><FontAwesomeIcon icon={faTrash} /></ButtonStyled>
                                        <ButtonStyled className="success" title="Aprovar"><FontAwesomeIcon icon={faCheck} /></ButtonStyled>
                                        <ButtonStyled title="Cancelar"><FontAwesomeIcon icon={faDotCircle} /></ButtonStyled>
                                    </td>
                                </tr> );
                            })}
                            {currentDate === null ? 
                            <tr>
                                <td colSpan={4}>Selecione uma data</td>
                            </tr> : 
                            entradas.length === 0 ?
                            <tr>
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
                    </TableStyled>
                </div>
            </div>

            {status === EntradaActionTypes.STATUS_CADASTRAR || status === EntradaActionTypes.STATUS_ALTERAR ? <>
                <JanelaStyled>
                    <div className="content">
                        <div className="title">Formulário de Entrada de Itens</div>
                        <div className="innerContent">
                            <div className="form">
                                <div className="campos">
                                    {status === EntradaActionTypes.STATUS_ALTERAR ? <TextField label="ID do Item" fieldID="idItem" defaultValue={current.eventoEntrada.id} disabled={current.id !== null} /> : <></> }
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
                                </div>
                                <div className="listaItensContainer">
                                    <div className="adicionadorItens">
                                        <SelectField list={itemList} label="Item" fieldID="listaItens" />
                                        <TextField type="number" label="Quantidade" fieldID="quantidade" />
                                        <div className="aux"><ButtonStyled onClick={adicionarItem} className="primary">Adicionar</ButtonStyled></div>
                                    </div>
                                    <TableStyled>
                                        <thead>
                                            <tr>
                                                <th width="100%">Nome Item</th>
                                                <th>Quantidade</th>
                                                <th>Comandos</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {current.itens.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{value.nomeItem}</td>
                                                        <td>{value.quantidade}</td>
                                                        <td><ButtonStyled onClick={() => removerItem(value)} className="alert">Remover</ButtonStyled></td>
                                                    </tr>
                                                )
                                            })}
                                            {current.itens.length === 0 ? <tr><td colSpan={3}>Nenhum item adicionado</td></tr> : <></>}
                                        </tbody>
                                    </TableStyled>
                                </div>
                            </div>
                            <div className="commands">
                                <ButtonStyled className="primary" onClick={salvar}>Salvar</ButtonStyled>
                                <ButtonStyled onClick={fecharJanela}>Fechar</ButtonStyled>
                            </div>
                        </div>
                    </div>
                </JanelaStyled>
            </> : <></>}

            {status === EntradaActionTypes.STATUS_EXCLUIR ? <>
                <ChoiceMessage title="Exclusão de Evento de Entrada" text={'Deseja realmente excluir a entrada "' + current.descricao + '"?'} choices={[ { name: 'Sim', command: excluir }, { name: 'Não, cancelar!', command: fecharJanela } ]} />
            </> : <></>}

            {error !== null ? <Message text={error.toString()} closeEvent={fecharMensagemErro} /> : <></>}
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
        pageInfo: state.entrada.pageInfo
    }
 })(EntradaPage);

 export default EntradaPageConnected;