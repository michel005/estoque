import { useContext } from "react";
import ButtonStyled from "../components/ButtonStyled";
import SelectField from "../components/forms/SelectField";
import TextField from "../components/forms/TextField";
import JanelaStyled from "../components/JanelaStyled";
import { CRUDContext } from "../hookies/context/CRUDContext";
import { STATUS } from "../hookies/useFormulario";
import ValueUtils from "../utils/ValueUtils";

export default function ItemFormularioPage() {
    const form = useContext(CRUDContext).item.form;
    const categorias = useContext(CRUDContext).item.categorias;

    function salvar() {
        var atual = { ...form.atual };

        atual.nome = ValueUtils.valueById("formulario_item_nome");
        atual.categoria = ValueUtils.valueById("formulario_item_categoria");

        form.salvar(atual);
    }

    return (
        <JanelaStyled>
            <div className="content">
                <div className="title">{form.status === STATUS.CADASTRAR ? "Cadastro" : "Alteração"} de Item</div>
                <div className="innerContent">
                    <TextField label="Nome" fieldID="formulario_item_nome" nullable={false} defaultValue={form.atual.nome} />
                    <SelectField label="Categoria" fieldID="formulario_item_categoria" defaultValue={form.atual.categoria} list={categorias} />
                </div>
                <div className="commands">
                    <ButtonStyled onClick={salvar} className="primary">Salvar</ButtonStyled>
                    <ButtonStyled onClick={form.statusOcioso}>Cancelar</ButtonStyled>
                </div>
            </div>
        </JanelaStyled>
    );
}
