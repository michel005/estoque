import { Route, Routes } from "react-router-dom";
import DefaultMenu from "./components/DefaultMenu";
import AppStyled from "./App.style";
import { useContext } from "react";
import { ErrorContext } from "./hookies/context/ErrorContext";
import Message from "./components/Message";
import ItemPage from "./paginas/ItemPage";
import FornecedorPage from "./paginas/FornecedorPage";
import EntradaPage from "./paginas/EntradaPage";
import { CRUDContext } from "./hookies/context/CRUDContext";
import { STATUS } from "./hookies/useFormulario";
import ItemFormularioPage from "./paginas/ItemFormularioPage";
import FornecedorFormularioPage from "./paginas/FornecedorFormularioPage";
import EntradaFormularioPage from "./paginas/EntradaFormularioPage";

function App() {
    const error = useContext(ErrorContext);
    const crud = useContext(CRUDContext);

    return (
        <AppStyled>
            <DefaultMenu />
            <div className="Content">
                <div className="TamanhoTela">
                    {
                        <Routes>
                            <Route path="/" element={<h1>Início</h1>} />
                            <Route path="/fornecedores" element={<FornecedorPage />} />
                            <Route path="/itens" element={<ItemPage />} />
                            <Route path="/entradas" element={<EntradaPage />} />
                            <Route path="/saidas" element={<h1>Saídas</h1>} />
                            <Route path="/inventario" element={<h1>Inventário</h1>} />
                            <Route path="/faturamento" element={<h1>Faturamento</h1>} />
                        </Routes>
                    }
                </div>
            </div>
            <>{console.log(error.error)}</>
            
            {crud.item.form.status !== STATUS.OCIOSO && <ItemFormularioPage />}
            {crud.fornecedor.form.status !== STATUS.OCIOSO && <FornecedorFormularioPage />}
            {crud.entrada.form.status !== STATUS.OCIOSO && <EntradaFormularioPage />}
            {error.error !== null && <Message title={error.error.title} text={error.error.body} closeEvent={() => error.setError(null)} />}
        </AppStyled>
    );
}

export default App;
