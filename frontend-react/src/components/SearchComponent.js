import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FornecedorAction from '../actions/FornecedorAction';
import PaginaAction from '../actions/PaginaAction';
import API from '../API';
import store from '../store';

const SearchStyle = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
width: 100%;

* {
    transition: all 0.25s;
}

input[type="text"] {
    background-color: #fff6;
    border: 0px;
    border-radius: 4px;
    color: #fff;
    height: 36px;
    padding: 14px;
    outline: none;
    width: 450px;

    &::placeholder {
        color: #fff9;
        box-shadow: none;
    }

    &:focus {
        background-color: #fff;
        border-radius: 4px;
        color: #333;
        width: 600px;
    }
}

.caixaBuscaContainer {
    background-color: #0009;
    backdrop-filter: blur(15px);
    border-radius: 4px;
    display: none;
    flex-direction: column;
    opacity: 0;
    padding: 7px;
    position: fixed;
    top: 50px;
    width: 600px;
    z-index: 0;

    .resultado {
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        padding: 7px;
        font-size: 14px;
        font-weight: normal;

        &:hover {
            background-color: #39f3;
        }

        .descricao {
            color: #fff;
            font-weight: bold;
        }

        &.selecionado {
            background-color: #39f;
            color: #999;
        }
    }
}

&.mostrar {
    z-index: 100;
    
    input[type="text"] {
        background-color: #fff;
        border-radius: 4px 4px 0px 0px;
        color: #333;
        width: 600px;

        &::placeholder {
            color: #3339;
            box-shadow: none;
        }
    }

    .caixaBuscaContainer {
        border-radius: 0px 0px 4px 4px;
        display: flex;
        opacity: 1;
    }
}

`;

export default function SearchComponent() {

    const comandos = [
        { comando: 'fornecedor', evento: null, texto: 'Fornecedor...' },
        { comando: 'fornecedor index', evento: indexFornecedor, texto: 'Gestão de Fornecedores' },
        { comando: 'fornecedor cadastrar', evento: cadastrarFornecedor, texto: 'Cadastrar um novo fornecedor' },
        { comando: 'fornecedor alterar', evento: alterarFornecedor, texto: 'Alterar um fornecedor existente' }
    ];
    const [resultados, setResultados] = useState([]);
    const [selecionado, setSelecionado] = useState(null);
    const navigate = useNavigate();

    function eventoBuscar(e, cont = true) {
        var valor = document.getElementById('buscaGeral').value;
        
        console.log(cont);
        if (e.key === 'ArrowUp') {
            if (selecionado == null) {
                setSelecionado(resultados[resultados.length - 1]);
            } else {
                var index = resultados.indexOf(selecionado);
                if (index === 0) {
                    setSelecionado(resultados[resultados.length - 1]);
                } else {
                    setSelecionado(resultados[index - 1]);
                }
            }
        } else
        if (e.key === 'ArrowDown') {
            if (selecionado == null) {
                setSelecionado(resultados[0]);
            } else {
                var index = resultados.indexOf(selecionado);
                if ((index + 1) > (resultados.length - 1)) {
                    setSelecionado(resultados[0]);
                } else {
                    setSelecionado(resultados[index + 1]);
                }
            }
        } else
        if (e.key === 'ArrowRight') {
            document.getElementById('buscaGeral').value = selecionado.comando + ' ';
            eventoBuscar({ key: '' }, false);
        } else
        if (e.key === 'Escape') {
            document.getElementById('buscaGeral').value = '';
            eventoBuscar({ key: '' }, false);
        } else
        if (e.key === 'Enter' && selecionado !== null && cont === true) {
            if (selecionado.evento !== null) {
                selecionado.evento(selecionado, document.getElementById('buscaGeral').value);
                document.getElementById('buscaGeral').value = '';
                eventoBuscar({ key: '' }, false);
            } else {
                document.getElementById('buscaGeral').value = selecionado.comando + ' ';
                eventoBuscar(e, false);
                document.getElementById('buscaGeral').focus();
            }
            setSelecionado(null);
        } else
        if (e.key === 'Enter' && cont === true) {
            if (valor.indexOf('>') !== -1) {
                comandos.filter((value) => value.evento !== null && valor.split('>')[0].trim().includes(value.comando)).forEach((value) => {
                    console.log(value);
                    value.evento(value, valor);
                    return value;
                });
                document.getElementById('buscaGeral').value = '';
                eventoBuscar({ key: '' }, false);
            }
            setSelecionado(null);
        } else
        if (valor.length < 3) {
            document.getElementsByClassName(SearchStyle.styledComponentId)[0].classList.remove('mostrar');
        } else {
            setSelecionado(null);
            document.getElementsByClassName(SearchStyle.styledComponentId)[0].classList.add('mostrar');
            var results = [];
            comandos.filter((value) => valor.includes(value.comando) || value.comando.includes(valor)).forEach((value, index) => {
                if (index <= 5) {
                    results.push(value);
                }
                return value;
            });
            if (results.length === 0) {
                results.push({ comando: valor, evento: null, texto: 'Nenhum resultado encontrado' })
            }
            setResultados(results);
        }
    }

    function cadastrarFornecedor(comando, busca) {
        store.dispatch(FornecedorAction.statusCadastrar());
        store.dispatch(PaginaAction.mudarPaginaAtual('cadastrarFornecedor'));
    }

    function alterarFornecedor(comando, busca) {
        var id = busca.split('>')[1];
        API.get('/fornecedor/buscarPorId?id=' + id).then((value) => {
            store.dispatch(FornecedorAction.statusAlterar(value.data));
            store.dispatch(PaginaAction.mudarPaginaAtual('cadastrarFornecedor'));
        });
    }

    function indexFornecedor(comando, busca) {
        store.dispatch(PaginaAction.mudarPaginaAtual('inicio'));
        store.dispatch(FornecedorAction.statusOcioso());
        navigate('/fornecedores')
    }


    function buscarFornecedor(comando, busca) {
        
    }

    function executaEvento(value) {
        document.getElementById('buscaGeral').value = value.comando + ' ';
        if (value.evento !== null) {
            value.evento(value, document.getElementById('buscaGeral').value);
            document.getElementById('buscaGeral').value = '';
            eventoBuscar({ key: '' }, false);
        } else {
            document.getElementById('buscaGeral').focus();
            eventoBuscar({ key: '' }, false);
        }
        setSelecionado(null);
    }

    return (
        <SearchStyle>
            <input type="text" id="buscaGeral" placeholder="Buscar" autoComplete="off" onKeyUp={(e) => { eventoBuscar(e) } } />
            <div className="caixaBuscaContainer">
                {
                    resultados.map((value, index) => {
                        return (
                            <div 
                            key={index} 
                            className={'resultado ' + (selecionado != null && selecionado === value ? 'selecionado' : '')} 
                            onClick={() => executaEvento(value)}>
                                {value.comando} <div className="descricao">{value.texto}</div>
                            </div>
                        );
                    })
                }
            </div>
        </SearchStyle>
    );

}