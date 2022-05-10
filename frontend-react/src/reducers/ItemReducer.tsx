import ItemAction from "../actions/ItemAction";
import API from "../API";
import ItemActionTypes from "../constants/ItemActionTypes";
import store from "../store";

function buscarCategorias() {
    API.get('/item/buscaCategorias').then((response) => {
        store.dispatch(ItemAction.preencherCategorias(response.data));
    }).catch((error) => {
        store.dispatch(ItemAction.mostrarErro(error.response.data));
    });
}

export default function ItemReducer(state: any, action: any) {
    if (action.type === ItemActionTypes.STATUS_CADASTRAR) {
        buscarCategorias();
        return Object.assign({}, state, {
            item: {
                ...state.item,
                status: ItemActionTypes.STATUS_CADASTRAR,
                error: null,
                currentItem: { id: null, nome: 'Novo Item' }
            },
            pagina: {
                atual: 'novoItem'
            }
        });
    } else
    if (action.type === ItemActionTypes.STATUS_ALTERAR) {
        buscarCategorias();
        return Object.assign({}, state, {
            item: {
                ...state.item,
                status: ItemActionTypes.STATUS_ALTERAR,
                error: null,
                currentItem: action.payload
            },
            pagina: {
                atual: 'novoItem'
            }
        });
    } else
    if (action.type === ItemActionTypes.STATUS_EXCLUIR) {
        return Object.assign({}, state, {
            item: {
                ...state.item,
                status: ItemActionTypes.STATUS_EXCLUIR,
                error: null,
                currentItem: action.payload
            },
            pagina: {
                atual: 'novoItem'
            }
        });
    } else
    if (action.type === ItemActionTypes.STATUS_OCIOSO) {
        return Object.assign({}, state, {
            item: {
                ...state.item,
                status: ItemActionTypes.STATUS_OCIOSO,
                error: null,
                currentItem: null
            },
            pagina: {
                atual: 'inicio'
            }
        });
    } else
    if (action.type === ItemActionTypes.CADASTRAR) {
        API.post('/item/cadastrar', action.payload).then(() => {
            store.dispatch(ItemAction.buscarTodos({pagina: state.item.termo}));
        }).catch((error) => {
            store.dispatch(ItemAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === ItemActionTypes.ALTERAR) {
        API.post('/item/alterar?id=' + action.payload.id, action.payload).then(() => {
            store.dispatch(ItemAction.buscarPagina({pagina: state.item.page}));
        }).catch((error) => {
            store.dispatch(ItemAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === ItemActionTypes.EXCLUIR) {
        API.post('/item/excluir?id=' + action.payload.id).then(() => {
            store.dispatch(ItemAction.buscarTodos({pagina: state.item.termo}));
        }).catch((error) => {
            store.dispatch(ItemAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === ItemActionTypes.PREENCHER_TAMANHO_PAGINA) {
        return Object.assign({}, state, {
            item: {
                ...state.item,
                size: action.payload
            }
        });
    } else
    if (action.type === ItemActionTypes.BUSCAR_TODOS) {
        buscarCategorias();
        API.post('/item/buscaTudoComQuantidade?pagina=0&tamanho=' + state.item.size, action.payload).then((response) => {
            var x: any = 1;
            var pages: any = [];
            while (x <= response.data.totalPages) {
                pages.push({ page: x })
                x++;
            }
            store.dispatch(ItemAction.preencherConsulta({ result: response.data.content, pageInfo: pages, page: 0, termo: action.payload }));
        }).catch((error) => {
            store.dispatch(ItemAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === ItemActionTypes.BUSCAR_PAGINA) {
        buscarCategorias();
        API.post('/item/buscaTudoComQuantidade?pagina=' + action.payload.pagina + '&tamanho=' + state.item.size, state.item.termo).then((response) => {
            var x: any = 1;
            var pages: any = [];
            while (x <= response.data.totalPages) {
                pages.push({ page: x })
                x++;
            }
            store.dispatch(ItemAction.preencherConsulta({ result: response.data.content, pageInfo: pages, page: action.payload.pagina, termo: state.item.termo }));
        }).catch((error) => {
            store.dispatch(ItemAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === ItemActionTypes.PREENCHER_CONSULTA) {
        return Object.assign({}, state, {
            item: {
                ...state.item,
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
    if (action.type === ItemActionTypes.PREENCHER_CATEGORIAS) {
        return Object.assign({}, state, {
            item: {
                ...state.item,
                categorias: action.payload
            }
        });
    } else
    if (action.type === ItemActionTypes.MOSTRAR_ERRO) {
        return Object.assign({}, state, {
            item: {
                ...state.item,
                error: action.payload[Object.keys(action.payload)[0]]
            }
        });
    } else
    if (action.type === ItemActionTypes.RESETAR_ERRO) {
        return Object.assign({}, state, {
            item: {
                ...state.item,
                error: null
            }
        });
    }
    return state;
}