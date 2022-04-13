class EntradaActionTypes {
    static MODULE = 'ENTRADA';

    static STATUS_CADASTRAR = { module: this.MODULE, step: 'STATUS_CADASTRAR' };
    static STATUS_ALTERAR = { module: this.MODULE, step: 'STATUS_ALTERAR' };
    static STATUS_EXCLUIR = { module: this.MODULE, step: 'STATUS_EXCLUIR' };
    static STATUS_OCIOSO = { module: this.MODULE, step: 'STATUS_OCIOSO' };
    
    static PREENCHE_CURRENT_ENTRADA = { module: this.MODULE, step: 'PREENCHE_CURRENT_ENTRADA' };
    static CADASTRAR = { module: this.MODULE, step: 'CADASTRAR' };
    static ALTERAR = { module: this.MODULE, step: 'ALTERAR' };
    static EXCLUIR = { module: this.MODULE, step: 'EXCLUIR' };
    static BUSCAR_MAIS = { module: this.MODULE, step: 'BUSCAR_MAIS' };
    static BUSCAR_TODOS = { module: this.MODULE, step: 'BUSCAR_TODOS' };
    static BUSCAR_PAGINA = { module: this.MODULE, step: 'BUSCAR_PAGINA' };
    static PREENCHER_CONSULTA = { module: this.MODULE, step: 'PREENCHER_CONSULTA' };
    static MOSTRAR_ERRO = { module: this.MODULE, step: 'MOSTRAR_ERRO' };
    static RESETAR_ERRO = { module: this.MODULE, step: 'RESETAR_ERRO' };
    static ATUALIZAR_DATA = { module: this.MODULE, step: 'ATUALIZAR_DATA' };
    static PREENCHER_LISTA_ITENS = { module: this.MODULE, step: 'PREENCHER_LISTA_ITENS' };
    static PREENCHER_LISTA_FORNECEDORES = { module: this.MODULE, step: 'PREENCHER_LISTA_FORNECEDORES' };
    static ADICIONA_ITEM_CURRENT_ENTRADA = { module: this.MODULE, step: 'ADICIONA_ITEM_CURRENT_ENTRADA' };
    static REMOVE_ITEM_CURRENT_ENTRADA = { module: this.MODULE, step: 'REMOVE_ITEM_CURRENT_ENTRADA' };
    static FUNCTION_DEFINE_DATA_ENTRADA_CALENDAR = { module: this.MODULE, step: 'FUNCTION_DEFINE_DATA_ENTRADA_CALENDAR' };
}

export default EntradaActionTypes;