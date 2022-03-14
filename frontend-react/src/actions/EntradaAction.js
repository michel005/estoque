import EntradaActionTypes from "../constants/EntradaActionTypes";

export default class EntradaAction {

    static statusCadastrar = () => {
        return { type: EntradaActionTypes.STATUS_CADASTRAR };
    };

    static statusAlterar = (payload) => {
        return { type: EntradaActionTypes.STATUS_ALTERAR, payload };
    };

    static statusExcluir = (payload) => {
        return { type: EntradaActionTypes.STATUS_EXCLUIR, payload };
    };

    static statusOcioso = () => {
        return { type: EntradaActionTypes.STATUS_OCIOSO };
    };

    static cadastrar = (payload) => {
        return { type: EntradaActionTypes.CADASTRAR, payload };
    };

    static alterar = (payload) => {
        return { type: EntradaActionTypes.ALTERAR, payload };
    };

    static excluir = (payload) => {
        return { type: EntradaActionTypes.EXCLUIR, payload };
    };

    static buscarTodos = (payload) => {
        return { type: EntradaActionTypes.BUSCAR_TODOS, payload };
    };

    static buscarMais = (payload) => {
        return { type: EntradaActionTypes.BUSCAR_MAIS, payload };
    };

    static preencherConsulta = (payload) => {
        return { type: EntradaActionTypes.PREENCHER_CONSULTA, payload };
    };

    static mostrarErro = (payload) => {
        return { type: EntradaActionTypes.MOSTRAR_ERRO, payload };
    };

    static resetarErro = (payload) => {
        return { type: EntradaActionTypes.RESETAR_ERRO, payload };
    };

}