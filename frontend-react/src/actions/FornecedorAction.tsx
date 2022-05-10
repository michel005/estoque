import FornecedorActionTypes from "../constants/FornecedorActionTypes";

class FornecedorAction {

    static statusCadastrar = () => {
        return { type: FornecedorActionTypes.STATUS_CADASTRAR };
    };

    static statusAlterar = (payload: any) => {
        return { type: FornecedorActionTypes.STATUS_ALTERAR, payload };
    };

    static statusExcluir = (payload: any) => {
        return { type: FornecedorActionTypes.STATUS_EXCLUIR, payload };
    };

    static statusOcioso = () => {
        return { type: FornecedorActionTypes.STATUS_OCIOSO };
    };

    static cadastrar = (payload: any) => {
        return { type: FornecedorActionTypes.CADASTRAR, payload };
    };

    static alterar = (payload: any) => {
        return { type: FornecedorActionTypes.ALTERAR, payload };
    };

    static excluir = (payload: any) => {
        return { type: FornecedorActionTypes.EXCLUIR, payload };
    };

    static buscarTodos = (payload: any) => {
        return { type: FornecedorActionTypes.BUSCAR_TODOS, payload };
    };

    static buscarPagina = (payload: any) => {
        return { type: FornecedorActionTypes.BUSCAR_PAGINA, payload };
    };

    static preencherConsulta = (payload: any) => {
        return { type: FornecedorActionTypes.PREENCHER_CONSULTA, payload };
    };

    static mostrarErro = (payload: any) => {
        return { type: FornecedorActionTypes.MOSTRAR_ERRO, payload };
    };

    static resetarErro = (payload: any) => {
        return { type: FornecedorActionTypes.RESETAR_ERRO, payload };
    };

}

export default FornecedorAction;