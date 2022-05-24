import PaginaActionTypes from "../constants/PaginaActionTypes";
import EntradaActionTypes from "../constants/EntradaActionTypes";
import FornecedorActionTypes from "../constants/FornecedorActionTypes";
import ItemActionTypes from "../constants/ItemActionTypes";
import PaginaReducer from "./PaginaReducer";
import EntradaReducer from "./EntradaReducer";
import FornecedorReducer from "./FornecedorReducer";
import ItemReducer from "./ItemReducer";
import ColumnsDefinitions from "./ColumnsDefinitions";

const initialState = {
    appName: 'App4Store',
    pagina: {
        atual: 'inicio'
    },
    inicio: {

    },
    tabela: ColumnsDefinitions.definition,
    fornecedor: {
        status: FornecedorActionTypes.STATUS_OCIOSO,
        currentFornecedor: null,
        list: [],
        pageInfo: [],
        page: 0,
        size: 10,
        error: null,
        termo: null
    },
    item: {
        status: ItemActionTypes.STATUS_OCIOSO,
        categorias: [],
        currentItem: null,
        list: [],
        pageInfo: [],
        page: 0,
        size: 10,
        error: null,
        termo: ''
    },
    entrada: {
        status: EntradaActionTypes.STATUS_OCIOSO,
        termo: null,
        list: [],
        itemList: [],
        fornecedoresList: [],
        pageInfo: [],
        page: 0,
        size: 10,
        error: null
    }
};

function rootReducer(state: any = initialState, action: any) {
    if (action.type.module && action.type.module === PaginaActionTypes.MODULE) {
        return PaginaReducer(state, action);
    } else
    if (action.type.module && action.type.module === ItemActionTypes.MODULE) {
        return ItemReducer(state, action);
    } else
    if (action.type.module && action.type.module === EntradaActionTypes.MODULE) {
        return EntradaReducer(state, action);
    } else
    if (action.type.module && action.type.module === FornecedorActionTypes.MODULE) {
        return FornecedorReducer(state, action);
    } else {
        return state;
    }
};

export default rootReducer;