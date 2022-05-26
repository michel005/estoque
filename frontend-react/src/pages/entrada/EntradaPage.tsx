import { connect } from "react-redux";
import styled from "styled-components";
import EntradaAction from "../../actions/EntradaAction";
import store from "../../store";
import { useEffect, useState } from "react";
import ListaComponent from "../../components/ListaComponent";
import useFormulario, { STATUS } from "../../hookies/useFormulario";
import API from "../../API";
import EntradaFormularioConnect from "./EntradaFormularioPage";
import EntradaFormularioPage from "./EntradaFormularioPage";

const EntradaPageStyled = styled.div`
width: 100%;

.colunaId {
    max-width: 80px;
}

.colunaDataEntrada {
    max-width: 180px;
}

.colunaStatus {
    max-width: 140px;
}

.colunaFornecedor {
    max-width: 300px;
}

.colunaCpfCnpj {
    max-width: 150px;
}

.colunaTipoPessoa {
    max-width: 150px;
}

.colunaValor {
    width: 150px;
}
`;

function EntradaPage({ lista, pageInfo, erro, termoBuscaSalvo, buscarTodos } : any) {

    const {
        status,
        atual,
        setAtual,
        error: formError,
        complementos,
        setComplementos,
        eventos
    } = useFormulario({
        defaultAtual: { 
            eventoEntrada: { 
                id: null, 
                descricao: 'Nova Entrada de Itens',
                status: 'PENDENTE',
                fornecedor: null
            }, 
            itens: [] 
        },
        urlCadastro: '/evento/entrada/cadastrarModelo',
        urlAlteracao: '/evento/entrada/alterarModelo',
        urlExclusao: '/evento/entrada/excluir?id=@#ID@#',
        eventoAntes: () => {
            API.get('/item/buscarTodos').then((responseItens) => {
                var itens : any[] = [];
                var valoresItens = Object.keys(responseItens.data);
                valoresItens.map((valueItens) => {
                    itens[responseItens.data[valueItens].nome] = responseItens.data[valueItens].nome;
                    return valueItens;
                });

                
                API.get('/fornecedor/buscarTodos').then((responseFornec) => {
                    var fornecedores : any[] = [];
                    var valoresFornec = Object.keys(responseFornec.data);
                    valoresFornec.map((valueFornec) => {
                        fornecedores[responseFornec.data[valueFornec].id] = responseFornec.data[valueFornec].nome + ' (' + responseFornec.data[valueFornec].cpfCnpj + ')';
                        return valueFornec;
                    });

                    setComplementos({
                        itens: itens,
                        fornecedores: fornecedores
                    });
                });
            });
        },
        eventoDepois: () => {
            buscarTodos({termoBusca: termoBuscaSalvo})
        }
    })

    useEffect(() => {
        document.title = store.getState().appName +  ' - Entradas';
    })

    var detail = [
        { title: 'Dados gerais' },
        { 
            fields: [
                'descricao', 'dataEntrada', 'status'
            ] 
        },
        { title: 'Fornecedor' },
        { 
            fields: [
                'fornecedor', 'cpfCnpj', 'tipoPessoa'
            ] 
        },
        { 
            fields: [
                'fornecedorEmail'
            ] 
        },
        { title: 'Valores' },
        { 
            fields: [
                'valor', 'quantidadeItens', 'quantidade'
            ] 
        }
    ];

    var events = {
        insert: () => {
            eventos.statusCadastrar();
        },
        update: (item: any) => {
            eventos.statusAlterar(item);
        },
        delete: (item: any) => {
            eventos.statusExcluir(item);
        },
        page: (pagina: any) => {
            buscarTodos({ pagina: pagina });
        },
        filter: (value: any) => {
            buscarTodos({ termoBusca: value });
        }
    }

    return (
        <EntradaPageStyled>
            {status === STATUS.OCIOSO && <ListaComponent dataType="entrada" data={lista.content} detailMapper={detail} events={events} pageInfo={pageInfo} />}
            {status !== STATUS.OCIOSO && <EntradaFormularioPage entrada={atual} setAtual={setAtual} error={formError} status={status} listaFornecedores={complementos.fornecedores} listaItens={complementos.itens} eventos={eventos}  />}
        </EntradaPageStyled>
    );
};

 export default EntradaPage;