class FornecedorActionTypes {
    static MODULE = 'FORNECEDOR';

    static STATUS_CADASTRAR = { module: this.MODULE, step: 'STATUS_CADASTRAR' };
    static STATUS_ALTERAR = { module: this.MODULE, step: 'STATUS_ALTERAR' };
    static STATUS_EXCLUIR = { module: this.MODULE, step: 'STATUS_EXCLUIR' };
    static STATUS_OCIOSO = { module: this.MODULE, step: 'STATUS_OCIOSO' };
    
    static CADASTRAR = { module: this.MODULE, step: 'CADASTRAR' };
    static ALTERAR = { module: this.MODULE, step: 'ALTERAR' };
    static EXCLUIR = { module: this.MODULE, step: 'EXCLUIR' };
    static BUSCAR_MAIS = { module: this.MODULE, step: 'BUSCAR_MAIS' };
    static BUSCAR_TODOS = { module: this.MODULE, step: 'BUSCAR_TODOS' };
    static BUSCAR_PAGINA = { module: this.MODULE, step: 'BUSCAR_PAGINA' };
    static PREENCHER_CONSULTA = { module: this.MODULE, step: 'PREENCHER_CONSULTA' };
    static MOSTRAR_ERRO = { module: this.MODULE, step: 'MOSTRAR_ERRO' };
    static RESETAR_ERRO = { module: this.MODULE, step: 'RESETAR_ERRO' };
    static SELECIONADOS = { module: this.MODULE, step: 'SELECIONADOS' };
}

export default FornecedorActionTypes;