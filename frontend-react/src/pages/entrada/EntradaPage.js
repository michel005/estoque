import { connect } from "react-redux";
import styled from "styled-components";
import EntradaAction from "../../actions/EntradaAction";
import Calendar from "../../components/Calendar";
import TableStyled from "../../components/TableStyled";
import Message from "../../components/Message";
import store from "../../store";
import ButtonStyled from "../../components/ButtonStyled";
import EntradaActionTypes from "../../constants/EntradaActionTypes";
import TextField from "../../components/forms/TextField";
import JanelaStyled from "../../components/JanelaStyled";
import ChoiceMessage from "../../components/ChoiceMessage";

const EntradaPageStyled = styled.div`
    width: 100%;

    .space {
        height: 10px;
    }

    .lead {
        color: #999;
    }

    .commandButtons {
        display: flex;
        flex-direction: row-reverse;
        margin: 14px 0px;

        .termoBusca {
            margin-left: 14px;
            width: 350px;
        }

        button {
            margin-left: 14px;
        }
    }

    .conteudo {
        display: flex;
        flex-direction: row;
        margin-top: 14px;

        .tabela {
            margin-left: 14px;
            width: 100%;

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

            .contador {
                color: #AAA;
                padding: 14px;
                text-align: right;
                width: 100%;
            }
        }
    }
`;

function EntradaPage({ status, entradas, error, current, size, page }) {

    function mostrarFormularioCadastrar() {
        store.dispatch(EntradaAction.statusCadastrar());
    }

    function mostrarFormularioAlterar(entrada) {
        store.dispatch(EntradaAction.statusAlterar(entrada));
    }

    function mostrarFormularioExcluir(entrada) {
        store.dispatch(EntradaAction.statusExcluir(entrada));
    }
    
    function excluir() {
        store.dispatch(EntradaAction.excluir(current));
    }

    function salvar() {
        var curr = current;
        curr.descricao = document.getElementById('descricaoEntrada').value;

        if (status === EntradaActionTypes.STATUS_CADASTRAR) {
            store.dispatch(EntradaAction.cadastrar(curr));
        } else
        if (status === EntradaActionTypes.STATUS_ALTERAR) {
            store.dispatch(EntradaAction.alterar(curr));
        }
    }

    function reset() {
        atualizar();
    }

    function atualizar() {
        store.dispatch(EntradaAction.buscarTodos({ termo: document.getElementById('termoBusca') ? document.getElementById('termoBusca').value : '' }));
    }

    function fecharJanela() {
        store.dispatch(EntradaAction.statusOcioso());
    }

    function fecharMensagemErro() {
        store.dispatch(EntradaAction.resetarErro());
    }

    function atualizaFiltro(data) {
        store.dispatch(EntradaAction.buscarTodos());
    }

    function buscarMais() {
        if (entradas.length === 0) {
            store.dispatch(EntradaAction.buscarTodos());
        } else {
            store.dispatch(EntradaAction.buscarMais());
        }
    }

    return (
        <EntradaPageStyled>
            <h1>Entradas</h1>
            <div className="lead">
                Efetue a baixa das entradas no seu estoque
            </div>

            <div className="conteudo">
                <div className="filtro">
                    <Calendar whenModifyCurrentDate={(data) => atualizaFiltro(data) }></Calendar>
                </div>

                <div className="tabela">
                    <div className="comandos">
                        <ButtonStyled onClick={mostrarFormularioCadastrar} className="primary">Cadastrar</ButtonStyled>
                        <TextField placeholder="Buscar pelo nome ou categoria" fieldID="termoBusca" />
                        <ButtonStyled onClick={atualizar}>Buscar</ButtonStyled>
                        <ButtonStyled onClick={reset}>Reset</ButtonStyled>
                    </div>

                    <TableStyled>
                        <thead>
                            <tr>
                                <th width="20%">Data / Hora</th>
                                <th width="80%">Descrição</th>
                                <th>Comandos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {entradas.map((entrada, index) => {
                                return ( 
                                <tr key={index}>
                                    <td>{entrada.dataEntrada}</td>
                                    <td>{entrada.descricao}</td>
                                    <td className="buttonCell">
                                        <ButtonStyled onClick={() => mostrarFormularioAlterar(entrada)}>Alterar</ButtonStyled>
                                        <ButtonStyled className="alert" onClick={() => mostrarFormularioExcluir(entrada)}>Excluir</ButtonStyled>
                                    </td>
                                </tr> );
                            })}
                            {(entradas.length === 0 || ((page + 1) * size) <= entradas.length) ?
                            <tr>
                                <td colSpan={3}><ButtonStyled style={{width: '100%'}} className="transparent" onClick={buscarMais}>Mais {size} registros...</ButtonStyled></td>
                            </tr> : <></>}
                        </tbody>
                    </TableStyled>
                    <div className="contador">
                        {entradas.length === 1 ? '1 entrada em exibição' : entradas.length + ' entradas em exibição'}
                    </div>
                </div>
            </div>

            {status === EntradaActionTypes.STATUS_CADASTRAR || status === EntradaActionTypes.STATUS_ALTERAR ? <>
                <JanelaStyled>
                    <div className="content">
                        <div className="title">Formulário de Item</div>
                        <div className="innerContent">
                            {status === EntradaActionTypes.STATUS_ALTERAR ? <TextField label="ID do Item" fieldID="idItem" defaultValue={current.id} disabled={current.id !== null} /> : <></> }
                            <div className="space"></div>
                            <TextField label="Descrição" fieldID="descricaoEntrada" defaultValue={current.descricao} nullable={false} />
                            <div className="space"></div>
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
        page: state.entrada.page
    }
 })(EntradaPage);

 export default EntradaPageConnected;