import FornecedorAction from "../actions/FornecedorAction";
import API from "../API";
import FornecedorActionTypes from "../constants/FornecedorActionTypes";
import store from "../store";

export default function FornecedorReducer(state, action) {
    if (action.type === FornecedorActionTypes.STATUS_CADASTRAR) {
        return Object.assign({}, state, {
            fornecedor: {
                ...state.fornecedor,
                status: FornecedorActionTypes.STATUS_CADASTRAR,
                error: null,
                currentFornecedor: { id: null, nome: 'Novo Fornecedor' }
            }
        });
    } else
    if (action.type === FornecedorActionTypes.STATUS_ALTERAR) {
        return Object.assign({}, state, {
            fornecedor: {
                ...state.fornecedor,
                status: FornecedorActionTypes.STATUS_ALTERAR,
                error: null,
                currentFornecedor: action.payload
            }
        });
    } else
    if (action.type === FornecedorActionTypes.STATUS_EXCLUIR) {
        return Object.assign({}, state, {
            fornecedor: {
                ...state.fornecedor,
                status: FornecedorActionTypes.STATUS_EXCLUIR,
                error: null,
                currentFornecedor: action.payload
            }
        });
    } else
    if (action.type === FornecedorActionTypes.STATUS_OCIOSO) {
        return Object.assign({}, state, {
            fornecedor: {
                ...state.fornecedor,
                status: FornecedorActionTypes.STATUS_OCIOSO,
                error: null,
                currentFornecedor: null
            }
        });
    } else
    if (action.type === FornecedorActionTypes.CADASTRAR) {
        API.post('/fornecedor/cadastrar', action.payload).then(() => {
            store.dispatch(FornecedorAction.buscarTodos({termo: state.fornecedor.termo}));
        }).catch((error) => {
            store.dispatch(FornecedorAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === FornecedorActionTypes.ALTERAR) {
        API.post('/fornecedor/alterar?id=' + action.payload.id, action.payload).then(() => {
            store.dispatch(FornecedorAction.buscarTodos({termo: state.fornecedor.termo}));
        }).catch((error) => {
            store.dispatch(FornecedorAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === FornecedorActionTypes.EXCLUIR) {
        API.post('/fornecedor/excluir?id=' + action.payload.id).then(() => {
            store.dispatch(FornecedorAction.buscarTodos({termo: state.fornecedor.termo}));
        }).catch((error) => {
            store.dispatch(FornecedorAction.mostrarErro(error.response.data));
        });
    } else
    if (action.type === FornecedorActionTypes.BUSCAR_TODOS) {
        API.get('/fornecedor/buscaPaginada?pagina=0&tamanho=' + state.fornecedor.size + '&termo=' + action.payload.termo).then((response) => {
            var x = 1;
            var pages = [];
            while (x <= response.data.totalPages) {
                pages.push({ page: x })
                x++;
            }
            store.dispatch(FornecedorAction.preencherConsulta({ result: response.data.content, pageInfo: pages, page: 0, termo: action.payload.termo }));
        });
    } else
    if (action.type === FornecedorActionTypes.BUSCAR_PAGINA) {
        API.get('/fornecedor/buscaPaginada?pagina=' + action.payload.pagina + '&tamanho=' + state.fornecedor.size + '&termo=' + state.fornecedor.termo).then((response) => {
            store.dispatch(FornecedorAction.preencherConsulta({ result: response.data.content, pageInfo: state.fornecedor.pageInfo, page: action.payload.pagina, termo: state.fornecedor.termo }));
        });
    } else
    if (action.type === FornecedorActionTypes.PREENCHER_CONSULTA) {
        return Object.assign({}, state, {
            fornecedor: {
                ...state.fornecedor,
                status: FornecedorActionTypes.STATUS_OCIOSO,
                list: action.payload.result,
                page: action.payload.page,
                pageInfo: action.payload.pageInfo,
                termo: action.payload.termo
            }
        });
    } else
    if (action.type === FornecedorActionTypes.MOSTRAR_ERRO) {
        return Object.assign({}, state, {
            fornecedor: {
                ...state.fornecedor,
                error: action.payload[Object.keys(action.payload)[0]]
            }
        });
    } else
    if (action.type === FornecedorActionTypes.RESETAR_ERRO) {
        return Object.assign({}, state, {
            fornecedor: {
                ...state.fornecedor,
                error: null
            }
        });
    }
    return state;
}