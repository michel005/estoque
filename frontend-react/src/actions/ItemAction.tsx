import ItemActionTypes from "../constants/ItemActionTypes";

class ItemAction {

    static statusCadastrar = () => {
        return { type: ItemActionTypes.STATUS_CADASTRAR };
    };

    static statusAlterar = (payload: any) => {
        return { type: ItemActionTypes.STATUS_ALTERAR, payload };
    };

    static statusExcluir = (payload: any) => {
        return { type: ItemActionTypes.STATUS_EXCLUIR, payload };
    };

    static statusOcioso = () => {
        return { type: ItemActionTypes.STATUS_OCIOSO };
    };

    static cadastrar = (payload: any) => {
        return { type: ItemActionTypes.CADASTRAR, payload };
    };

    static alterar = (payload: any) => {
        return { type: ItemActionTypes.ALTERAR, payload };
    };

    static excluir = (payload: any) => {
        return { type: ItemActionTypes.EXCLUIR, payload };
    };

    static buscarTodos = (payload: any) => {
        return { type: ItemActionTypes.BUSCAR_TODOS, payload };
    };

    static buscarPagina = (payload: any) => {
        return { type: ItemActionTypes.BUSCAR_PAGINA, payload };
    };

    static buscarMais = (payload: any) => {
        return { type: ItemActionTypes.BUSCAR_MAIS, payload };
    };

    static preencherConsulta = (payload: any) => {
        return { type: ItemActionTypes.PREENCHER_CONSULTA, payload };
    };

    static preencherCategorias = (payload: any) => {
        return { type: ItemActionTypes.PREENCHER_CATEGORIAS, payload };
    };

    static mostrarErro = (payload: any) => {
        return { type: ItemActionTypes.MOSTRAR_ERRO, payload };
    };

    static resetarErro = (payload: any) => {
        return { type: ItemActionTypes.RESETAR_ERRO, payload };
    };

    static preencherTamanhoPagina = (payload: any) => {
        return { type: ItemActionTypes.PREENCHER_TAMANHO_PAGINA, payload };
    };

}

export default ItemAction;