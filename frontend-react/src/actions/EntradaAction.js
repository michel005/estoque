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

    static buscarPagina = (payload) => {
        return { type: EntradaActionTypes.BUSCAR_PAGINA, payload };
    };

    static preencherDataAtual = (payload) => {
        return { type: EntradaActionTypes.PREENCHER_DATA_ATUAL, payload };
    };

    static preencherConsulta = (payload) => {
        return { type: EntradaActionTypes.PREENCHER_CONSULTA, payload };
    };

    static preencherCurrentEntrada = (payload) => {
        return { type: EntradaActionTypes.PREENCHER_CURRENT_ENTRADA, payload };
    };

    static preencherListaItens = (payload) => {
        return { type: EntradaActionTypes.PREENCHER_LISTA_ITENS, payload };
    };

    static preencherListaFornecedores = (payload) => {
        return { type: EntradaActionTypes.PREENCHER_LISTA_FORNECEDORES, payload };
    };

    static adicionaItemNoCurrentEntrada = (payload) => {
        return { type: EntradaActionTypes.ADICIONA_ITEM_CURRENT_ENTRADA, payload };
    };

    static removeItemNoCurrentEntrada = (payload) => {
        return { type: EntradaActionTypes.REMOVE_ITEM_CURRENT_ENTRADA, payload };
    };

    static mostrarErro = (payload) => {
        return { type: EntradaActionTypes.MOSTRAR_ERRO, payload };
    };

    static resetarErro = (payload) => {
        return { type: EntradaActionTypes.RESETAR_ERRO, payload };
    };

}