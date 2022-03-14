import EntradaAction from "../actions/EntradaAction";
import API from "../API";
import EntradaActionTypes from "../constants/EntradaActionTypes";
import store from "../store";

export default function EntradaReducer(state, action) {
    if (action.type === EntradaActionTypes.STATUS_CADASTRAR) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                status: EntradaActionTypes.STATUS_CADASTRAR,
                error: null,
                currentEntrada: { id: null, descricao: 'Nova Entrada de Itens' }
            }
        });
    } else
    if (action.type === EntradaActionTypes.STATUS_ALTERAR) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                status: EntradaActionTypes.STATUS_ALTERAR,
                error: null,
                currentEntrada: action.payload
            }
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
        API.post('/evento/entrada/cadastrar', action.payload).then(() => {
            store.dispatch(EntradaAction.buscarTodos());
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
    if (action.type === EntradaActionTypes.BUSCAR_TODOS) {
        API.get('/evento/entrada/buscaPaginada?pagina=0&tamanho=' + state.entrada.size).then((response) => {
            store.dispatch(EntradaAction.preencherConsulta({ result: response.data, page: 0 }));
        });
    } else
    if (action.type === EntradaActionTypes.BUSCAR_MAIS) {
        API.get('/evento/entrada/buscaPaginada?pagina=' + (state.entrada.page + 1) + '&tamanho=' + state.entrada.size).then((response) => {
            store.dispatch(EntradaAction.preencherConsulta({ result: state.entrada.list.concat(response.data), page: state.entrada.page + 1 }));
        });
    } else
    if (action.type === EntradaActionTypes.PREENCHER_CONSULTA) {
        return Object.assign({}, state, {
            entrada: {
                ...state.entrada,
                status: EntradaActionTypes.STATUS_OCIOSO,
                list: action.payload.result,
                page: action.payload.page
            }
        });
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