import store from "../../store";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ListaComponent from "../../components/ListaComponent";
import useFormulario, { STATUS } from "../../hookies/useFormulario";
import FornecedorFormularioPage from "./FornecedorFormularioPage";

const FornecedorPageStyled = styled.div`
width: 100%;

.colunaId {
    min-width: 80px !important;
    width: 80px !important;
}

.colunaNome {
    min-width: 25%;
}

.colunaTipoPessoa {
    min-width: 180px !important;
    width: 180px !important;
}
`;

function FornecedorPage({ lista, pageInfo, erro, termoBuscaSalvo, buscarTodos }) {

    useEffect(() => {
        document.title = store.getState().appName +  ' - Fornecedores';
    })

    const {
        status,
        atual,
        error: formError,
        eventos
    } = useFormulario({
        defaultAtual: {},
        urlCadastro: '/fornecedor/cadastrar',
        urlAlteracao: '/fornecedor/alterar?id=@#ID@#',
        urlExclusao: '/fornecedor/excluir?id=@#ID@#',
        eventoAntes: () => {
        },
        eventoDepois: () => {
            buscarTodos({termoBusca: termoBuscaSalvo})
        }
    })

    var detail = [
        { title: 'Dados pessoais' },
        { 
            fields: [
                'nome', 'tipoPessoa', 'cpfCnpj', 'telefone'
            ] 
        },
        { 
            fields: [
                'email'
            ] 
        },
        { title: 'Endereço' },
        { 
            fields: [
                'cidade', 'estado', 'pais', 'cep'
            ] 
        },
        { 
            fields: [
                'rua', 'numero', 'bairro', 'complemento'
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
        <FornecedorPageStyled>
            <ListaComponent dataType="fornecedor" data={lista.content} detailMapper={detail} events={events} pageInfo={pageInfo} />
            {status !== STATUS.OCIOSO && <FornecedorFormularioPage fornecedor={atual} error={formError} status={status} eventos={eventos} />}
        </FornecedorPageStyled>
    );
};

export default FornecedorPage;