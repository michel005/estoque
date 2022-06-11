import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralConstants from "../constants/GeneralConstants";
import DefaultMenuStyled from "./DefaultMenu.style";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { CRUDContext } from "../hookies/context/CRUDContext";

export default function DefaultMenu() {
    const [fixarCadastrar, setFixarCadastrar] = useState(false);
    const navigate = useNavigate();
    const crud = useContext(CRUDContext);

    function cadastrarFornecedor() {
        setFixarCadastrar(false);
        crud.fornecedor.form.statusCadastrar();
    }

    function cadastrarItem() {
        setFixarCadastrar(false);
        crud.item.form.statusCadastrar();
    }

    function cadastrarEntrada() {
        setFixarCadastrar(false);
        crud.entrada.form.statusCadastrar();
    }

    function navegar(link: string) {
        navigate(link);
    }

    function curentLink() {
        var url = window.location.href;
        url = url.replace(window.location.protocol, "").replace("/" + window.location.host + "/", "");
        return url;
    }

    function botaoMenu(url, name) {
        return (
            <button className={curentLink() === url ? "active" : ""} onClick={() => navegar(url)}>
                {name}
            </button>
        );
    }

    function botaoCadastro(name, onClick) {
        return (
            <button className="link" onClick={onClick}>
                {name}
            </button>
        );
    }

    return (
        <DefaultMenuStyled>
            <div className="tamanhoTela">
                <div className="appTitle noprint">
                    <button onClick={() => navegar("/")}>{GeneralConstants.AppName}</button>
                    <div className="menuUsuario">
                        <div className={"menuCadastrar " + (fixarCadastrar === true ? "fixar" : "")}>
                            <button
                                className="botaoCadastro"
                                onClick={() => {
                                    setFixarCadastrar(!fixarCadastrar);
                                }}
                            >
                                <FontAwesomeIcon icon={solid("plus")} />
                            </button>
                            <div className="opcoesCadastrar">
                                <div className="titulo">Cadastrar</div>
                                {botaoCadastro("Fornecedor", cadastrarFornecedor)}
                                {botaoCadastro("Item", cadastrarItem)}
                                {botaoCadastro("Entrada", cadastrarEntrada)}
                            </div>
                        </div>
                        <div className="imagemUsuario"></div>
                    </div>
                </div>
                <div className="menuOptions">
                    {botaoMenu("/", "Início")}
                    {botaoMenu("/fornecedores", "Fornecedores")}
                    {botaoMenu("/itens", "Itens")}
                    {botaoMenu("/entradas", "Entradas")}
                    {botaoMenu("/saidas", "Saídas")}
                    {botaoMenu("/inventario", "Inventário")}
                    {botaoMenu("/faturamento", "Faturamento")}
                </div>
            </div>
        </DefaultMenuStyled>
    );
}
