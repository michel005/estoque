import TabelaActionTypes from "../constants/TabelaActionTypes";

export default function TabelaReducer(state, action) {

    if (action.type === TabelaActionTypes.MUDAR_VISIBILIDADE) {
        var tabela = state.tabela;
        tabela[action.payload.type].columnMapper[action.payload.column].visible = (tabela[action.payload.type].columnMapper[action.payload.column].visible === undefined || tabela[action.payload.type].columnMapper[action.payload.column].visible === true) ? false : true;
        return Object.assign({}, state, {
            tabela: tabela
        });
    } else
    if (action.type === TabelaActionTypes.MUDAR_VISIBILIDADE_FILTRO) {
        var tabela2 = state.tabela;
        tabela2[action.payload.type].columnMapper[action.payload.column].filterVisible = (tabela2[action.payload.type].columnMapper[action.payload.column].filterVisible !== undefined && tabela2[action.payload.type].columnMapper[action.payload.column].filterVisible === true) ? false : true;
        return Object.assign({}, state, {
            tabela: tabela2
        });
    } else
    if (action.type === TabelaActionTypes.SALVA_FILTRO) {
        var tabela3 = state.tabela;
        tabela3[action.payload.type].filter = action.payload.filter;
        return Object.assign({}, state, {
            tabela: tabela3
        });
    }
    return state;
}