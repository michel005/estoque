import styled from "styled-components";
import { useEffect } from "react";
import ListaComponent from "../../components/ListaComponent";
import useFormulario, { STATUS } from "../../hookies/useFormulario";
import FornecedorFormularioPage from "./FornecedorFormularioPage";
import GeneralConstants from "../../constants/GeneralConstants";

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

function FornecedorPage({ setErro, lista, pageInfo, termoBuscaSalvo, buscarTodos }) {
    useEffect(() => {
        document.title = GeneralConstants.AppName + " - Fornecedores";
    });

    const { status, atual, eventos } = useFormulario({
        setErro,
        defaultAtual: { nome: "Novo Fornecedor", tipoPessoa: "F" },
        urlCadastro: "/fornecedor/cadastrar",
        urlAlteracao: "/fornecedor/alterar?id=@#ID@#",
        urlExclusao: "/fornecedor/excluir?id=@#ID@#",
        eventoAntes: () => {},
        eventoDepois: () => {
            buscarTodos({ termoBusca: termoBuscaSalvo });
        },
    });

    var detail = [
        { title: "Dados pessoais" },
        {
            fields: ["nome", "tipoPessoa", "cpfCnpj", "telefone"],
        },
        {
            fields: ["email"],
        },
        { title: "Endereço" },
        {
            fields: ["cidade", "estado", "pais", "cep"],
        },
        {
            fields: ["rua", "numero", "bairro", "complemento"],
        },
    ];

    var events = {
        insert: () => {
            eventos.statusCadastrar();
        },
        update: (item: any) => {
            eventos.statusAlterar(item);
        },
        delete: (item: any) => {
            eventos.excluir(item);
        },
        page: (pagina: any) => {
            buscarTodos({ pagina: pagina });
        },
        filter: (value: any) => {
            buscarTodos({ termoBusca: value });
        },
    };

    return (
        <FornecedorPageStyled>
            <ListaComponent
                dataType="fornecedor"
                data={lista.content}
                detailMapper={detail}
                events={events}
                pageInfo={pageInfo}
                textoPerguntaExclusao={"Deseja realmente excluir o fornecedor \"@#nome@#\"?"}
            />
            {status !== STATUS.OCIOSO && <FornecedorFormularioPage fornecedor={atual} status={status} eventos={eventos} />}
        </FornecedorPageStyled>
    );
}

export default FornecedorPage;
