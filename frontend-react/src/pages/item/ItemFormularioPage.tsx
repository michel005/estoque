import styled from "styled-components";
import TextField from "../../components/forms/TextField";
import ButtonStyled from "../../components/ButtonStyled";
import SelectField from "../../components/forms/SelectField";
import { STATUS } from "../../hookies/useFormulario";
import JanelaStyled from "../../components/JanelaStyled";
import ValueUtils from "../../utils/ValueUtils";

const StyledFormulario = styled.div`
    width: 100%;

    .innerContent {
        .campo {
            margin-bottom: 7px;

            &:last-child {
                margin-bottom: 0px;
            }
        }
    }
`;

function ItemFormularioPage({ item, status, categorias, eventos }) {
    function salvar() {
        var it = { ...item };
        it.nome = ValueUtils.valueById("fieldNome");
        it.categoria = ValueUtils.valueById("fieldCategoria");

        if (status === STATUS.CADASTRAR) {
            eventos.cadastrar(it);
        } else {
            eventos.alterar(it);
        }
    }

    function cancelar() {
        eventos.statusOcioso();
    }

    return (
        <StyledFormulario>
            <JanelaStyled>
                <div className="content">
                    <div className="title">Formulário de Itens</div>
                    <div className="innerContent">
                        <TextField label="Nome do Item" defaultValue={item.nome} fieldID="fieldNome" nullable={false} />
                        <SelectField label="Categoria" defaultValue={item.categoria === null ? "" : item.categoria} fieldID="fieldCategoria" list={categorias} />
                    </div>
                    <div className="commands">
                        <ButtonStyled className="primary" onClick={salvar}>
                            Salvar
                        </ButtonStyled>
                        <ButtonStyled onClick={cancelar}>Cancelar</ButtonStyled>
                    </div>
                </div>
            </JanelaStyled>
        </StyledFormulario>
    );
}

export default ItemFormularioPage;
