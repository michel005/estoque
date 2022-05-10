import EntradaAction from "../actions/EntradaAction";
import API from "../API";
import EntradaActionTypes from "../constants/EntradaActionTypes";
import store from "../store";

export default function EntradaReducer(state: any, action: any) {

    function montarUrlBusca(pagina: number, tamanho: number) {
        return '/evento/entrada/buscaPorDataEntrada?pagina=' + pagina + '&tamanho=' + tamanho;
    }

    function buscarItens() {
        API.get('/item/buscarTodos').then((response) => {
            var itens : any[] = [];
            var valores = Object.keys(response.data);
            valores.map((value) => {
                itens[response.data[value].nome] = response.data[value].nome;
                return value;
            });
            store.dispatch(EntradaAction.preencherListaItens(itens));
        });
        API.get('/fornecedor/buscarTodos').then((response) => {
            var fornecedores : any[] = [];
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
            store.dispatch(EntradaAction.buscarTodos(state.entrada.termo));
        }).catch((error) => {
            console.log(error);
            store.dispatch(EntradaAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === EntradaActionTypes.ALTERAR) {
        API.post('/evento/entrada/alterarModelo', action.payload).then(() => {
            store.dispatch(EntradaAction.buscarPagina({pagina: state.item.page}));
        }).catch((error) => {
            console.log(error);
            store.dispatch(EntradaAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === EntradaActionTypes.EXCLUIR) {
        API.post('/evento/entrada/excluir?id=' + action.payload).then(() => {
            store.dispatch(EntradaAction.buscarTodos(state.entrada.termo));
        }).catch((error) => {
            console.log(error);
            store.dispatch(EntradaAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === EntradaActionTypes.BUSCAR_TODOS) {
        API.post(montarUrlBusca(0, state.entrada.size), action.payload).then((response) => {
            var x: any = 1;
            var pages: any = [];
            while (x <= response.data.totalPages) {
                pages.push({ page: x })
                x++;
            }
            store.dispatch(EntradaAction.preencherConsulta({ termo: action.payload, result: response.data.content, pageInfo: pages, page: 0 }));
        });
    } else
    if (action.type === EntradaActionTypes.BUSCAR_PAGINA) {
        API.post(montarUrlBusca(action.payload.pagina, state.entrada.size), state.entrada.termo).then((response) => {
            store.dispatch(EntradaAction.preencherConsulta({ termo: state.entrada.termo, result: response.data.content, pageInfo: state.entrada.pageInfo, page: action.payload.pagina }));
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
                termo: action.payload.termo
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
        var itemEncontrado: boolean = false;
        var valores: any = state.entrada.currentEntrada.itens;
        valores.map((value: any) => {
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
                    itens: (itemEncontrado ? valores : state.entrada.currentEntrada.itens.concat(action.payload))
                }
            }
        });
    } else
    if (action.type === EntradaActionTypes.REMOVE_ITEM_CURRENT_ENTRADA) {
        var temItem: any = null;
        var valoresAux: any = state.entrada.currentEntrada.itens;
        valoresAux.map((value: any, index: number) => {
            if (value.nomeItem === action.payload) {
                temItem = index;
            }
            return value;
        });
        if (temItem !== null) {
            valoresAux.splice(temItem, 1);
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