import EntradaActionTypes from "../constants/EntradaActionTypes";

export default class EntradaAction {

    static statusCadastrar = () => {
        return { type: EntradaActionTypes.STATUS_CADASTRAR };
    };

    static statusAlterar = (payload: any) => {
        return { type: EntradaActionTypes.STATUS_ALTERAR, payload };
    };

    static statusExcluir = (payload: any) => {
        return { type: EntradaActionTypes.STATUS_EXCLUIR, payload };
    };

    static statusOcioso = () => {
        return { type: EntradaActionTypes.STATUS_OCIOSO };
    };

    static cadastrar = (payload: any) => {
        return { type: EntradaActionTypes.CADASTRAR, payload };
    };

    static alterar = (payload: any) => {
        return { type: EntradaActionTypes.ALTERAR, payload };
    };

    static excluir = (payload: any) => {
        return { type: EntradaActionTypes.EXCLUIR, payload };
    };

    static buscarTodos = (payload: any) => {
        return { type: EntradaActionTypes.BUSCAR_TODOS, payload };
    };

    static buscarPagina = (payload: any) => {
        return { type: EntradaActionTypes.BUSCAR_PAGINA, payload };
    };

    static preencherDataAtual = (payload: any) => {
        return { type: EntradaActionTypes.PREENCHER_DATA_ATUAL, payload };
    };

    static preencherConsulta = (payload: any) => {
        return { type: EntradaActionTypes.PREENCHER_CONSULTA, payload };
    };

    static preencherCurrentEntrada = (payload: any) => {
        return { type: EntradaActionTypes.PREENCHER_CURRENT_ENTRADA, payload };
    };

    static preencherListaItens = (payload: any) => {
        return { type: EntradaActionTypes.PREENCHER_LISTA_ITENS, payload };
    };

    static preencherListaFornecedores = (payload: any) => {
        return { type: EntradaActionTypes.PREENCHER_LISTA_FORNECEDORES, payload };
    };

    static adicionaItemNoCurrentEntrada = (payload: any) => {
        return { type: EntradaActionTypes.ADICIONA_ITEM_CURRENT_ENTRADA, payload };
    };

    static removeItemNoCurrentEntrada = (payload: any) => {
        return { type: EntradaActionTypes.REMOVE_ITEM_CURRENT_ENTRADA, payload };
    };

    static mostrarErro = (payload: any) => {
        return { type: EntradaActionTypes.MOSTRAR_ERRO, payload };
    };

    static resetarErro = () => {
        return { type: EntradaActionTypes.RESETAR_ERRO, payload: {} };
    };

}