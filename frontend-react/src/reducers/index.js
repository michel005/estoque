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
        page: 0,
        size: 10,
        error: null,
        termo: ''
    },
    entrada: {
        status: EntradaActionTypes.STATUS_OCIOSO,
        currentEntrada: null,
        list: [],
        page: 0,
        size: 10,
        error: null,
        termo: ''
    }
};

function rootReducer(state = initialState, action) {
    if (action.type.startsWith(ItemActionTypes.PREFIX)) {
        return ItemReducer(state, action);
    } else
    if (action.type.startsWith(EntradaActionTypes.PREFIX)) {
        return EntradaReducer(state, action);
    } else {
        return state;
    }
};

export default rootReducer;