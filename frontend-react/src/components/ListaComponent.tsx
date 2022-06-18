import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ButtonStyled from "./ButtonStyled";
import ConvertUtils from "../utils/ConvertUtils";
import TextField from "./forms/TextField";
import SelectField from "./forms/SelectField";
import ButtonOptions from "./forms/ButtonOptions";
import Calendar from "./Calendar";
import DateUtils from "../utils/DateUtils";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useContext, useState } from "react";
import ListaComponentStyle from "./ListaComponent.style";
import useColumnMapper from "../hookies/useColumnMapper";
import ChoiceMessage from "./ChoiceMessage";
import Separador from "./Separador";
import { CRUDContext } from "../hookies/context/CRUDContext";
import ValueUtils from "../utils/ValueUtils";

export default function ListaComponent({ dataType = "entrada", detailMapper = null, textoPerguntaExclusao = "Deseja realmente excluir este registro?" }: any) {
    const context = useContext(CRUDContext)[dataType];
    const [selecionado, setSelecionado] = useState<any>(null);
    const [perguntaExclusao, setPerguntaExclusao] = useState<any>(null);
    const [abrirMenuColunas, setAbrirMenuColunas] = useState(false);
    const [abrirMenuFiltros, setAbrirMenuFiltros] = useState(false);
    const [orderBy, setOrderBy] = useState<any>(null);

    const [columns, modifyColumnAtt, savedValues, modifySavedFilters] = useColumnMapper(dataType);
    var events = {
        insert: () => {
            context.form.statusCadastrar();
        },
        update: (item: any) => {
            context.form.statusAlterar(item);
        },
        delete: (item: any) => {
            context.form.excluir(item);
        },
        page: (pagina: any) => {
            context.busca.buscarTodos({ pagina: pagina });
        },
        filter: (value: any) => {
            context.busca.buscarTodos({ termoBusca: value });
        },
    };
    const [filtersVisibles, setFiltersVisibles] = useState(
        Object.keys(columns).filter(
            (value) => columns[value].filtered !== undefined && columns[value].filtered === true && columns[value].filterVisible !== undefined && columns[value].filterVisible === true
        )
    );

    useState(() => {
        initialOrderBy();
        refreshFiltersVisibles();
    });

    function refreshFiltersVisibles() {
        setFiltersVisibles([
            ...Object.keys(columns).filter(
                (value) => columns[value].filtered !== undefined && columns[value].filtered === true && columns[value].filterVisible !== undefined && columns[value].filterVisible === true
            ),
        ]);
    }

    function adicionarFiltro(columnName: any) {
        modifyColumnAtt(columnName, "filterVisible", true);
        setAbrirMenuFiltros(false);
        refreshFiltersVisibles();
    }

    function limparFiltros() {
        filtersVisibles.map((value, index) => {
            removerFiltro(value);
            return value;
        })
    }

    function removerFiltro(columnName: any) {
        modifyColumnAtt(columnName, "filterVisible", false);
        refreshFiltersVisibles();
    }

    function initialOrderBy() {
        if (savedValues !== undefined && savedValues !== null && savedValues.orderBy !== undefined) {
            setOrderBy({
                orderBy: savedValues.orderBy,
                orderByDirection: savedValues.orderByDirection,
            });
            return;
        }
        var fieldsWithOrderBy = Object.keys(columns).filter((e) => columns[e].order !== undefined);
        var start: any = fieldsWithOrderBy.filter((e) => columns[e].startOrder !== undefined && columns[e].startOrder === true);
        var finishOrderBy: any = null;
        if (start.length === 0) {
            if (fieldsWithOrderBy.length > 0) {
                finishOrderBy = {
                    orderBy: columns[fieldsWithOrderBy[0]].order,
                    orderByDirection: "asc",
                };
            } else {
                return;
            }
        } else {
            finishOrderBy = {
                orderBy: columns[start[0]].order,
                orderByDirection: "asc",
            };
        }
        setOrderBy(finishOrderBy);
    }

    function columnStyles(dadosLinha: any) {
        var st = columns[dadosLinha].align !== undefined ? " align " + columns[dadosLinha].align : "";
        st += " coluna" + ConvertUtils.firstUpperCase(dadosLinha) + " ";
        st += columns[dadosLinha].titleColumn !== undefined && columns[dadosLinha].titleColumn === true ? " titleColumn " : "";
        return st;
    }

    function valueModifier(linha: any, dadosLinha: any) {
        var value = linha[dadosLinha];
        if (columns[dadosLinha].getValue !== undefined) {
            value = columns[dadosLinha].getValue(linha);
        }
        if (value === undefined || value === null) {
            return "Não informado";
        }
        if (columns[dadosLinha].money !== undefined) {
            return ConvertUtils.moneyFormat(value);
        }
        if (columns[dadosLinha].convert !== undefined) {
            return ConvertUtils.listOnText(columns[dadosLinha].convert, value);
        }
        return value;
    }

    function imprimir() {
        window.print();
    }

    function mostrarFormularioAlterar(value: any) {
        if (events !== null && events.update !== undefined && events.update !== null) {
            setSelecionado(null);
            events.update(value);
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
        setSelecionado(null);
        var values: any = {};
        Object.keys(columns)
            .filter((value) => columns[value].filtered !== undefined && columns[value].filtered === true)
            .map((value: any) => {
                var component: any = document.getElementById("filtro_" + value);
                values[value] = component === undefined || component === null ? "" : component.value;
                if (columns[value].date !== undefined && columns[value].date === true && values[value] !== "") {
                    values[value] = values[value].replace("/", "").replace("/", "");
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

    function EventoMostrarColuna(columnName: any) {
        modifyColumnAtt(columnName, "visible", true);
    }

    function EventoRemoverColuna(columnName: any) {
        modifyColumnAtt(columnName, "visible", false);
    }

    function mouseOver(value: any) {
        if (context.busca.lista.content.length > 0) {
            var st = document.getElementsByClassName("colunaEstiloInterno" + value);
            for (var i = 0; i < st.length; i++) {
                var item = st.item(i);
                if (item !== null) {
                    item.classList.add("columnActive");
                }
            }
        }
    }

    function mouseOut(value: any) {
        var st = document.getElementsByClassName("colunaEstiloInterno" + value);
        for (var i = 0; i < st.length; i++) {
            var item = st.item(i);
            if (item !== null) {
                item.classList.remove("columnActive");
            }
        }
    }

    function defaultValue(field: any) {
        var column: any = columns[field];
        var defaultValue: any = column.defaultFilterValue;

        var val: any = null;
        if (savedValues[field] !== undefined && savedValues[field] !== null && savedValues[field] !== "") {
            if (column.date !== undefined && column.date === true) {
                val = savedValues[field].substr(0, 2) + "/" + savedValues[field].substr(2, 2) + "/" + savedValues[field].substr(4, 4);
            } else {
                val = savedValues[field];
            }
        } else if (defaultValue !== undefined) {
            val = defaultValue;
        }
        if (column.date !== undefined && column.date === true) {
            return DateUtils.stringToDate(val);
        }
        return val === null ? "" : val;
    }

    function eventoCadastrar() {
        events.insert();
        setSelecionado(null);
        setAbrirMenuColunas(false);
        setAbrirMenuFiltros(false);
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
            var dir = "asc";
            if (orderBy !== null && orderBy.orderBy === columns[field].order) {
                dir = orderBy.orderByDirection === "asc" ? "desc" : "asc";
            }
            setOrderBy({ orderBy: campo, orderByDirection: dir });

            filtrar({ orderBy: campo, orderByDirection: dir });
        }
    }

    function orderByIcon(field: any) {
        return (
            orderBy !== null &&
            columns[field].order !== undefined &&
            orderBy.orderBy === columns[field].order && (
                <ButtonStyled className={"link orderBy " + orderBy.orderByDirection}>
                    <FontAwesomeIcon icon={solid("angle-down")} />
                </ButtonStyled>
            )
        );
    }

    function montaTextoPerguntaExclusao() {
        var registro = context.busca.lista.content.find((value: any) => value.id === perguntaExclusao);
        var aux = textoPerguntaExclusao;
        Object.keys(columns).map((column: any) => {
            aux = aux.replace("@#" + column + "@#", registro[column]);
        });
        return aux;
    }

    function eventoExcluir() {
        var registro = context.busca.lista.content.find((value: any) => value.id === perguntaExclusao);
        events.delete(registro);
        setPerguntaExclusao(null);
    }

    function validarTamanhoPagina() {
        var tamPag = ValueUtils.elementById("tamanhoPagina").value;
        context.busca.setTamanhoPagina(parseInt(tamPag));
    }

    return (
        <ListaComponentStyle>
            <div className="comandos">
                <ButtonStyled className="primary" id="botaoCadastrar" onClick={eventoCadastrar} icon={solid("plus-circle")}>
                    Cadastrar
                </ButtonStyled>
                <ButtonStyled onClick={eventoAbrirMenuColunas} icon={solid("columns")}>
                    Colunas
                </ButtonStyled>
                <ButtonStyled onClick={eventoAbrirMenuFiltros} icon={solid("filter")}>
                    Filtros
                </ButtonStyled>
                <div className="espacador"></div>
                <ButtonStyled className="primary" onClick={() => filtrar()} loading={context.busca.buscando} icon={solid("search")}>
                    Buscar
                </ButtonStyled>
            </div>
            {abrirMenuColunas === true && (
                <div className="colunas">
                    <div className="title">Colunas Visiveis</div>
                    {Object.keys(columns)
                        .filter((value) => columns[value].visible === undefined || columns[value].visible === true)
                        .map((value: any, index: number) => {
                            return (
                                <ButtonStyled key={index} className="link showing" onClick={() => EventoRemoverColuna(value)}>
                                    {columns[value].icon !== undefined && columns[value].icon} {columns[value].name}
                                </ButtonStyled>
                            );
                        })}
                    {Object.keys(columns).filter((value) => !(columns[value].visible === undefined || columns[value].visible === true)).length > 0 && <div className="title">Disponíveis</div>}
                    {Object.keys(columns)
                        .filter((value) => !(columns[value].visible === undefined || columns[value].visible === true))
                        .sort((a, b) => columns[a].name.localeCompare(columns[b].name))
                        .map((value, index) => {
                            return (
                                <ButtonStyled key={index} className="link" onClick={() => EventoMostrarColuna(value)}>
                                    {columns[value].icon !== undefined && columns[value].icon} {columns[value].name}
                                </ButtonStyled>
                            );
                        })}
                </div>
            )}
            {abrirMenuFiltros === true && (
                <div className="filtros">
                    <div className="title">Filtros Disponíveis</div>
                    {Object.keys(columns)
                        .filter(
                            (value) =>
                                columns[value].filtered !== undefined && columns[value].filtered === true && (columns[value].filterVisible === undefined || columns[value].filterVisible === false)
                        )
                        .sort((a, b) => columns[a].name.localeCompare(columns[b].name))
                        .map((value, index) => {
                            return (
                                <ButtonStyled key={index} className="link showing" onClick={() => adicionarFiltro(value)}>
                                    {columns[value].icon !== undefined ? columns[value].icon : <></>} {columns[value].name}
                                </ButtonStyled>
                            );
                        })}
                </div>
            )}
            <div className="tabelaEFiltros">
                <div className="tabela">
                    <div className="cabecalho">
                        {Object.keys(columns)
                            .filter((value) => columns[value].visible === undefined || columns[value].visible === true)
                            .map((value: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        onMouseOver={(x) => mouseOver(value)}
                                        onMouseOut={(x) => mouseOut(value)}
                                        onClick={() => changeOrderBy(value)}
                                        className={"coluna colunaEstiloInterno" + value + " " + columnStyles(value) + " " + value}
                                        style={columns[value].width ? { minWidth: columns[value].width, maxWidth: columns[value].width } : {}}
                                    >
                                        <div>
                                            {columns[value].icon !== undefined && columns[value].icon} {columns[value].name} {orderByIcon(value)}
                                        </div>
                                    </div>
                                );
                            })}
                        <div className="espacoScroll"></div>
                    </div>
                    <div className="linhas">
                        {context.busca.lista.content.map((linha: any, idx: number) => {
                            return (
                                <div key={idx} className={"linha " + (selecionado !== null && selecionado.id === linha.id ? "selecionado" : "")}>
                                    <div className="linhaInterna">
                                        {Object.keys(columns)
                                            .filter((dadosLinha) => dadosLinha !== "requestData" && (columns[dadosLinha].visible === undefined || columns[dadosLinha].visible === true))
                                            .map((dadosLinha: any, indexLinha: number) => {
                                                return (
                                                    <div
                                                        key={indexLinha}
                                                        className={"coluna colunaEstiloInterno" + dadosLinha + " " + columnStyles(dadosLinha) + " " + dadosLinha}
                                                        onClick={() => setSelecionado(linha)}
                                                        style={columns[dadosLinha].width ? { minWidth: columns[dadosLinha].width, maxWidth: columns[dadosLinha].width } : {}}
                                                    >
                                                        <div>{valueModifier(linha, dadosLinha)}</div>
                                                    </div>
                                                );
                                            })}
                                        <div className="coluna comandoslinha">
                                            <div>
                                                <ButtonStyled className="link" title="Imprimir" onClick={() => imprimir()} icon={solid("print")} />
                                                <ButtonStyled
                                                    className="link"
                                                    title="Alterar"
                                                    onClick={() => mostrarFormularioAlterar(linha.requestData !== undefined ? linha.requestData : linha)}
                                                    icon={solid("pencil-alt")}
                                                />
                                                <ButtonStyled className="link" title="Excluir" onClick={() => setPerguntaExclusao(linha.id)} icon={solid("trash")} />
                                                <ButtonStyled
                                                    title="Esconder detalhes"
                                                    className={"botaoSelecionar link " + (selecionado !== null && selecionado.id === linha.id ? "selecionado" : "")}
                                                    onClick={() => setSelecionado(null)}
                                                    icon={solid("plus")}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {detailMapper !== null && selecionado !== null && selecionado.id === linha.id && (
                                        <div className="detalhes">
                                            {Object.keys(detailMapper)
                                                .filter((value) => detailMapper[value].title !== undefined || detailMapper[value].fields !== undefined)
                                                .map((detField: any, idx1: any) => {
                                                    if (detailMapper[detField] === null) {
                                                        return <div className="campo"></div>;
                                                    } else if (detailMapper[detField].title !== undefined) {
                                                        return <Separador titulo={detailMapper[detField].title} key={idx1} />;
                                                    } else {
                                                        return (
                                                            <div key={idx1} className="linhaDetalhe">
                                                                {detailMapper[detField].fields.map((field: any, idx2: any) => {
                                                                    if (field !== "" && field !== null) {
                                                                        return (
                                                                            <TextField
                                                                                key={idx2}
                                                                                readonlyIcon={columns[field].icon !== undefined ? columns[field].icon : ""}
                                                                                readonly={true}
                                                                                label={columns[field].nameDesc !== undefined ? columns[field].nameDesc : columns[field].name}
                                                                                defaultValue={valueModifier(linha, field)}
                                                                            />
                                                                        );
                                                                    } else {
                                                                        return <div key={idx2} className="campo"></div>;
                                                                    }
                                                                })}
                                                            </div>
                                                        );
                                                    }
                                                })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {context.busca.lista.content.length === 0 ? <div className="linhaVazia">Nenhum registro encontrado</div> : <></>}
                    </div>
                    <div className="rodape">
                        <div className="controleTamanhoPagina">
                            <div>
                                <div className="labelTamanhoPagina">Tamanho da Página</div>
                                <ButtonOptions
                                    fieldID="tamanhoPagina"
                                    nullableOption={false}
                                    defaultValue={context.busca.tamanhoPagina}
                                    validate={validarTamanhoPagina}
                                    list={{
                                        10: 10,
                                        20: 20,
                                        30: 30,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="espacamento"></div>
                        <div className="controleDePagina">
                            <div>
                                <ButtonStyled className="transparent" disabled={context.busca.pageInfo.atual === 0} onClick={() => buscarPagina(0)} icon={solid("fast-backward")} />
                                <ButtonStyled
                                    className="transparent"
                                    disabled={context.busca.pageInfo.atual === 0}
                                    onClick={() => buscarPagina(context.busca.pageInfo.atual - 1)}
                                    icon={solid("backward")}
                                />
                                <div className="descricaoPagina">
                                    Página {context.busca.pageInfo.atual + 1} de {context.busca.pageInfo.total}
                                </div>
                                <ButtonStyled
                                    className="transparent"
                                    disabled={context.busca.pageInfo.atual + 1 === context.busca.pageInfo.total || context.busca.pageInfo.total === 0}
                                    onClick={() => buscarPagina(context.busca.pageInfo.atual + 1)}
                                    icon={solid("forward")}
                                />
                                <ButtonStyled
                                    className="transparent"
                                    disabled={context.busca.pageInfo.atual + 1 === context.busca.pageInfo.total || context.busca.pageInfo.total === 0}
                                    onClick={() => buscarPagina(context.busca.pageInfo.total - 1)}
                                    icon={solid("fast-forward")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {filtersVisibles.length > 0 && (
                    <div className="filtrosVisiveis">
                        <div className="title">Filtros</div>
                        {filtersVisibles.map((value: any, index: number) => {
                            if (columns[value].convert !== undefined) {
                                if (Object.keys(columns[value].convert).length <= 4) {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)} icon={solid("plus")}></ButtonStyled>
                                            <ButtonOptions
                                                fieldID={"filtro_" + value}
                                                label={columns[value].name}
                                                list={columns[value].convert}
                                                defaultValue={defaultValue(value)}
                                                nullableOption={true}
                                                nullableOptionText="Todos"
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)} icon={solid("plus")}></ButtonStyled>
                                            <SelectField fieldID={"filtro_" + value} label={columns[value].name} list={columns[value].convert} defaultValue={defaultValue(value)} />
                                        </div>
                                    );
                                }
                            } else {
                                if (columns[value].date !== undefined && columns[value].date === true) {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)} icon={solid("plus")}></ButtonStyled>
                                            <Calendar title={columns[value].name} fieldID={"filtro_" + value} value={defaultValue(value)} />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)} icon={solid("plus")}></ButtonStyled>
                                            <TextField fieldID={"filtro_" + value} label={columns[value].name} defaultValue={defaultValue(value)} />
                                        </div>
                                    );
                                }
                            }
                        })}
                        <div className="espacamento"></div>
                        <ButtonStyled onClick={limparFiltros}>Limpar Filtros</ButtonStyled>
                    </div>
                )}
            </div>

            {perguntaExclusao !== null && (
                <ChoiceMessage
                    title="Exclusão de Registro"
                    text={montaTextoPerguntaExclusao()}
                    choices={[
                        { name: "Sim", command: () => eventoExcluir() },
                        {
                            name: "Não, cancelar!",
                            command: () => setPerguntaExclusao(null),
                        },
                    ]}
                />
            )}
        </ListaComponentStyle>
    );

    return (
        <ListaComponentStyle>
            <>
                {abrirMenuColunas === true && (
                    <div className="opcoesColunas">
                        <div className="title">Colunas Visiveis</div>
                        {Object.keys(columns)
                            .filter((value) => columns[value].visible === undefined || columns[value].visible === true)
                            .map((value: any, index: number) => {
                                return (
                                    <ButtonStyled key={index} className="link showing" onClick={() => EventoRemoverColuna(value)}>
                                        {columns[value].icon !== undefined && columns[value].icon} {columns[value].name}
                                    </ButtonStyled>
                                );
                            })}
                        {Object.keys(columns).filter((value) => !(columns[value].visible === undefined || columns[value].visible === true)).length > 0 && <div className="title">Disponíveis</div>}
                        {Object.keys(columns)
                            .filter((value) => !(columns[value].visible === undefined || columns[value].visible === true))
                            .sort((a, b) => columns[a].name.localeCompare(columns[b].name))
                            .map((value, index) => {
                                return (
                                    <ButtonStyled key={index} className="link" onClick={() => EventoMostrarColuna(value)}>
                                        {columns[value].icon !== undefined && columns[value].icon} {columns[value].name}
                                    </ButtonStyled>
                                );
                            })}
                    </div>
                )}
                {abrirMenuFiltros === true && (
                    <div className="opcoesColunas">
                        <div className="title">Filtros Disponíveis</div>
                        {Object.keys(columns)
                            .filter(
                                (value) =>
                                    columns[value].filtered !== undefined && columns[value].filtered === true && (columns[value].filterVisible === undefined || columns[value].filterVisible === false)
                            )
                            .sort((a, b) => columns[a].name.localeCompare(columns[b].name))
                            .map((value, index) => {
                                return (
                                    <ButtonStyled key={index} className="link showing" onClick={() => adicionarFiltro(value)}>
                                        {columns[value].icon !== undefined ? columns[value].icon : <></>} {columns[value].name}
                                    </ButtonStyled>
                                );
                            })}
                    </div>
                )}
                {filtersVisibles.length > 0 && (
                    <div className="linhaFiltro">
                        {filtersVisibles.map((value: any, index: number) => {
                            if (columns[value].convert !== undefined) {
                                if (Object.keys(columns[value].convert).length <= 4) {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)} icon={solid("plus")}></ButtonStyled>
                                            <ButtonOptions
                                                fieldID={"filtro_" + value}
                                                label={columns[value].name}
                                                list={columns[value].convert}
                                                defaultValue={defaultValue(value)}
                                                nullableOption={true}
                                                nullableOptionText="Todos"
                                            />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)} icon={solid("plus")}></ButtonStyled>
                                            <SelectField fieldID={"filtro_" + value} label={columns[value].name} list={columns[value].convert} defaultValue={defaultValue(value)} />
                                        </div>
                                    );
                                }
                            } else {
                                if (columns[value].date !== undefined && columns[value].date === true) {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)} icon={solid("plus")}></ButtonStyled>
                                            <Calendar title={columns[value].name} fieldID={"filtro_" + value} value={defaultValue(value)} />
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className="filtro">
                                            <ButtonStyled className="link" onClick={() => removerFiltro(value)} icon={solid("plus")}></ButtonStyled>
                                            <TextField fieldID={"filtro_" + value} label={columns[value].name} defaultValue={defaultValue(value)} />
                                        </div>
                                    );
                                }
                            }
                        })}
                    </div>
                )}
            </>
            <div className="filtrosEComandos">
                <div className="comandos">
                    <ButtonStyled className="primary" id="botaoCadastrar" onClick={eventoCadastrar} icon={solid("plus-circle")}>
                        Cadastrar
                    </ButtonStyled>
                    <ButtonStyled onClick={eventoAbrirMenuColunas} icon={solid("columns")}>
                        Colunas
                    </ButtonStyled>
                    <ButtonStyled onClick={eventoAbrirMenuFiltros} icon={solid("filter")}>
                        Filtros
                    </ButtonStyled>
                    <ButtonStyled className="primary" onClick={() => filtrar()} loading={context.busca.buscando} icon={solid("search")}>
                        Buscar
                    </ButtonStyled>
                </div>
            </div>
            <div className="tabelaPrincipal">
                <div className="cabecalho">
                    {Object.keys(columns)
                        .filter((value) => columns[value].visible === undefined || columns[value].visible === true)
                        .map((value: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    onMouseOver={(x) => mouseOver(value)}
                                    onMouseOut={(x) => mouseOut(value)}
                                    onClick={() => changeOrderBy(value)}
                                    className={"coluna colunaEstiloInterno" + value + " " + columnStyles(value) + " " + value}
                                    style={columns[value].width ? { minWidth: columns[value].width, maxWidth: columns[value].width } : {}}
                                >
                                    {columns[value].icon !== undefined && columns[value].icon} {columns[value].name} {orderByIcon(value)}
                                </div>
                            );
                        })}
                </div>
                <div className="todasAsLinhas">
                    {context.busca.lista.content.map((linha: any, idx: number) => {
                        return (
                            <div key={idx} className={"linha " + (selecionado !== null && selecionado.id === linha.id ? "selecionado" : "")}>
                                <div className="linhaInterna">
                                    {Object.keys(columns)
                                        .filter((dadosLinha) => dadosLinha !== "requestData" && (columns[dadosLinha].visible === undefined || columns[dadosLinha].visible === true))
                                        .map((dadosLinha: any, indexLinha: number) => {
                                            return (
                                                <div
                                                    key={indexLinha}
                                                    className={"coluna colunaEstiloInterno" + dadosLinha + " " + columnStyles(dadosLinha) + " " + dadosLinha}
                                                    onClick={() => setSelecionado(linha)}
                                                    style={columns[dadosLinha].width ? { minWidth: columns[dadosLinha].width, maxWidth: columns[dadosLinha].width } : {}}
                                                >
                                                    {valueModifier(linha, dadosLinha)}
                                                </div>
                                            );
                                        })}

                                    <div className="coluna comandoslinha">
                                        <div className="opcoesRegistro">
                                            <ButtonStyled title="Imprimir" onClick={() => imprimir()} icon={solid("print")} />
                                            <ButtonStyled
                                                title="Alterar"
                                                onClick={() => mostrarFormularioAlterar(linha.requestData !== undefined ? linha.requestData : linha)}
                                                icon={solid("pencil-alt")}
                                            />
                                            <ButtonStyled title="Excluir" onClick={() => setPerguntaExclusao(linha.id)} icon={solid("trash")} />
                                            <ButtonStyled
                                                title="Esconder detalhes"
                                                className={"botaoSelecionar link " + (selecionado !== null && selecionado.id === linha.id ? "selecionado" : "")}
                                                onClick={() => setSelecionado(null)}
                                                icon={solid("plus")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {detailMapper !== null && selecionado !== null && selecionado.id === linha.id && (
                                    <div className="detalhes">
                                        {Object.keys(detailMapper)
                                            .filter((value) => detailMapper[value].title !== undefined || detailMapper[value].fields !== undefined)
                                            .map((detField: any, idx1: any) => {
                                                if (detailMapper[detField] === null) {
                                                    return <div className="campo"></div>;
                                                } else if (detailMapper[detField].title !== undefined) {
                                                    return <Separador titulo={detailMapper[detField].title} key={idx1} />;
                                                } else {
                                                    return (
                                                        <div key={idx1} className="linhaDetalhe">
                                                            {detailMapper[detField].fields.map((field: any, idx2: any) => {
                                                                if (field !== "" && field !== null) {
                                                                    return (
                                                                        <TextField
                                                                            key={idx2}
                                                                            readonlyIcon={columns[field].icon !== undefined ? columns[field].icon : ""}
                                                                            readonly={true}
                                                                            label={columns[field].nameDesc !== undefined ? columns[field].nameDesc : columns[field].name}
                                                                            defaultValue={valueModifier(linha, field)}
                                                                        />
                                                                    );
                                                                } else {
                                                                    return <div key={idx2} className="campo"></div>;
                                                                }
                                                            })}
                                                        </div>
                                                    );
                                                }
                                            })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    {context.busca.lista.content.length === 0 ? (
                        <div>
                            <div className="linha empty">
                                <div className="linhaInterna">
                                    <div className="coluna">Nenhum registro encontrado</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {context.busca.pageInfo !== null && (
                    <div className="rodape">
                        <div className="labelTamanhoPagina">Tamanho da Página</div>
                        <ButtonOptions
                            fieldID="tamanhoPagina"
                            nullableOption={false}
                            defaultValue={context.busca.tamanhoPagina}
                            validate={validarTamanhoPagina}
                            list={{
                                10: 10,
                                20: 20,
                                30: 30,
                            }}
                        />
                        <div className="espacamento"></div>
                        <div className="controleDePagina">
                            <ButtonStyled className="transparent" disabled={context.busca.pageInfo.atual === 0} onClick={() => buscarPagina(0)} icon={solid("fast-backward")} />
                            <ButtonStyled
                                className="transparent"
                                disabled={context.busca.pageInfo.atual === 0}
                                onClick={() => buscarPagina(context.busca.pageInfo.atual - 1)}
                                icon={solid("backward")}
                            />
                            <div className="descricaoPagina">
                                Página {context.busca.pageInfo.atual + 1} de {context.busca.pageInfo.total}
                            </div>
                            <ButtonStyled
                                className="transparent"
                                disabled={context.busca.pageInfo.atual + 1 === context.busca.pageInfo.total || context.busca.pageInfo.total === 0}
                                onClick={() => buscarPagina(context.busca.pageInfo.atual + 1)}
                                icon={solid("forward")}
                            />
                            <ButtonStyled
                                className="transparent"
                                disabled={context.busca.pageInfo.atual + 1 === context.busca.pageInfo.total || context.busca.pageInfo.total === 0}
                                onClick={() => buscarPagina(context.busca.pageInfo.total - 1)}
                                icon={solid("fast-forward")}
                            />
                        </div>
                    </div>
                )}
            </div>
        </ListaComponentStyle>
    );
}
