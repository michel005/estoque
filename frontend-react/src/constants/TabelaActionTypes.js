class TabelaActionTypes {
    static MODULE = 'TABELA';

    static MUDAR_VISIBILIDADE = { module: this.MODULE, step: 'MUDAR_VISIBILIDADE' };
    static MUDAR_VISIBILIDADE_FILTRO = { module: this.MODULE, step: 'MUDAR_VISIBILIDADE_FILTRO' };
    static SALVA_FILTRO = { module: this.MODULE, step: 'SALVA_FILTRO' };
}

export default TabelaActionTypes;