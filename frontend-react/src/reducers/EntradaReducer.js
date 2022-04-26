import EntradaAction from "../actions/EntradaAction";
import API from "../API";
import EntradaActionTypes from "../constants/EntradaActionTypes";
import store from "../store";
import DateUtils from "../utils/DateUtils";

export default function EntradaReducer(state, action) {

    function montarUrlBusca(pagina, tamanho) {
        var dataAtual = state.entrada.dataAtual;
        if (dataAtual !== null) {
            dataAtual = DateUtils.stringJustDate(DateUtils.justDate(dataAtual)).replace('/', '').replace('/', '')
        } else {
            dataAtual = DateUtils.stringJustDate(DateUtils.justDate(new Date())).replace('/', '').replace('/', '')
        }
        return '/evento/entrada/buscaPorDataEntrada?pagina=' + pagina + '&tamanho=' + tamanho + '&dataEntrada=' + dataAtual;
    }

    function buscarItens() {
        API.get('/item/buscarTodos').then((response) => {
            var itens = [];
            var valores = Object.keys(response.data);
            valores.map((value) => {
                itens[response.data[value].nome] = response.data[value].nome;
                return value;
            });
            store.dispatch(EntradaAction.preencherListaItens(itens));
        });
        API.get('/fornecedor/buscarTodos').then((response) => {
            var fornecedores = [];
            var valores = Object.keys(response.data);
            valores.map((value) => {
                fornecedores[response.data[value].id] = response.data[value].nome + ' (' + response.data[value].cpfCnpj + ')';
                return value;
            });
            store.dispatch(EntradaAction.preencherListaFornecedores(fornecedores));
        });
    }

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
                        descricao: 'Nova Entrada de Itens',
                        status: 'PENDENTE',
                        fornecedor: null
                    }, 
                    itens: [] 
                }
            },
            pagina: {
                atual: 'novaEntrada'
            }
        });
    } else
    if (action.type === EntradaActionTypes.STATUS_ALTERAR) {
        buscarItens();
        API.get('/evento/entrada/visualizarAnalitico?id=' + action.payload).then((response) => {
            store.dispatch(EntradaAction.preencherCurrentEntrada({ currentEntrada: response.data, status: EntradaActionTypes.STATUS_ALTERAR }));
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
            },
            pagina: {
                atual: 'novaEntrada'
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
        API.post('/evento/entrada/cadastrarModelo', action.payload).then(() => {
            store.dispatch(EntradaAction.buscarTodos());
        }).catch((error) => {
            store.dispatch(EntradaAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === EntradaActionTypes.ALTERAR) {
        API.post('/evento/entrada/alterarModelo', action.payload).then(() => {
            store.dispatch(EntradaAction.buscarTodos());
        }).catch((error) => {
            store.dispatch(EntradaAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === EntradaActionTypes.EXCLUIR) {
        API.post('/evento/entrada/excluir?id=' + action.payload).then(() => {
            store.dispatch(EntradaAction.buscarTodos());
        }).catch((error) => {
            store.dispatch(EntradaAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === EntradaActionTypes.PREENCHER_DATA_ATUAL) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                dataAtual: action.payload
            }
        });
    } else
    if (action.type === EntradaActionTypes.BUSCAR_TODOS) {
        if (state.entrada.dataAtual === null) {
            return Object.assign({}, state, {
                entrada: {
                    ...state.entrada,
                    list: []
                }
            });
        }
        API.get(montarUrlBusca(0, state.entrada.size)).then((response) => {
            var x = 1;
            var pages = [];
            while (x <= response.data.totalPages) {
                pages.push({ page: x })
                x++;
            }
            store.dispatch(EntradaAction.preencherConsulta({ dataAtual: state.entrada.dataAtual, result: response.data.content, pageInfo: pages, page: 0 }));
        });
    } else
    if (action.type === EntradaActionTypes.BUSCAR_PAGINA) {
        API.get(montarUrlBusca(action.payload.pagina, state.entrada.size)).then((response) => {
            store.dispatch(EntradaAction.preencherConsulta({ dataAtual: state.entrada.dataAtual, result: response.data.content, pageInfo: state.entrada.pageInfo, page: action.payload.pagina }));
        });
    } else
    if (action.type === EntradaActionTypes.PREENCHER_CONSULTA) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                status: EntradaActionTypes.STATUS_OCIOSO,
                list: action.payload.result,
                page: action.payload.page,
                pageInfo: action.payload.pageInfo,
                dataAtual: action.payload.dataAtual
            },
            pagina: {
                atual: 'inicio'
            }
        });
    } else
    if (action.type === EntradaActionTypes.PREENCHER_CURRENT_ENTRADA) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                status: action.payload.status,
                currentEntrada: action.payload.currentEntrada
            },
            pagina: {
                atual: 'novaEntrada'
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
    if (action.type === EntradaActionTypes.PREENCHER_LISTA_FORNECEDORES) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                fornecedoresList: action.payload,
            }
        });
    } else
    if (action.type === EntradaActionTypes.ADICIONA_ITEM_CURRENT_ENTRADA) {
        var itemEncontrado = false;
        var valores = state.entrada.currentEntrada.itens;
        valores.map((value) => {
            if (value.nomeItem === action.payload.nomeItem) {
                value.quantidade = parseInt(value.quantidade) + parseInt(action.payload.quantidade);
                value.valor = (value.valor === null ? 0 : parseFloat(value.valor)) + action.payload.valor;
                itemEncontrado = true;
            }
            return value;
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
        var temItem = null;
        console.log(action.payload);
        var valoresAux = state.entrada.currentEntrada.itens;
        console.log(valoresAux);
        valoresAux.map((value, index) => {
            if (value.nomeItem === action.payload) {
                temItem = index;
            }
            return value;
        });
        console.log(temItem);
        if (temItem !== null) {
            valoresAux.splice(temItem, 1);
            console.log(valoresAux);
            return Object.assign({}, state, {
                entrada: {
                    ...state.entrada,
                    currentEntrada: {
                        ...state.entrada.currentEntrada,
                        itens: valoresAux
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