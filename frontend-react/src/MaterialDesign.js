import ItemAction from './actions/ItemAction';
import './App.scss';
import ButtonStyled from './components/ButtonStyled';
import CheckboxField from './components/forms/CheckboxField';
import Form from './components/forms/Form';
import SelectField from './components/forms/SelectField';
import TextField from './components/forms/TextField';
import store from './store';

const validacaoCheckbox = () => {
    if (document.getElementById('textField').value === '') {
        return 'Preencha o campo de texto!';
    } else
    if (document.getElementById('passwordField').value === '') {
        return 'Preencha o campo de senha!';
    } else
    if (document.getElementById('emailField').value === '') {
        return 'Preencha o campo de e-mail!';
    }
    return '';
};

const validacaoSelect = () => {
    if (document.getElementById('textField').value === '') {
        return 'Preencha o campo de texto!';
    }
    return '';
};

const eventoAdicionar = () => {
    console.log(store);
    store.dispatch(ItemAction.cadastrar( { id: store.getState().itens.length + 1, nome: document.getElementById('nomeItemField').value } ));
    document.getElementById('nomeItemField').value = '';
    console.log(store.getState());
}

function MaterialDesign() {
    return (
        <div className="App">
            <div>
                <div className="linhaExemplo">
                    <h2>Cadastro de Itens</h2>
                </div>
                <div className="linhaExemplo">
                    <TextField fieldID="nomeItemField" label="Nome do Item" />
                </div>
                <div className="linhaExemplo">
                    <ul>
                        {store.getState().itens.map((item, index) => {
                            return ( <li>{item.nome}</li> );
                        })}
                    </ul>
                </div>
                <div className="linhaExemplo">
                    <ButtonStyled onClick={eventoAdicionar}>Cadastrar</ButtonStyled>
                </div>
                <div className="linhaExemplo">
                    <h1>Material Design</h1>
                </div>
                <div className="linhaExemplo">
                    <h2>Botões</h2>
                </div>
                <div className="linhaExemplo">
                    <ButtonStyled onClick={eventoAdicionar}>Exemplo</ButtonStyled>
                    <ButtonStyled className='primary' onClick={() => alert('Primary')}>Exemplo</ButtonStyled>
                    <ButtonStyled className='alert' onClick={() => alert('Alert')}>Exemplo</ButtonStyled>
                    <ButtonStyled disabled onClick={() => alert('Alert')}>Exemplo</ButtonStyled>
                    <ButtonStyled disabled className='primary' onClick={() => alert('Primary')}>Exemplo</ButtonStyled>
                    <ButtonStyled disabled className='alert' onClick={() => alert('Alert')}>Exemplo</ButtonStyled>
                </div>
                <div className="linhaExemplo">
                    <h2>Inputs</h2>
                </div>
                <div className="linhaExemplo">
                    <TextField fieldID="textField" label="Text Field" />
                    <TextField fieldID="textFieldNotNulable" label="Text Field Not Nullable" nullable={false} />
                    <TextField fieldID="passwordField" label="Password Field" type="Password" placeholder="Campo opcional" />
                    <TextField fieldID="emailField" label="E-mail Field" type="Email" />
                </div>
                <div className="linhaExemplo">
                    <SelectField fieldID="selectField" label="Select Field" list={['Exemplo 1', 'Exemplo 2']} />
                    <SelectField fieldID="selectFieldNotNullable" label="Select Field Not Nullable" placeholder="Informe um valor" list={['Exemplo 1', 'Exemplo 2']} nullable={false} />
                    <SelectField fieldID="selectFieldValidated" label="Select Field Validated" list={['Exemplo 1', 'Exemplo 2']} validation={() => validacaoSelect()} />
                </div>
                <div className="linhaExemplo">
                    <CheckboxField fieldID="checkboxField" label="Checkbox Field With Validation" validation={() => validacaoCheckbox()} />
                    <CheckboxField fieldID="checkboxFieldChecked" label="Checkbox Field Checked" value={true} />
                    <CheckboxField fieldID="checkboxFieldWithError" label="Checkbox Field With Error" error="Erro de exemplo" />
                </div>
                <div className="linhaExemplo">
                    <h2>Formulário</h2>
                </div>
                <div className="linhaExemplo">
                    <Form content={
                        <>
                            <TextField fieldID="textFieldOnForm" label="Text Field on Form" />
                            <TextField fieldID="textFieldOnForm2" label="Text Field on Form" />
                            <TextField fieldID="textFieldOnForm3" label="Text Field on Form" />
                        </>
                    } />
                </div>
            </div>
        </div>
    );
}

export default MaterialDesign;