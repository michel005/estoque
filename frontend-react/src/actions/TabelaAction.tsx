import TabelaActionTypes from "../constants/TabelaActionTypes";

class TabelaAction {

    /**
     * type: tipo de dados que tem o columnMapper
     * column: coluna a ser alterada a visibilidade
     */
    static mudarVisibilidade = (payload: any) => {
        return { type: TabelaActionTypes.MUDAR_VISIBILIDADE, payload };
    };

    /**
     * type: tipo de dados que tem o columnMapper
     * column: coluna a ser alterada a visibilidade do filtro
     */
    static mudarVisibilidadeFiltro = (payload: any) => {
        return { type: TabelaActionTypes.MUDAR_VISIBILIDADE_FILTRO, payload };
    };

    static salvarFiltro = (payload: any) => {
        return { type: TabelaActionTypes.SALVA_FILTRO, payload };
    };

}

export default TabelaAction;