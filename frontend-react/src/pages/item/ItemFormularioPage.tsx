import styled from "styled-components";
import TextField from "../../components/forms/TextField";
import ButtonStyled from "../../components/ButtonStyled";
import Message from "../../components/Message";
import ChoiceMessage from "../../components/ChoiceMessage";
import SelectField from "../../components/forms/SelectField";
import { STATUS } from "../../hookies/useFormulario";
import JanelaStyled from "../../components/JanelaStyled";

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

function ItemFormularioPage({ 
    item, 
    error, 
    status, 
    categorias, 
    eventos 
}) {
    function valueById(id: string) {
        var objeto : any = document.getElementById(id);
        return objeto !== undefined && objeto !== null ? (objeto.value === '' ? null : objeto.value) : null;
    }

    function salvar() {
        var it = item;
        it.nome = valueById('fieldNome');
        it.categoria = valueById('fieldCategoria');

        if (status === STATUS.CADASTRAR) {
            eventos.cadastrar(it);
        } else {
            eventos.alterar(it);
        }
    }

    function excluir() {
        eventos.statusExcluir(item);
    }

    function acaoExcluir() {
        eventos.excluir(item);
    }

    function fecharExcluir() {
        if (status === STATUS.CADASTRAR) {
            eventos.statusCadastrar(item);
        } else {
            eventos.statusAlterar(item);
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
                        <SelectField label="Categoria" defaultValue={item.categoria === null ? '' : item.categoria} fieldID="fieldCategoria" list={categorias} />
                    </div>
                    <div className="commands">
                        <ButtonStyled className="primary" onClick={salvar}>Salvar</ButtonStyled>
                        {status === STATUS.ALTERAR && <ButtonStyled className="alert" onClick={excluir}>Excluir</ButtonStyled>}
                        <ButtonStyled onClick={cancelar}>Cancelar</ButtonStyled>
                    </div>
                </div>
            </JanelaStyled>
            {status === STATUS.EXCLUIR && <ChoiceMessage title="Exclusão de Item" text={'Deseja realmente excluir o item "' + item.nome + '"?'} choices={[ { name: 'Sim', command: acaoExcluir }, { name: 'Não, cancelar!', command: fecharExcluir } ]} />}
            {error !== null && <Message title="Erro no Item" text={error.toString()} closeEvent={fecharExcluir} />}
        </StyledFormulario>
    );
}

export default ItemFormularioPage;