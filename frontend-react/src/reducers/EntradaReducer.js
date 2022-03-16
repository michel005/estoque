import EntradaAction from "../actions/EntradaAction";
import API from "../API";
import EntradaActionTypes from "../constants/EntradaActionTypes";
import store from "../store";
import DateUtils from "../utils/DateUtils";

export default function EntradaReducer(state, action) {

    function montarUrlBusca(pagina, tamanho, dataEntrada) {
        if (dataEntrada === undefined || dataEntrada === null) {
            dataEntrada = state.entrada.currentDate;
        }
        return '/evento/entrada/buscaPorDataEntrada?pagina=' + pagina + '&tamanho=' + tamanho + '&dataEntrada=' + DateUtils.stringJustDate(DateUtils.justDate(dataEntrada)).replace('/', '').replace('/', '');
    }

    function buscarItens() {
        API.get('/item/buscarTodos').then((response) => {
            var itens = [];
            var valores = Object.keys(response.data);
            valores.map((value) => {
                itens.push(response.data[value].nome);
            });
            store.dispatch(EntradaAction.preencherListaItens(itens));
        });
    }

    if (action.type === EntradaActionTypes.PREENCHE_CURRENT_ENTRADA) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                status: action.payload.status,
                currentEntrada: action.payload.entrada
            }
        });
    } else
    if (action.type === EntradaActionTypes.FUNCTION_DEFINE_DATA_ENTRADA_CALENDAR) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                functionDataEntradaCalendar: action.payload
            }
        });
    } else
    if (action.type === EntradaActionTypes.STATUS_CADASTRAR) {
        buscarItens();
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                status: EntradaActionTypes.STATUS_CADASTRAR,
                error: null,
                currentEntrada: { 
                    eventoEntrada: { 
                        id: null, 
                        descricao: 'Nova Entrada de Itens' 
                    }, 
                    itens: [] 
                }
            }
        });
    } else
    if (action.type === EntradaActionTypes.STATUS_ALTERAR) {
        buscarItens();
        API.get('/evento/entrada/visualizarAnalitico?id=' + action.payload).then((response) => {
            store.dispatch(EntradaAction.preencheCurrentEntrada({ entrada: response.data, status: EntradaActionTypes.STATUS_ALTERAR }));
        }).catch((error) => {
            store.dispatch(EntradaAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === EntradaActionTypes.STATUS_EXCLUIR) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                status: EntradaActionTypes.STATUS_EXCLUIR,
                error: null,
                currentEntrada: action.payload
            }
        });
    } else
    if (action.type === EntradaActionTypes.STATUS_OCIOSO) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                status: EntradaActionTypes.STATUS_OCIOSO,
                error: null,
                currentEntrada: null
            }
        });
    } else
    if (action.type === EntradaActionTypes.CADASTRAR) {
        API.post('/evento/entrada/cadastrarModelo', action.payload).then((response) => {
            state.entrada.functionDataEntradaCalendar(DateUtils.stringToDateTime(response.data.eventoEntrada.dataEntrada));
            store.dispatch(EntradaAction.atualizarData(DateUtils.stringToDateTime(response.data.eventoEntrada.dataEntrada)));
        }).catch((error) => {
            store.dispatch(EntradaAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === EntradaActionTypes.ALTERAR) {
        API.post('/evento/entrada/alterar?id=' + action.payload.id, action.payload).then(() => {
            store.dispatch(EntradaAction.buscarTodos());
        }).catch((error) => {
            store.dispatch(EntradaAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === EntradaActionTypes.EXCLUIR) {
        API.post('/evento/entrada/excluir?id=' + action.payload.id).then(() => {
            store.dispatch(EntradaAction.buscarTodos());
        }).catch((error) => {
            store.dispatch(EntradaAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === EntradaActionTypes.ATUALIZAR_DATA) {
        state.entrada.currentDate = action.payload;
        if (state.entrada.currentDate === null) {
            return Object.assign({}, state, {
                entrada: {
                    ...state.entrada,
                    list: [],
                    page: 0
                }
            });
        } else {
            var page = (state.entrada.page === null || state.entrada.page === undefined) ? 0 : state.entrada.page;
            API.get(montarUrlBusca(page, state.entrada.size, state.entrada.currentDate)).then((response) => {
                var x = 1;
                var pages = [];
                while (x <= response.data.totalPages) {
                    pages.push({ page: x })
                    x++;
                }
                store.dispatch(EntradaAction.preencherConsulta({ result: response.data.content, pageInfo: pages, page: page }));
            });
        }
    } else
    if (action.type === EntradaActionTypes.BUSCAR_TODOS) {
        API.get(montarUrlBusca(0, state.entrada.size, action.payload)).then((response) => {
            var x = 1;
            var pages = [];
            while (x <= response.data.totalPages) {
                pages.push({ page: x })
                x++;
            }
            store.dispatch(EntradaAction.preencherConsulta({ result: response.data.content, pageInfo: pages, page: 0 }));
        });
    } else
    if (action.type === EntradaActionTypes.BUSCAR_PAGINA) {
        API.get(montarUrlBusca(action.payload.pagina, state.entrada.size, state.entrada.currentDate)).then((response) => {
            store.dispatch(EntradaAction.preencherConsulta({ result: response.data.content, pageInfo: state.entrada.pageInfo, page: action.payload.pagina }));
        });
    } else
    if (action.type === EntradaActionTypes.PREENCHER_CONSULTA) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                status: EntradaActionTypes.STATUS_OCIOSO,
                list: action.payload.result,
                page: action.payload.page,
                pageInfo: action.payload.pageInfo
            }
        });
    } else
    if (action.type === EntradaActionTypes.PREENCHER_LISTA_ITENS) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                itemList: action.payload,
            }
        });
    } else
    if (action.type === EntradaActionTypes.ADICIONA_ITEM_CURRENT_ENTRADA) {
        var itemEncontrado = false;
        var valores = state.entrada.currentEntrada.itens;
        console.log(valores);
        valores.map((value) => {
            console.log(value.nome);
            console.log(action.payload.nome);
            if (value.nomeItem === action.payload.nomeItem) {
                value.quantidade = parseInt(value.quantidade) + parseInt(action.payload.quantidade);
                itemEncontrado = true;
            }
        });
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                currentEntrada: {
                    ...state.entrada.currentEntrada,
                    itens: (itemEncontrado === true ? valores : state.entrada.currentEntrada.itens.concat(action.payload))
                }
            }
        });
    } else
    if (action.type === EntradaActionTypes.REMOVE_ITEM_CURRENT_ENTRADA) {
        var itemEncontrado = null;
        state.entrada.currentEntrada.itens.map((value, index) => {
            if (value.nome === action.payload) {
                itemEncontrado = index;
            }
        });
        if (itemEncontrado !== null) {
            var valores = state.entrada.currentEntrada.itens;
            valores.splice(itemEncontrado, 1);
            return Object.assign({}, state, {
                entrada: {
                    ...state.entrada,
                    currentEntrada: {
                        ...state.entrada.currentEntrada,
                        itens: valores
                    }
                }
            });
        }
    } else
    if (action.type === EntradaActionTypes.MOSTRAR_ERRO) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                error: action.payload[Object.keys(action.payload)[0]]
            }
        });
    } else
    if (action.type === EntradaActionTypes.RESETAR_ERRO) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                error: null
            }
        });
    }
    return state;
}