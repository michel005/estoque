import { connect } from "react-redux";
import store from "../../store";
import styled from "styled-components";
import TextField from "../../components/forms/TextField";
import ButtonStyled from "../../components/ButtonStyled";
import Message from "../../components/Message";
import ChoiceMessage from "../../components/ChoiceMessage";
import {
    useNavigate
} from "react-router-dom";
import PaginaAction from "../../actions/PaginaAction";
import ItemAction from "../../actions/ItemAction";
import ItemActionTypes from "../../constants/ItemActionTypes";
import SelectField from "../../components/forms/SelectField";

const StyledFormulario = styled.div`
width: 100%;

h1 {
    color: #000;
    margin-bottom: 48px;
    width: 100%;
}

a {
    color: #39f;
    text-decoration: none;
}

.linha {
    display: flex;
    flex-direction: row;
    margin-bottom: 14px;

    .campo {
        margin-right: 14px;
        flex-grow: 1;
        width: 100%;

        &:last-child {
            margin-right: 0px;
        }
    }
}

.separador {
    display: flex;
    flex-direction: row;
    margin-top: 14px;
    margin-bottom: 21px;

    &:first-child {
        margin-top: 7px;
    }

    .titulo {
        color: #666;
        font-weight: bold;
        font-size: 20px;
        white-space: nowrap;
    }

    .barra {
        background-color: #ddd;
        flex-grow: 1;
        height: 2px;
        width: 100%;
        margin-top: 15px;
        margin-left: 14px;
    }
}

.comandos {
    margin-top: 48px;

    button {
        margin-right: 14px;

        &:last-child {
            margin-right: 0px;
        }
    }
}
`;

function Separador({ titulo }: any) {
    return (
        <div className="separador">
            <div className="titulo">{titulo}</div>
            <div className="barra"></div>
        </div>
    );
}

function ItemFormularioPage({ item, error, status, categorias }: any) {
    const navigate = useNavigate();

    function valueById(id: string) {
        var objeto : any = document.getElementById(id);
        return objeto !== undefined && objeto !== null ? (objeto.value === '' ? null : objeto.value) : null;
    }

    function salvar() {
        var it = item;
        it.nome = valueById('fieldNome');
        it.categoria = valueById('fieldCategoria');

        if (item.id === null) {
            store.dispatch(ItemAction.cadastrar(it));
        } else {
            store.dispatch(ItemAction.alterar(it));
        }
    }

    function excluir() {
        store.dispatch(ItemAction.statusExcluir(item));
    }

    function acaoExcluir() {
        store.dispatch(ItemAction.excluir(item));
    }

    function fecharExcluir() {
        if (item.id === null) {
            store.dispatch(ItemAction.statusCadastrar());
        } else {
            store.dispatch(ItemAction.statusAlterar(item));
        }
    }

    function cancelar() {
        store.dispatch(ItemAction.statusOcioso());
        store.dispatch(PaginaAction.mudarPaginaAtual('inicio'));
        navigate('/itens');
    }

    return (
        <StyledFormulario>
            <h1>Formulário de Item</h1>
            <Separador titulo="Dados gerais" />
            <div className="linha">
                <TextField label="Nome do Item" defaultValue={item.nome} fieldID="fieldNome" nullable={false} />
                <SelectField label="Categoria" defaultValue={item.categoria === null ? '' : item.categoria} fieldID="fieldCategoria" list={categorias} />
            </div>
            <div className="comandos">
                <ButtonStyled className="primary" onClick={salvar}>Salvar</ButtonStyled>
                {item === null || item.id === null ? <></> : <ButtonStyled className="alert" onClick={excluir}>Excluir</ButtonStyled>}
                <ButtonStyled onClick={cancelar}>Cancelar</ButtonStyled>
            </div>

            {status === ItemActionTypes.STATUS_EXCLUIR ? <>
                <ChoiceMessage title="Exclusão de Item" text={'Deseja realmente excluir o item "' + item.nome + '"?'} choices={[ { name: 'Sim', command: acaoExcluir }, { name: 'Não, cancelar!', command: fecharExcluir } ]} />
            </> : <></>}

            {error !== null ? <Message title="Erro no Item" text={error.toString()} closeEvent={fecharExcluir} /> : <></>}
        </StyledFormulario>
    );
}

const ItemFormularioConnect = connect((state: any) => { 
    return {
        item: state.item.currentItem,
        status: state.item.status,
        error: state.item.error,
        categorias: state.item.categorias
    }
 })(ItemFormularioPage);

 
export default ItemFormularioConnect;