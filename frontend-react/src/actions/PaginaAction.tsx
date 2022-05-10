import PaginaActionTypes from "../constants/PaginaActionTypes";

class PaginaAction {

    static mudarPaginaAtual = (payload: string) => {
        return { type: PaginaActionTypes.MUDAR_PAGINA_ATUAL, payload };
    };

}

export default PaginaAction;