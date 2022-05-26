import PaginaActionTypes from "../constants/PaginaActionTypes";
import EntradaActionTypes from "../constants/EntradaActionTypes";
import FornecedorActionTypes from "../constants/FornecedorActionTypes";
import PaginaReducer from "./PaginaReducer";
import EntradaReducer from "./EntradaReducer";
import FornecedorReducer from "./FornecedorReducer";

const initialState = {
    appName: 'App4Store'
};

function rootReducer(state: any = initialState, action: any) {
    if (action.type.module && action.type.module === PaginaActionTypes.MODULE) {
        return PaginaReducer(state, action);
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