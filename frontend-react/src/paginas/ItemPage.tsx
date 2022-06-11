import { useContext } from "react";
import ListaComponent from "../components/ListaComponent";
import { CRUDContext } from "../hookies/context/CRUDContext";
import ItemPageStyled from "./ItemPage.style";

export default function ItemPage() {
    const itemContext = useContext(CRUDContext).item;

    var detail = [
        { title: "Dados gerais" },
        {
            fields: ["nome", "categoria", "quantidade", "minValor", "maxValor"],
        },
    ];

    return (
        <ItemPageStyled>
            <ListaComponent dataType="item" detailMapper={detail} />
        </ItemPageStyled>
    );
}
