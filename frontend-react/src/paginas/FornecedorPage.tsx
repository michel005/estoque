import ListaComponent from "../components/ListaComponent";
import ItemPageStyled from "./ItemPage.style";

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
        <ItemPageStyled>
            <ListaComponent dataType="fornecedor" detailMapper={detail} />
        </ItemPageStyled>
    );
}
