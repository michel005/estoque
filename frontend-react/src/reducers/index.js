import ItemActionTypes from "../constants/ItemActionTypes";
import ItemReducer from "./ItemReducer";

const initialState = {
    appName: 'Controle de Estoque',
    item: {
        status: ItemActionTypes.STATUS_OCIOSO,
        currentItem: null,
        list: [],
        page: 0,
        size: 5,
        error: null,
        termo: ''
    }
};

function rootReducer(state = initialState, action) {
    if (action.type.startsWith(ItemActionTypes.PREFIX)) {
        return ItemReducer(state, action);
    } else {
        return state;
    }
};

export default rootReducer;