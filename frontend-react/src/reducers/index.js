import EntradaActionTypes from "../constants/EntradaActionTypes";
import ItemActionTypes from "../constants/ItemActionTypes";
import EntradaReducer from "./EntradaReducer";
import ItemReducer from "./ItemReducer";

const initialState = {
    appName: 'Controle de Estoque',
    item: {
        status: ItemActionTypes.STATUS_OCIOSO,
        currentItem: null,
        list: [],
        pageInfo: [],
        page: 0,
        size: 5,
        error: null,
        termo: ''
    },
    entrada: {
        status: EntradaActionTypes.STATUS_OCIOSO,
        currentDate: null,
        currentEntrada: null,
        list: [],
        itemList: [],
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
    } else {
        return state;
    }
};

export default rootReducer;