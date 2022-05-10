import PaginaActionTypes from "../constants/PaginaActionTypes";

export default function PaginaReducer(state: any, action: any) {
    if (action.type === PaginaActionTypes.MUDAR_PAGINA_ATUAL) {
        return Object.assign({}, state, {
            pagina: {
                ...state.pagina,
                atual: action.payload
            }
        });
    }
    return state;
}