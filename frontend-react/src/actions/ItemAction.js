import ItemActionTypes from "../constants/ItemActionTypes";

class ItemAction {

    static statusCadastrar = () => {
        return { type: ItemActionTypes.STATUS_CADASTRAR };
    };

    static statusAlterar = (payload) => {
        return { type: ItemActionTypes.STATUS_ALTERAR, payload };
    };

    static statusExcluir = (payload) => {
        return { type: ItemActionTypes.STATUS_EXCLUIR, payload };
    };

    static statusOcioso = () => {
        return { type: ItemActionTypes.STATUS_OCIOSO };
    };

    static cadastrar = (payload) => {
        return { type: ItemActionTypes.CADASTRAR, payload };
    };

    static alterar = (payload) => {
        return { type: ItemActionTypes.ALTERAR, payload };
    };

    static excluir = (payload) => {
        return { type: ItemActionTypes.EXCLUIR, payload };
    };

    static buscarTodos = (payload) => {
        return { type: ItemActionTypes.BUSCAR_TODOS, payload };
    };

    static buscarPagina = (payload) => {
        return { type: ItemActionTypes.BUSCAR_PAGINA, payload };
    };

    static buscarMais = (payload) => {
        return { type: ItemActionTypes.BUSCAR_MAIS, payload };
    };

    static preencherConsulta = (payload) => {
        return { type: ItemActionTypes.PREENCHER_CONSULTA, payload };
    };

    static preencherCategorias = (payload) => {
        return { type: ItemActionTypes.PREENCHER_CATEGORIAS, payload };
    };

    static mostrarErro = (payload) => {
        return { type: ItemActionTypes.MOSTRAR_ERRO, payload };
    };

    static resetarErro = (payload) => {
        return { type: ItemActionTypes.RESETAR_ERRO, payload };
    };

    static preencherTamanhoPagina = (payload) => {
        return { type: ItemActionTypes.PREENCHER_TAMANHO_PAGINA, payload };
    };

}

export default ItemAction;