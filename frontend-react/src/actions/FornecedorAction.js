import FornecedorActionTypes from "../constants/FornecedorActionTypes";

class FornecedorAction {

    static statusCadastrar = () => {
        return { type: FornecedorActionTypes.STATUS_CADASTRAR };
    };

    static statusAlterar = (payload) => {
        return { type: FornecedorActionTypes.STATUS_ALTERAR, payload };
    };

    static statusExcluir = (payload) => {
        return { type: FornecedorActionTypes.STATUS_EXCLUIR, payload };
    };

    static statusOcioso = () => {
        return { type: FornecedorActionTypes.STATUS_OCIOSO };
    };

    static cadastrar = (payload) => {
        return { type: FornecedorActionTypes.CADASTRAR, payload };
    };

    static alterar = (payload) => {
        return { type: FornecedorActionTypes.ALTERAR, payload };
    };

    static excluir = (payload) => {
        return { type: FornecedorActionTypes.EXCLUIR, payload };
    };

    static buscarTodos = (payload) => {
        return { type: FornecedorActionTypes.BUSCAR_TODOS, payload };
    };

    static buscarPagina = (payload) => {
        return { type: FornecedorActionTypes.BUSCAR_PAGINA, payload };
    };

    static buscarMais = (payload) => {
        return { type: FornecedorActionTypes.BUSCAR_MAIS, payload };
    };

    static preencherConsulta = (payload) => {
        return { type: FornecedorActionTypes.PREENCHER_CONSULTA, payload };
    };

    static mostrarErro = (payload) => {
        return { type: FornecedorActionTypes.MOSTRAR_ERRO, payload };
    };

    static resetarErro = (payload) => {
        return { type: FornecedorActionTypes.RESETAR_ERRO, payload };
    };

    static selecionados = (payload) => {
        return { type: FornecedorActionTypes.SELECIONADOS, payload };
    };

}

export default FornecedorAction;