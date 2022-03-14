import ItemAction from "../actions/ItemAction";
import API from "../API";
import ItemActionTypes from "../constants/ItemActionTypes";
import store from "../store";

export default function ItemReducer(state, action) {
    if (action.type === ItemActionTypes.STATUS_CADASTRAR) {
        return Object.assign({}, state, {
            item: {
                ...state.item,
                status: ItemActionTypes.STATUS_CADASTRAR,
                error: null,
                currentItem: { id: null, nome: 'Novo Item' }
            }
        });
    } else
    if (action.type === ItemActionTypes.STATUS_ALTERAR) {
        return Object.assign({}, state, {
            item: {
                ...state.item,
                status: ItemActionTypes.STATUS_ALTERAR,
                error: null,
                currentItem: action.payload
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
            }
        });
    } else
    if (action.type === ItemActionTypes.CADASTRAR) {
        API.post('/item/cadastrar', action.payload).then(() => {
            store.dispatch(ItemAction.buscarTodos({termo: state.item.termo}));
        }).catch((error) => {
            store.dispatch(ItemAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === ItemActionTypes.ALTERAR) {
        API.post('/item/alterar?id=' + action.payload.id, action.payload).then(() => {
            store.dispatch(ItemAction.buscarTodos({termo: state.item.termo}));
        }).catch((error) => {
            store.dispatch(ItemAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === ItemActionTypes.EXCLUIR) {
        API.post('/item/excluir?id=' + action.payload.id).then(() => {
            store.dispatch(ItemAction.buscarTodos({termo: state.item.termo}));
        }).catch((error) => {
            store.dispatch(ItemAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === ItemActionTypes.BUSCAR_TODOS) {
        API.get('/item/buscaPorTermo?pagina=0&tamanho=' + state.item.size + '&termo=' + action.payload.termo).then((response) => {
            store.dispatch(ItemAction.preencherConsulta({ result: response.data, page: 0, termo: action.payload.termo }));
        });
    } else
    if (action.type === ItemActionTypes.BUSCAR_MAIS) {
        API.get('/item/buscaPorTermo?pagina=' + (state.item.page + 1) + '&tamanho=' + state.item.size + '&termo=' + action.payload.termo).then((response) => {
            store.dispatch(ItemAction.preencherConsulta({ result: state.item.list.concat(response.data), page: state.item.page + 1, termo: action.payload.termo }));
        });
    } else
    if (action.type === ItemActionTypes.PREENCHER_CONSULTA) {
        return Object.assign({}, state, {
            item: {
                ...state.item,
                status: ItemActionTypes.STATUS_OCIOSO,
                list: action.payload.result,
                page: action.payload.page,
                termo: action.payload.termo
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