import EntradaActionTypes from "../constants/EntradaActionTypes";
import FornecedorActionTypes from "../constants/FornecedorActionTypes";
import ItemActionTypes from "../constants/ItemActionTypes";
import EntradaReducer from "./EntradaReducer";
import FornecedorReducer from "./FornecedorReducer";
import ItemReducer from "./ItemReducer";

const initialState = {
    appName: 'Estoque',
    fornecedor: {
        status: FornecedorActionTypes.STATUS_OCIOSO,
        currentFornecedor: null,
        list: [],
        pageInfo: [],
        page: 0,
        size: 10,
        error: null,
        termo: {
            nome: '',
            cpfCnpj: '',
            tipoPessoa: ''
        }
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
        currentDate: null,
        currentEntrada: null,
        list: [],
        itemList: [],
        fornecedoresList: [],
        pageInfo: [],
        page: 0,
        size: 10,
        error: null,
        termo: '',
        functionDataEntradaCalendar: null
    }
};

function rootReducer(state = initialState, action) {
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