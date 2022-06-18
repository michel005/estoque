import ListaComponent from "../components/ListaComponent";
import FornecedorPageStyled from "./FornecedorPage.style";

export default function FornecedorPage() {

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

    return (
        <FornecedorPageStyled>
            <ListaComponent dataType="fornecedor" detailMapper={detail} />
        </FornecedorPageStyled>
    );
}
