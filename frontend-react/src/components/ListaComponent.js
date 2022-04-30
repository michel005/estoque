import { faChevronDown, faPencilAlt, faPrint, faTrash, faFastForward, faForward, faBackward, faFastBackward, faFilter, faSearch, faColumns, faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import ButtonStyled from "./ButtonStyled";
import ConvertUtils from "../utils/ConvertUtils";
import TextField from "./forms/TextField";
import SelectField from "./forms/SelectField";
import store from "../store";
import TabelaAction from "../actions/TabelaAction";
import ButtonOptions from "./forms/ButtonOptions";
import Calendar from "./Calendar";
import DateUtils from "../utils/DateUtils";
import JanelaStyled from "./JanelaStyled";

const Style = styled.div`
display: flex;
flex-direction: column;

.columnActive {
    background-color: #3331;
    color: #666 !important;
}

.cabecalho > .columnActive {
    background-color: transparent !important;
}

.selecionado .columnActive {
    background-color: #fff;
    color: #3339 !important;
}

.orderBy {
    color: #3339;
    margin-left: 7px;

    &.desc {
        transform: rotate(180deg);
        margin-left: 0px;
    }
}

.filtros {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 7px;

    .linhaFiltro {
        display: flex;
        flex-direction: row;

        .filtro {
            margin-right: 14px;
            width: 100%;

            .campo label, .campoLabel label {
                margin-left: 14px;
            }
        }

        .filtro {
            button.link {
                position: absolute;
                margin-top: 3px;
                font-weight: bold;
            }
        }

        .calendario {
            width: 220px;
        }

        .comandos {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            margin-right: 0px;
            width: auto;

            .botoes {
                display: flex;
                flex-direction: row;

                .opcoesColunas {
                    background-color: #3339;
                    border-radius: 4px;
                    display: flex;
                    flex-direction: column;
                    padding: 7px;
                    position: fixed;
                    transform: translateY(40px);
                    z-index: 100 !important;
                    backdrop-filter: blur(10px);

                    .title {
                        color: #fff;
                        padding: 4px;
                    }

                    button {
                        color: #aaa;
                        padding: 4px;
                        text-align: left;
                        font-size: 12px;
                        font-weight: normal;

                        &.showing {
                            color: #eee;
                        }

                        &:hover {
                            color: #eee;
                            background-color: #3339;
                        }

                        svg {
                            font-size: 12px;
                            margin-right: 7px;
                            width: 12px;
                        }
                    }
                }

                button {
                    min-width: 40px;
                    border-radius: 0px;

                    &:first-child {
                        border-top-left-radius: 4px;
                        border-bottom-left-radius: 4px;
                    }

                    &:last-child {
                        border-top-right-radius: 4px;
                        border-bottom-right-radius: 4px;
                    }
                }
            }
        }
    }
}

.linha {
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: all 0.25s;

    &:nth-child(even) {
        background-color: #fff;
    }

    &:hover {
        background-color: #eee;
    }

    &.nohover, &.nohover:hover {
        background-color: transparent;
    }

    &.empty {
        background-color: #fff;
    }

    .linhaInterna {
        display: flex;
        flex-direction: row;
        flex-flow: row;
        width: 100%;
        transition: all 0.25s;

        .coluna {
            color: #999;
            display: flex;
            flex-direction: row;
            text-align: left;
            padding: 14px;
            flex-grow: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
            word-break: normal;
            width: 100%;
            transition: all 0.25s;

            &.align {
                &.right {
                    text-align: right;
                    justify-content: flex-end;
                }
                &.center {
                    text-align: center;
                    justify-content: center;
                }
            }

            &.comandoslinha {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                max-width: 50px;

                .opcoesRegistro {
                    background-color: transparent;
                    backdrop-filter: unset;
                    padding: 0px;
                    display: none;
                    flex-direction: row;
                    margin-right: 14px;
                    transform: none;
                    position: static;
                    transition: none;
                    min-width: 100px;
                }

                .botaoSelecionar {
                    color: #999;
                    transition: all 0.25s;

                    &.selecionado {
                        transform: rotate(180deg);
                    }
                }
            }
        }

        &.cabecalho {
            background-color: transparent;

            .coluna {
                color: #666;
                font-weight: bold;
                transition: all 0.25s;

                svg {
                    margin-top: 3px;
                    margin-right: 7px;
                }
            }
        }
    }

    .detalhes {
        background-color: #fff;
        padding: 0px 14px 14px;
        margin-bottom: 14px;

        .separador {
            display: flex;
            flex-direction: row;
            margin-top: 14px;
            margin-bottom: 14px;
            width: 100%;

            .tituloSeparador {
                color: #aaa;
                font-weight: bold;
                font-size: 20px;
                display: flex;
                margin-right: 14px;
                width: auto;
            }

            .barraSeparador {
                display: flex;
                background-color: #ddd;
                height: 2px;
                flex-grow: 1;
                transform: translateY(15px);
            }
        }

        .linhaDetalhe {
            display: flex;
            flex-direction: row;

            .campo {
                flex-grow: 1;
                margin-bottom: 14px;
                width: 25%;
            }
        }
    }

    &.selecionado {
        background-color: #fff;
        box-shadow: #3333 0px 0px 7px;
        z-index: 100;
        transform: scale(1.025);

        .linhaInterna {

            .coluna {
                display: none;
            }

            .coluna.titleColumn {
                color: #3339;
                display: flex;
                font-size: 30px;
                flex-grow: 1;
            }

            .comandoslinha {
                display: flex;
                min-width: 200px;
                
                .opcoesRegistro {
                    display: flex;

                    button {
                        background-color: transparent;
                        width: 100px;
                        padding: 0px;
                        color: #3339;
                        font-size: 18px;
                        width: auto;
                        margin-right: 14px;
                        transition: none;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;

                        &:hover {
                            background-color: transparent;
                            color: #39f;
                        }
                    }
                }

                .botaoSelecionar {
                    color: #999;
                    transition: all 0.25s;
                    margin-right: 4px;

                    &.selecionado {
                        transform: rotate(180deg);
                    }
                }

                .botaoSelecionar {
                    height: 100%;
                }
            }
        }
    }

    .opcoesColunas {
        background-color: #3339;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        padding: 7px;
        position: fixed;
        transform: translateY(30px);
        z-index: 100 !important;
        backdrop-filter: blur(10px);

        .title {
            color: #fff;
            padding: 4px;
        }

        button {
            color: #aaa;
            padding: 4px;
            text-align: left;
            font-size: 12px;
            font-weight: normal;

            &.showing {
                color: #eee;
            }

            &:hover {
                color: #eee;
                background-color: #3339;
            }

            svg {
                font-size: 12px;
                margin-right: 7px;
                width: 12px;
            }
        }
    }
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
    .linha {
        display: none;
    }

    .linha.selecionado {
        box-shadow: none;
        display: flex;

        .coluna {
            display: none;
        }

        .coluna.titleColumn {
            display: flex;
            font-weight: bold;
            font-size: 36px;
        }

        .comandosLinha {
            display: none;
        }
    }
}
`;

export default function ListaComponent({ dataType = '', data = [], detailMapper = null, events = null, pageInfo = null }) {
    const [selecionado, setSelecionado] = useState(null);
    const [abrirMenuColunas, setAbrirMenuColunas] = useState(false);
    const [abrirMenuFiltros, setAbrirMenuFiltros] = useState(false);
    const [orderBy, setOrderBy] = useState(null);
    const [columnMapper] = useState(store.getState().tabela[dataType].columnMapper);
    const moneyFormater = Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    const [constructorIndicator, setConstructorIndicator] = useState(false);
    const [status, setStatus] = useState('OCIOSO');

    function constructor() {
        if (constructorIndicator === false) {
            startOrderBy();
            setConstructorIndicator(true);
        }
    }

    function startOrderBy() {
        var savedFilter = store.getState().tabela[dataType].filter;
        if (savedFilter !== undefined && savedFilter !== null && savedFilter.orderBy !== undefined) {
            setOrderBy({ orderBy: savedFilter.orderBy, orderByDirection: savedFilter.orderByDirection });
            return;
        }
        var fieldsWithOrderBy = Object.keys(columnMapper)
        .filter((e) => columnMapper[e].order !== undefined);
        var start = fieldsWithOrderBy.filter((e) => columnMapper[e].startOrder !== undefined && columnMapper[e].startOrder === true);
        var finishOrderBy = null;
        if (start.length === 0) {
            if (fieldsWithOrderBy.length > 0) {
                finishOrderBy = ({ orderBy: columnMapper[fieldsWithOrderBy[0]].order, orderByDirection: 'asc' });
            } else {
                return;
            }
        } else {
            finishOrderBy = ({ orderBy: columnMapper[start[0]].order, orderByDirection: 'asc' });
        }
        setOrderBy(finishOrderBy);
    }

    function selecionar(value) {
        setSelecionado(selecionado === null || selecionado.id !== value.id ? value : null);
    }

    function columnStyles(dadosLinha) {
        var st = (columnMapper[dadosLinha].align !== undefined ? ' align ' + columnMapper[dadosLinha].align : '');
        st += (columnMapper[dadosLinha].style !== undefined ? ' ' + columnMapper[dadosLinha].style + ' ' : '');
        st += (columnMapper[dadosLinha].titleColumn !== undefined && columnMapper[dadosLinha].titleColumn === true ? ' titleColumn ' : '');
        return st;
    }

    function valueModifier(linha, dadosLinha) {
        var value = linha[dadosLinha];
        if (columnMapper[dadosLinha].getValue !== undefined) {
            value = columnMapper[dadosLinha].getValue(linha);
        }
        if (value === undefined || value === null) {
            return 'Não informado';
        }
        if (columnMapper[dadosLinha].money !== undefined) {
            return moneyFormater.format(value);
        }
        if (columnMapper[dadosLinha].convert !== undefined) {
            return ConvertUtils.listOnText(columnMapper[dadosLinha].convert, value);
        }
        return value;
    }

    function imprimir(value) {
        if (events !== null && events.print !== undefined && events.print !== null) {
            events.print(value);
        }
    }

    function mostrarFormularioAlterar(value) {
        if (events !== null && events.update !== undefined && events.update !== null) {
            events.update(value);
        }
    }

    function mostrarFormularioExclusao(value) {
        if (events !== null && events.delete !== undefined && events.delete !== null) {
            events.delete(value);
        }
    }

    function buscarPagina(value) {
        if (events !== null && events.page !== undefined && events.page !== null) {
            events.page(value);
        }
    }

    function filtrar(ob = orderBy) {
        setAbrirMenuColunas(false);
        setAbrirMenuFiltros(false);
        var values = {};
        Object.keys(columnMapper)
        .filter((value) => 
            columnMapper[value].filtered !== undefined && 
            columnMapper[value].filtered === true
        ).map((value) => {
            var component = document.getElementById('filtro_' + value);
            values[value] = component === undefined || component === null ? '' : component.value;
            if (columnMapper[value].date !== undefined && columnMapper[value].date === true && values[value] !== '') {
                values[value] = values[value].replace('/', '').replace('/', '');
            }
            return value;
        });
        if (events !== null && events.filter !== undefined && events.filter !== null) {
            if (ob !== null) {
                values.orderBy = ob.orderBy;
                values.orderByDirection = ob.orderByDirection;
            }
            store.dispatch(TabelaAction.salvarFiltro({ type: dataType, filter: values }));
            events.filter(values);
        }
    }

    function adicionarFiltro(value) {
        store.dispatch(TabelaAction.mudarVisibilidadeFiltro({ type: dataType, column: value }));
        setAbrirMenuFiltros(false);
    }

    function removerFiltro(value) {
        setAbrirMenuFiltros(false);
        store.dispatch(TabelaAction.mudarVisibilidadeFiltro({ type: dataType, column: value }));
        setTimeout(() => {
            setAbrirMenuFiltros(true);
        })
    }

    function EventoMostrarColuna(value) {
        store.dispatch(TabelaAction.mudarVisibilidade({ type: dataType, column: value }));
        setAbrirMenuColunas(false);
        setTimeout(() => {
            setAbrirMenuColunas(true);
        })
    }

    function mouseOver(value) {
        if (data.length > 0) {
            var st = document.getElementsByClassName('colunaEstiloInterno' + value);
            for (var i = 0; i < st.length; i++) {
                st.item(i).classList.add('columnActive');
            }
        }
    }

    function mouseOut(value) {
        var st = document.getElementsByClassName('colunaEstiloInterno' + value);
        for (var i = 0; i < st.length; i++) {
            st.item(i).classList.remove('columnActive');
         }
    }

    function defaultValue(field) {
        var savedFilter = store.getState().tabela[dataType].filter;
        var columnMapper = store.getState().tabela[dataType].columnMapper[field];
        var defaultValue = store.getState().tabela[dataType].columnMapper[field].defaultFilterValue;

        var val = null;
        if (savedFilter !== undefined && savedFilter !== null && savedFilter[field] !== null && savedFilter[field] !== '') {
            if (columnMapper.date !== undefined && columnMapper.date === true) {
                val = savedFilter[field].substr(0, 2) + '/' + savedFilter[field].substr(2, 2) + '/' + savedFilter[field].substr(4, 4);
            } else {
                val = savedFilter[field];
            }
        } else
        if (defaultValue !== undefined) {
            val = defaultValue;
        }
        if (columnMapper.date !== undefined && columnMapper.date === true) {
            return DateUtils.stringToDate(val);
        }
        return (val === null ? '' : val);
    }

    function eventoAbrirMenuColunas() {
        setAbrirMenuColunas(!abrirMenuColunas);
        setAbrirMenuFiltros(false);
    }

    function eventoAbrirMenuFiltros() {
        setAbrirMenuFiltros(!abrirMenuFiltros);
        setAbrirMenuColunas(false);
    }

    function changeOrderBy(field) {
        var campo = field;
        if (columnMapper[field].order !== undefined) {
            campo = columnMapper[field].order;
            var dir = 'asc';
            if (orderBy !== null && orderBy.orderBy === columnMapper[field].order) {
                dir = orderBy.orderByDirection === 'asc' ? 'desc' : 'asc';
            }
            setOrderBy({ orderBy: campo, orderByDirection: dir });
            
            filtrar({ orderBy: campo, orderByDirection: dir });
        }
    }

    function orderByIcon(field) {
        return (
            orderBy !== null && columnMapper[field].order !== undefined && orderBy.orderBy === columnMapper[field].order ?
            <ButtonStyled className={'link orderBy ' + orderBy.orderByDirection}>
                <FontAwesomeIcon icon={faArrowCircleDown} />
            </ButtonStyled>
            :<></>
        );
    }

    constructor();

    return (
        <Style>
            <div className="filtros">
                <div className="linhaFiltro noFullWidth">
                    {
                        Object.keys(columnMapper)
                        .filter((value) => 
                            columnMapper[value].filtered !== undefined && 
                            columnMapper[value].filtered === true && 
                            columnMapper[value].filterVisible !== undefined &&
                            columnMapper[value].filterVisible === true
                        ).map((value, index) => {
                            if (columnMapper[value].convert !== undefined) {
                                if (Object.keys(columnMapper[value].convert).length <= 4) {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)}>x</ButtonStyled>
                                            <ButtonOptions fieldID={'filtro_' + value} label={columnMapper[value].name} list={columnMapper[value].convert} defaultValue={defaultValue(value)} nullableOption={true} nullableOptionText="Todos" />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)}>x</ButtonStyled>
                                            <SelectField fieldID={'filtro_' + value} label={columnMapper[value].name} list={columnMapper[value].convert} defaultValue={defaultValue(value)} />
                                        </div>
                                    );
                                }
                            } else {
                                if (columnMapper[value].date !== undefined && columnMapper[value].date === true) {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)}>x</ButtonStyled>
                                            <Calendar title={columnMapper[value].name} fieldID={'filtro_' + value} value={defaultValue(value)} />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)}>x</ButtonStyled>
                                            <TextField fieldID={'filtro_' + value} label={columnMapper[value].name} defaultValue={defaultValue(value)} />
                                        </div>
                                    );
                                }
                            }
                        })
                    }
                    <div className="comandos">
                        <div className="botoes">
                            <ButtonStyled title="Mostrar colunas" onClick={eventoAbrirMenuColunas}>
                                <FontAwesomeIcon icon={faColumns} />
                            </ButtonStyled>
                            {abrirMenuColunas === true ?
                            <div className="opcoesColunas">
                                <div className="title">Colunas Visiveis</div>
                                {
                                    Object.keys(columnMapper).filter((value) => (columnMapper[value].visible === undefined || columnMapper[value].visible === true)).sort((a, b) => columnMapper[a].name.localeCompare(columnMapper[b].name)).map((value, index) => {
                                        return (
                                            <ButtonStyled key={index} className="link showing" onClick={() => EventoMostrarColuna(value)}>{columnMapper[value].icon !== undefined ? <FontAwesomeIcon icon={columnMapper[value].icon} /> : <></>}  {columnMapper[value].name}</ButtonStyled>
                                        );
                                    })
                                }
                                {Object.keys(columnMapper).filter((value) => (!(columnMapper[value].visible === undefined || columnMapper[value].visible === true))).length > 0
                                ? <div className="title">Disponíveis</div> : <></>}
                                {
                                    Object.keys(columnMapper).filter((value) => (!(columnMapper[value].visible === undefined || columnMapper[value].visible === true))).sort((a, b) => columnMapper[a].name.localeCompare(columnMapper[b].name)).map((value, index) => {
                                        return (
                                            <ButtonStyled key={index} className="link" onClick={() => EventoMostrarColuna(value)}>{columnMapper[value].icon !== undefined ? <FontAwesomeIcon icon={columnMapper[value].icon} /> : <></>} {columnMapper[value].name}</ButtonStyled>
                                        );
                                    })
                                }
                            </div>
                            : <></>}
                            <ButtonStyled title="Filtrar colunas" onClick={eventoAbrirMenuFiltros}>
                                <FontAwesomeIcon icon={faFilter} />
                            </ButtonStyled>
                            {abrirMenuFiltros === true ?
                            <div className="opcoesColunas">
                                <div className="title">Filtros Disponíveis</div>
                                {
                                    Object.keys(columnMapper)
                                    .filter((value) => 
                                        columnMapper[value].filtered !== undefined && 
                                        columnMapper[value].filtered === true && 
                                        ( columnMapper[value].filterVisible === undefined ||
                                          columnMapper[value].filterVisible === false )
                                    ).sort((a, b) => columnMapper[a].name.localeCompare(columnMapper[b].name)).map((value, index) => {
                                        return (
                                            <ButtonStyled key={index} className="link showing" onClick={() => adicionarFiltro(value)}>{columnMapper[value].icon !== undefined ? <FontAwesomeIcon icon={columnMapper[value].icon} /> : <></>} {columnMapper[value].name}</ButtonStyled>
                                        );
                                    })
                                }
                            </div>
                            : <></>}
                            <ButtonStyled title="Buscar" className="primary" onClick={() => filtrar()}><FontAwesomeIcon icon={faSearch} /></ButtonStyled>
                        </div>
                    </div>
                </div>
            </div>
            <div className="linha nohover">
                <div className="linhaInterna cabecalho">
                    {
                        Object.keys(columnMapper).filter((value) => (columnMapper[value].visible === undefined || columnMapper[value].visible === true)).map((value, index) => {
                            return (
                                <div key={index} onMouseOver={(x) => mouseOver(value)} onMouseOut={(x) => mouseOut(value)} onClick={() => changeOrderBy(value)} className={'coluna colunaEstiloInterno' + value + ' ' + columnStyles(value) + ' ' + value}>{columnMapper[value].icon !== undefined ? <FontAwesomeIcon icon={columnMapper[value].icon} /> : <></>} {columnMapper[value].name} {orderByIcon(value)}</div>
                            );
                        })
                    }
                    <div className="coluna comandoslinha">
                        
                    </div>
                </div>
            </div>
            {
                data.map((linha, idx) => {
                    return (
                        <div key={idx} className={'linha ' + (selecionado !== null && selecionado.id === linha.id ? 'selecionado' : '')}>
                            <div className="linhaInterna">
                                {
                                    Object.keys(columnMapper)
                                    .filter((dadosLinha) => dadosLinha !== 'requestData' && (columnMapper[dadosLinha].visible === undefined || columnMapper[dadosLinha].visible === true))
                                    .map((dadosLinha, indexLinha) => {
                                        return (
                                            <div key={indexLinha} className={'coluna colunaEstiloInterno' + dadosLinha + ' ' + columnStyles(dadosLinha) + ' ' + dadosLinha}>{valueModifier(linha, dadosLinha)}</div>
                                        );
                                    })
                                }
                                <div className="coluna comandoslinha">
                                    <div className="opcoesRegistro">
                                        <ButtonStyled title="Imprimir" onClick={() => imprimir()}><FontAwesomeIcon icon={faPrint} /></ButtonStyled>
                                        <ButtonStyled title="Alterar" onClick={() => mostrarFormularioAlterar(linha.requestData !== undefined ? linha.requestData : linha)}><FontAwesomeIcon icon={faPencilAlt} /></ButtonStyled>
                                        <ButtonStyled title="Excluir" onClick={() => mostrarFormularioExclusao(linha.requestData !== undefined ? linha.requestData : linha)}><FontAwesomeIcon icon={faTrash} /></ButtonStyled>
                                    </div>
                                    {detailMapper !== null ? 
                                    <ButtonStyled title="Mostrar detalhes" className={'botaoSelecionar link ' + (selecionado !== null && selecionado.id === linha.id ? 'selecionado' : '')} onClick={() => selecionar(linha)}>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </ButtonStyled> : <></> }
                                </div>
                            </div>
                            {detailMapper !== null && selecionado !== null && selecionado.id === linha.id ?
                            <div className="detalhes">
                                {
                                    Object.keys(detailMapper)
                                    .filter((value) => detailMapper[value].title !== undefined || detailMapper[value].fields !== undefined)
                                    .map((detField, idx1) => {
                                        if (detailMapper[detField].title !== undefined) {
                                            return (
                                                <div key={idx1} className="separador">
                                                    <div className="tituloSeparador">{detailMapper[detField].title}</div>
                                                    <div className="barraSeparador"></div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={idx1} className="linhaDetalhe">
                                                    {
                                                        detailMapper[detField].fields.map((field, idx2) => {
                                                            if (field !== '') {
                                                                return (
                                                                    <TextField key={idx2} readonlyIcon={columnMapper[field].icon !== undefined ? <FontAwesomeIcon icon={columnMapper[field].icon} /> : ''} readonly={true} label={columnMapper[field].nameDesc !== undefined ? columnMapper[field].nameDesc : columnMapper[field].name} defaultValue={valueModifier(linha, field)} />
                                                                );
                                                            } else {
                                                                return (
                                                                    <div key={idx2} className="campo"></div>
                                                                );
                                                            }
                                                        })
                                                    }
                                                </div>
                                            );
                                        }
                                    })
                                }
                            </div>
                            :<></>}
                        </div>
                    );
                })
            }
            {
                data.length === 0 ?
                <div>
                    <div className='linha empty'>
                        <div className="linhaInterna">
                            <div className="coluna">Nenhum registro encontrado</div>
                        </div>
                    </div>
                </div>
                :<></>
            }
            {
                pageInfo !== null ?
                <div className="paginacao">
                    <ButtonStyled className="transparent" disabled={pageInfo.page <= 0} onClick={() => buscarPagina(0)}><FontAwesomeIcon icon={faFastBackward} /></ButtonStyled>
                    <ButtonStyled className="transparent" disabled={pageInfo.page <= 0} onClick={() => buscarPagina(pageInfo.page - 1)}><FontAwesomeIcon icon={faBackward} /></ButtonStyled>
                    {pageInfo.pageInfo.length === 0 ? <ButtonStyled className="nohover transparent">0</ButtonStyled> : <ButtonStyled className="nohover transparent">Página {pageInfo.page + 1} de { pageInfo.pageInfo.length }</ButtonStyled> }
                    <ButtonStyled className="transparent" disabled={((pageInfo.page + 1) === pageInfo.pageInfo.length) || pageInfo.pageInfo.length === 0} onClick={() => buscarPagina(pageInfo.page + 1)}><FontAwesomeIcon icon={faForward} /></ButtonStyled>
                    <ButtonStyled className="transparent" disabled={((pageInfo.page + 1) === pageInfo.pageInfo.length) || pageInfo.pageInfo.length === 0} onClick={() => buscarPagina(pageInfo.pageInfo.length - 1)}><FontAwesomeIcon icon={faFastForward} /></ButtonStyled>
                </div>
                : <></>
            }
        </Style>
    );
}