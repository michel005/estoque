class EntradaActionTypes {
    static PREFIX = 'ENTRADA_';

    static STATUS_CADASTRAR = this.PREFIX + 'STATUS_CADASTRAR';
    static STATUS_ALTERAR = this.PREFIX + 'STATUS_ALTERAR';
    static STATUS_EXCLUIR = this.PREFIX + 'STATUS_EXCLUIR';
    static STATUS_OCIOSO = this.PREFIX + 'STATUS_OCIOSO';
    
    static CADASTRAR = this.PREFIX + 'CADASTRAR';
    static ALTERAR = this.PREFIX + 'ALTERAR';
    static EXCLUIR = this.PREFIX + 'EXCLUIR';
    static BUSCAR_MAIS = this.PREFIX + 'BUSCAR_MAIS';
    static BUSCAR_TODOS = this.PREFIX + 'BUSCAR_TODOS';
    static PREENCHER_CONSULTA = this.PREFIX + 'PREENCHER_CONSULTA';
    static MOSTRAR_ERRO = this.PREFIX + 'MOSTRAR_ERRO';
    static RESETAR_ERRO = this.PREFIX + 'RESETAR_ERRO';
}

export default EntradaActionTypes;