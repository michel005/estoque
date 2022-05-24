import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonStyled from "./ButtonStyled";
import ConvertUtils from "../utils/ConvertUtils";
import TextField from "./forms/TextField";
import SelectField from "./forms/SelectField";
import ButtonOptions from "./forms/ButtonOptions";
import Calendar from "./Calendar";
import DateUtils from "../utils/DateUtils";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useState } from "react";
import ListaComponentStyle from "./ListaComponent.style";
import useColumnMapper from "../hookies/useColumnMapper";

export default function ListaComponent({
    dataType = '',
    data = [], 
    detailMapper = null, 
    events = null, 
    pageInfo = null 
}: any) {
    const [selecionado, setSelecionado] = useState<any>(null);
    const [abrirMenuColunas, setAbrirMenuColunas] = useState(false);
    const [abrirMenuFiltros, setAbrirMenuFiltros] = useState(false);
    const [orderBy, setOrderBy] = useState<any>(null);

    const [
        columns, modifyColumnAtt, savedValues, modifySavedFilters
    ] = useColumnMapper(dataType);

    useState(() => {
        initialOrderBy();
    })

    function initialOrderBy() {
        if (savedValues !== undefined && savedValues !== null && savedValues.orderBy !== undefined) {
            setOrderBy({ orderBy: savedValues.orderBy, orderByDirection: savedValues.orderByDirection });
            return;
        }
        var fieldsWithOrderBy = Object.keys(columns)
        .filter((e) => columns[e].order !== undefined);
        var start: any = fieldsWithOrderBy.filter((e) => columns[e].startOrder !== undefined && columns[e].startOrder === true);
        var finishOrderBy: any = null;
        if (start.length === 0) {
            if (fieldsWithOrderBy.length > 0) {
                finishOrderBy = { orderBy: columns[fieldsWithOrderBy[0]].order, orderByDirection: 'asc' };
            } else {
                return;
            }
        } else {
            finishOrderBy = { orderBy: columns[start[0]].order, orderByDirection: 'asc' };
        }
        setOrderBy(finishOrderBy);
    }

    function selecionar(value: any) {
        setSelecionado(selecionado === null || selecionado.id !== value.id ? value : null);
    }

    function columnStyles(dadosLinha: any) {
        var st = (columns[dadosLinha].align !== undefined ? ' align ' + columns[dadosLinha].align : '');
        st += ' coluna' + ConvertUtils.firstUpperCase(dadosLinha) + ' ';
        st += (columns[dadosLinha].titleColumn !== undefined && columns[dadosLinha].titleColumn === true ? ' titleColumn ' : '');
        return st;
    }

    function valueModifier(linha: any, dadosLinha: any) {
        var value = linha[dadosLinha];
        if (columns[dadosLinha].getValue !== undefined) {
            value = columns[dadosLinha].getValue(linha);
        }
        if (value === undefined || value === null) {
            return 'Não informado';
        }
        if (columns[dadosLinha].money !== undefined) {
            return ConvertUtils.moneyFormat(value);
        }
        if (columns[dadosLinha].convert !== undefined) {
            return ConvertUtils.listOnText(columns[dadosLinha].convert, value);
        }
        return value;
    }

    function imprimir(value: any) {
        if (events !== null && events.print !== undefined && events.print !== null) {
            window.print();
        }
    }

    function mostrarFormularioAlterar(value: any) {
        if (events !== null && events.update !== undefined && events.update !== null) {
            events.update(value);
        }
    }

    function mostrarFormularioExclusao(value: any) {
        if (events !== null && events.delete !== undefined && events.delete !== null) {
            events.delete(value);
        }
    }

    function buscarPagina(value: any) {
        if (events !== null && events.page !== undefined && events.page !== null) {
            events.page(value);
        }
    }

    function filtrar(ob: any = orderBy) {
        setAbrirMenuColunas(false);
        setAbrirMenuFiltros(false);
        var values: any = {};
        Object.keys(columns)
        .filter((value) => 
            columns[value].filtered !== undefined && 
            columns[value].filtered === true
        ).map((value: any) => {
            var component: any = document.getElementById('filtro_' + value);
            values[value] = component === undefined || component === null ? '' : component.value;
            if (columns[value].date !== undefined && columns[value].date === true && values[value] !== '') {
                values[value] = values[value].replace('/', '').replace('/', '');
            }
            return value;
        });
        if (events !== null && events.filter !== undefined && events.filter !== null) {
            if (ob !== null) {
                values.orderBy = ob.orderBy;
                values.orderByDirection = ob.orderByDirection;
            }
            modifySavedFilters(values);   
            events.filter(values);
        }
    }

    function adicionarFiltro(columnName: any) {
        modifyColumnAtt(columnName, 'filterVisible', true);
        setAbrirMenuFiltros(false);
    }

    function removerFiltro(columnName: any) {
        modifyColumnAtt(columnName, 'filterVisible', false);
    }

    function EventoMostrarColuna(columnName: any) {
        modifyColumnAtt(columnName, 'visible', true);
    }

    function EventoRemoverColuna(columnName: any) {
        modifyColumnAtt(columnName, 'visible', false);
    }

    function mouseOver(value: any) {
        if (data.length > 0) {
            var st = document.getElementsByClassName('colunaEstiloInterno' + value);
            for (var i = 0; i < st.length; i++) {
                var item = st.item(i);
                if (item !== null) {
                    item.classList.add('columnActive');
                }
            }
        }
    }

    function mouseOut(value: any) {
        var st = document.getElementsByClassName('colunaEstiloInterno' + value);
        for (var i = 0; i < st.length; i++) {
            var item = st.item(i);
            if (item !== null) {
                item.classList.remove('columnActive');
            }
         }
    }

    function defaultValue(field: any) {
        var column: any = columns[field];
        var defaultValue: any = column.defaultFilterValue;

        var val: any = null;
        if (savedValues[field] !== undefined && savedValues[field] !== null && savedValues[field] !== '') {
            if (column.date !== undefined && column.date === true) {
                val = savedValues[field].substr(0, 2) + '/' + savedValues[field].substr(2, 2) + '/' + savedValues[field].substr(4, 4);
            } else {
                val = savedValues[field];
            }
        } else
        if (defaultValue !== undefined) {
            val = defaultValue;
        }
        if (column.date !== undefined && column.date === true) {
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

    function changeOrderBy(field: any) {
        var campo = field;
        if (columns[field].order !== undefined) {
            campo = columns[field].order;
            var dir = 'asc';
            if (orderBy !== null && orderBy.orderBy === columns[field].order) {
                dir = orderBy.orderByDirection === 'asc' ? 'desc' : 'asc';
            }
            setOrderBy({ orderBy: campo, orderByDirection: dir });
            
            filtrar({ orderBy: campo, orderByDirection: dir });
        }
    }

    function orderByIcon(field: any) {
        return (
            orderBy !== null && columns[field].order !== undefined && orderBy.orderBy === columns[field].order &&
            <ButtonStyled className={'link orderBy ' + orderBy.orderByDirection}>
                <FontAwesomeIcon icon={solid('angle-down')} />
            </ButtonStyled>
        );
    }

    return (
        <ListaComponentStyle>
            <div className="filtros">
                <div className="linhaFiltro noFullWidth">
                    {
                        Object.keys(columns)
                        .filter((value) => 
                            columns[value].filtered !== undefined && 
                            columns[value].filtered === true && 
                            columns[value].filterVisible !== undefined &&
                            columns[value].filterVisible === true
                        ).map((value: any, index: number) => {
                            if (columns[value].convert !== undefined) {
                                if (Object.keys(columns[value].convert).length <= 4) {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)}>x</ButtonStyled>
                                            <ButtonOptions fieldID={'filtro_' + value} label={columns[value].name} list={columns[value].convert} defaultValue={defaultValue(value)} nullableOption={true} nullableOptionText="Todos" />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)}>x</ButtonStyled>
                                            <SelectField fieldID={'filtro_' + value} label={columns[value].name} list={columns[value].convert} defaultValue={defaultValue(value)} />
                                        </div>
                                    );
                                }
                            } else {
                                if (columns[value].date !== undefined && columns[value].date === true) {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)}>x</ButtonStyled>
                                            <Calendar title={columns[value].name} fieldID={'filtro_' + value} value={defaultValue(value)} />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)}>x</ButtonStyled>
                                            <TextField fieldID={'filtro_' + value} label={columns[value].name} defaultValue={defaultValue(value)} />
                                        </div>
                                    );
                                }
                            }
                        })
                    }
                    <div className="comandos">
                        <div className="botoes">
                            <ButtonStyled title="Mostrar colunas" onClick={eventoAbrirMenuColunas}>
                                <FontAwesomeIcon icon={solid('columns')} />
                            </ButtonStyled>
                            {abrirMenuColunas === true &&
                            <div className="opcoesColunas">
                                <div className="title">Colunas Visiveis</div>
                                {   
                                    Object.keys(columns)
                                    .filter((value) => (columns[value].visible === undefined || columns[value].visible === true))
                                    .map((value:any, index:number) => {
                                        return (
                                            <ButtonStyled key={index} className="link showing" onClick={() => EventoRemoverColuna(value)}>{columns[value].icon !== undefined && columns[value].icon}  {columns[value].name}</ButtonStyled>
                                        );
                                    })
                                }
                                {Object.keys(columns)
                                .filter((value) => (!(columns[value].visible === undefined || columns[value].visible === true)))
                                .length > 0 && <div className="title">Disponíveis</div>}
                                {
                                    Object.keys(columns)
                                    .filter((value) => (!(columns[value].visible === undefined || columns[value].visible === true)))
                                    .sort((a, b) => columns[a].name.localeCompare(columns[b].name))
                                    .map((value, index) => {
                                        return (
                                            <ButtonStyled key={index} className="link" onClick={() => EventoMostrarColuna(value)}>{columns[value].icon !== undefined && columns[value].icon} {columns[value].name}</ButtonStyled>
                                        );
                                    })
                                }
                            </div>}
                            <ButtonStyled title="Filtrar colunas" onClick={eventoAbrirMenuFiltros}>
                                <FontAwesomeIcon icon={solid('filter')} />
                            </ButtonStyled>
                            {abrirMenuFiltros === true &&
                            <div className="opcoesColunas">
                                <div className="title">Filtros Disponíveis</div>
                                {
                                    Object.keys(columns)
                                    .filter((value) => 
                                    columns[value].filtered !== undefined && 
                                    columns[value].filtered === true && 
                                        ( columns[value].filterVisible === undefined ||
                                            columns[value].filterVisible === false )
                                    ).sort((a, b) => columns[a].name.localeCompare(columns[b].name)).map((value, index) => {
                                        return (
                                            <ButtonStyled key={index} className="link showing" onClick={() => adicionarFiltro(value)}>{columns[value].icon !== undefined ? columns[value].icon : <></>} {columns[value].name}</ButtonStyled>
                                        );
                                    })
                                }
                            </div>}
                            <ButtonStyled title="Buscar" className="primary" onClick={() => filtrar()}><FontAwesomeIcon icon={solid('search')} /></ButtonStyled>
                        </div>
                    </div>
                </div>
            </div>
            <div className="linha nohover">
                <div className="linhaInterna cabecalho">
                    {
                        Object.keys(columns)
                        .filter((value) => (columns[value].visible === undefined || columns[value].visible === true))
                        .map((value: any, index: number) => {
                            return (
                                <div key={index} onMouseOver={(x) => mouseOver(value)} onMouseOut={(x) => mouseOut(value)} onClick={() => changeOrderBy(value)} className={'coluna colunaEstiloInterno' + value + ' ' + columnStyles(value) + ' ' + value}>
                                    {columns[value].icon !== undefined && columns[value].icon} {columns[value].name} {orderByIcon(value)}
                                </div>
                            );
                        })
                    }
                    <div className="coluna comandoslinha">
                        
                    </div>
                </div>
            </div>
            {
                data.map((linha: any, idx: number) => {
                    return (
                        <div key={idx} className={'linha ' + (selecionado !== null && selecionado.id === linha.id ? 'selecionado' : '')}>
                            <div className="linhaInterna">
                                {
                                    Object.keys(columns)
                                    .filter((dadosLinha) => dadosLinha !== 'requestData' && (columns[dadosLinha].visible === undefined || columns[dadosLinha].visible === true))
                                    .map((dadosLinha: any, indexLinha: number) => {
                                        return (
                                            <div key={indexLinha} className={'coluna colunaEstiloInterno' + dadosLinha + ' ' + columnStyles(dadosLinha) + ' ' + dadosLinha}>{valueModifier(linha, dadosLinha)}</div>
                                        );
                                    })
                                }
                                <div className="coluna comandoslinha">
                                    <div className="opcoesRegistro">
                                        <ButtonStyled title="Imprimir" onClick={() => imprimir(linha.requestData !== undefined ? linha.requestData : linha)}><FontAwesomeIcon icon={solid('print')} /></ButtonStyled>
                                        <ButtonStyled title="Alterar" onClick={() => mostrarFormularioAlterar(linha.requestData !== undefined ? linha.requestData : linha)}><FontAwesomeIcon icon={solid('pencil-alt')} /></ButtonStyled>
                                        <ButtonStyled title="Excluir" onClick={() => mostrarFormularioExclusao(linha.requestData !== undefined ? linha.requestData : linha)}><FontAwesomeIcon icon={solid('trash')} /></ButtonStyled>
                                    </div>
                                    {detailMapper !== null ? 
                                    <ButtonStyled title="Mostrar detalhes" className={'botaoSelecionar link ' + (selecionado !== null && selecionado.id === linha.id ? 'selecionado' : '')} onClick={() => selecionar(linha)}>
                                        <FontAwesomeIcon icon={solid('chevron-down')} />
                                    </ButtonStyled> : <></> }
                                </div>
                            </div>
                            {detailMapper !== null && selecionado !== null && selecionado.id === linha.id &&
                            <div className="detalhes">
                                {
                                    Object.keys(detailMapper)
                                    .filter((value) => detailMapper[value].title !== undefined || detailMapper[value].fields !== undefined)
                                    .map((detField: any, idx1: any) => {
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
                                                        detailMapper[detField].fields.map((field: any, idx2: any) => {
                                                            if (field !== '') {
                                                                return (
                                                                    <TextField key={idx2} readonlyIcon={columns[field].icon !== undefined ? columns[field].icon : ''} readonly={true} label={columns[field].nameDesc !== undefined ? columns[field].nameDesc : columns[field].name} defaultValue={valueModifier(linha, field)} />
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
                            </div>}
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
                    <ButtonStyled className="transparent" disabled={pageInfo.page <= 0} onClick={() => buscarPagina(0)}><FontAwesomeIcon icon={solid('fast-backward')} /></ButtonStyled>
                    <ButtonStyled className="transparent" disabled={pageInfo.page <= 0} onClick={() => buscarPagina(pageInfo.page - 1)}><FontAwesomeIcon icon={solid('backward')} /></ButtonStyled>
                    {pageInfo.pageInfo.length === 0 ? <ButtonStyled className="nohover transparent">0</ButtonStyled> : <ButtonStyled className="nohover transparent">Página {pageInfo.page + 1} de { pageInfo.pageInfo.length }</ButtonStyled> }
                    <ButtonStyled className="transparent" disabled={((pageInfo.page + 1) === pageInfo.pageInfo.length) || pageInfo.pageInfo.length === 0} onClick={() => buscarPagina(pageInfo.page + 1)}><FontAwesomeIcon icon={solid('forward')} /></ButtonStyled>
                    <ButtonStyled className="transparent" disabled={((pageInfo.page + 1) === pageInfo.pageInfo.length) || pageInfo.pageInfo.length === 0} onClick={() => buscarPagina(pageInfo.pageInfo.length - 1)}><FontAwesomeIcon icon={solid('fast-forward')} /></ButtonStyled>
                </div>
                : <></>
            }
        </ListaComponentStyle>
    );
}