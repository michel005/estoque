import { faBahai, faDesktop, faDoorOpen, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EntradaAction from '../actions/EntradaAction';
import FornecedorAction from '../actions/FornecedorAction';
import ItemAction from '../actions/ItemAction';
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
    z-index: 10;

    &::placeholder {
        color: #fff9;
        box-shadow: none;
    }

    &:hover {
        background-color: #fff9;
    }

    &:focus {
        background-color: #fff;
        border-radius: 4px;
        color: #333;
        width: 600px;
    }
}

.caixaBuscaContainer {
    background-color: #fff;
    backdrop-filter: blur(15px);
    border-radius: 4px;
    display: none;
    flex-direction: column;
    padding: 7px;
    position: fixed;
    top: 50px;
    width: 600px;
    z-index: 0;

    .resultado {
        border-radius: 4px;
        color: #000;
        cursor: pointer;
        margin-bottom: 4px;
        padding: 7px;
        font-size: 14px;
        font-weight: normal;

        &:hover {
            background-color: #eee;
        }

        &.comando {
            .icone svg {
                font-size: 10px;
                margin-top: 5px;
                margin-right: 7px;
            }
        }

        .icone {
            display: flex;
            flex-direction: row;
            margin-bottom: 4px;

            svg {
                margin-top: 2px;
                margin-right: 7px;
            }
        }

        .descricao {
            color: #ccc;
            font-weight: bold;
        }

        &.selecionado {
            background-color: #39f;
            color: #999;
        }
    }

    .itemBusca {
        border-radius: 4px;
        color: #000;
        cursor: pointer;
        padding: 7px;
        font-size: 14px;
        font-weight: bold;

        svg {
            margin-right: 7px;
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
    }
}

`;

export default function SearchComponent() {

    const comandos = {
        fornecedor: {
            nome: 'Fornecedores',
            cadastrar: { fim: true, nome: 'Cadastrar um fornecedor', comando: eventoCadastrarFornecedor },
            alterar: {
                nome: 'Alterar um fornecedor',
                porCpf: { fim: true, nome: 'Por CPF/CNPJ', comando: eventoAlterarFornecedorCPF, hint: 'Informe o CPF/CNPJ', param: true },
                porID: { fim: true, nome: 'Por ID', comando: eventoAlterarFornecedorID, hint: 'Informe o ID', param: true },
                fim: false
            },
            excluir: {
                nome: 'Excluir um fornecedor',
                porCpf: { fim: true, nome: 'Por CPF/CNPJ', comando: eventoExcluirFornecedorCPF, hint: 'Informe o CPF/CNPJ', param: true },
                porID: { fim: true, nome: 'Por ID', comando: eventoExcluirFornecedorID, hint: 'Informe o ID', param: true },
                fim: false
            },
            inicio: { fim: true, nome: 'Pagina inicial', comando: eventoInicioFornecedor },
            fim: false
        },
        item: {
            nome: 'Itens',
            cadastrar: { fim: true, nome: 'Cadastrar um item', comando: eventoCadastrarItem },
            alterar: {
                nome: 'Alterar um item',
                porNome: { fim: true, nome: 'Por nome', comando: eventoAlterarItemNome, hint: 'Informe o nome do item', param: true },
                porID: { fim: true, nome: 'Por ID', comando: eventoAlterarItemID, hint: 'Informe o ID', param: true },
                fim: false
            },
            excluir: {
                nome: 'Excluir um item',
                porNome: { fim: true, nome: 'Por nome', comando: eventoExcluirItemNome, hint: 'Informe o nome do item', param: true },
                porID: { fim: true, nome: 'Por ID', comando: eventoExcluirItemID, hint: 'Informe o ID', param: true },
                fim: false
            },
            inicio: { fim: true, nome: 'Pagina inicial', comando: eventoInicioItem },
            fim: false
        },
        entrada: {
            nome: 'Eventos de Entrada',
            inicio: { fim: true, nome: 'Pagina inicial', comando: eventoInicioEntrada },
            fim: false
        },
        fim: false
    };
    const [buscaAtual, setBuscaAtual] = useState([]);
    const [resultados, setResultados] = useState([]);
    const navigate = useNavigate();

    function mostrarOpcoes(evento) {
        preencheSugestoes();
        if (evento.key === 'Enter') {
            eventoEnter()
        } else
        if (evento.key === 'Scape') {
            zerarBusca();
        }
    }

    function preencheSugestoes(ba = buscaAtual) {
        var opcoes = comandos;
        var baAux = ba;
        baAux.map((value) => {
            if (opcoes[value]) {
                opcoes = opcoes[value];
            }
            return value;
        });
        var resultadosAux = [];
        if (opcoes.fim === false) {
            var op = Object.keys(opcoes);
            op.filter((value) => value !== 'nome' && value !== 'fim').map((value) => {
                resultadosAux.push({ ...opcoes[value], nomeComando: value })
                return value;
            })
        }
        setResultados(resultadosAux);
    }

    function eventoEnter() {
        var opcoes = comandos;
        buscaAtual.map((value) => {
            if (opcoes[value] !== undefined) {
                opcoes = opcoes[value];
            }
            return value;
        });
        if (opcoes.fim === true) {
            opcoes.comando(document.getElementById('buscaGeral').value);
            zerarBusca();
        } else
        if (opcoes[document.getElementById('buscaGeral').value].fim === true) {
            if (opcoes[document.getElementById('buscaGeral').value].param !== undefined && opcoes[document.getElementById('buscaGeral').value].param === true) {
                if (document.getElementById('buscaGeral').value.trim().length !== 0) {
                    setBuscaAtual([ ...buscaAtual, document.getElementById('buscaGeral').value ]);
                }
            
                preencheSugestoes([ ...buscaAtual, document.getElementById('buscaGeral').value ]);
            } else {
                opcoes[document.getElementById('buscaGeral').value].comando(document.getElementById('buscaGeral').value);
                zerarBusca();
            }
        } else {
            if (document.getElementById('buscaGeral').value.trim().length !== 0) {
                setBuscaAtual([ ...buscaAtual, document.getElementById('buscaGeral').value ]);
            }
        
            preencheSugestoes([ ...buscaAtual, document.getElementById('buscaGeral').value ]);
        }
        document.getElementById('buscaGeral').value = '';
    }

    function proximoComando(com) {
        var valores = buscaAtual;
        valores.push(com.nomeComando);
        setBuscaAtual(valores)
        mostrarOpcoes({ key: '' })
    }

    function zerarBusca() {
        document.getElementById('buscaGeral').value = '';
        setResultados([]);
        setBuscaAtual([]);
    }

    function executaComando(ex) {
        if (!ex.param || ex.param === false) {
            ex.comando();
            zerarBusca();
        } else {
            proximoComando(ex);
            document.getElementById('buscaGeral').focus();
        }
    }

    function eventoCadastrarFornecedor() {
        navigate('/fornecedores');
        store.dispatch(FornecedorAction.statusOcioso());
        setTimeout(() => {
            store.dispatch(FornecedorAction.statusCadastrar());
        }, 100);
    }

    function eventoAlterarFornecedorCPF(cpfCnpj) {
        navigate('/fornecedores');
        API.post('/fornecedor/buscaPaginadaPorTermos?pagina=0&tamanho=1', { nome: '', cpfCnpj: cpfCnpj, tipoPessoa: '', orderBy: 'nome', orderByDirection: 'asc' }).then((value) => {
            store.dispatch(FornecedorAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(FornecedorAction.statusAlterar(value.data.content[0]));
            }, 100);
        });
    }

    function eventoAlterarFornecedorID(id) {
        navigate('/fornecedores');
        API.get('/fornecedor/buscarPorId?id=' + id).then((value) => {
            store.dispatch(FornecedorAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(FornecedorAction.statusAlterar(value.data));
            }, 100);
        })
    }

    function eventoExcluirFornecedorCPF(cpfCnpj) {
        navigate('/fornecedores');
        API.post('/fornecedor/buscaPaginadaPorTermos?pagina=0&tamanho=1', { nome: '', cpfCnpj: cpfCnpj, tipoPessoa: '', orderBy: 'nome', orderByDirection: 'asc' }).then((value) => {
            store.dispatch(FornecedorAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(FornecedorAction.statusExcluir(value.data.content[0]));
            }, 100);
        });
    }

    function eventoExcluirFornecedorID(id) {
        navigate('/fornecedores');
        API.get('/fornecedor/buscarPorId?id=' + id).then((value) => {
            store.dispatch(FornecedorAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(FornecedorAction.statusExcluir(value.data));
            }, 100);
        })
    }

    function eventoInicioFornecedor() {
        store.dispatch(FornecedorAction.statusOcioso());
        navigate('/fornecedores');
    }

    function eventoCadastrarItem() {
        navigate('/itens');
        store.dispatch(ItemAction.statusOcioso());
        setTimeout(() => {
            store.dispatch(ItemAction.statusCadastrar());
        }, 100);
    }

    function eventoAlterarItemNome(nome) {
        navigate('/itens');
        API.get('/item/buscaPorNome?nome=' + nome).then((value) => {
            store.dispatch(ItemAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(ItemAction.statusAlterar(value.data));
            }, 100);
        });
    }

    function eventoAlterarItemID(id) {
        navigate('/itens');
        API.get('/item/buscarPorId?id=' + id).then((value) => {
            store.dispatch(ItemAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(ItemAction.statusAlterar(value.data));
            }, 100);
        });
    }

    function eventoExcluirItemNome(nome) {
        navigate('/itens');
        API.get('/item/buscaPorNome?nome=' + nome).then((value) => {
            store.dispatch(ItemAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(ItemAction.statusExcluir(value.data));
            }, 100);
        });
    }

    function eventoExcluirItemID(id) {
        navigate('/itens');
        API.get('/item/buscarPorId?id=' + id).then((value) => {
            store.dispatch(ItemAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(ItemAction.statusExcluir(value.data));
            }, 100);
        });
    }

    function eventoInicioItem() {
        store.dispatch(ItemAction.statusOcioso());
        navigate('/itens');
    }

    function eventoInicioEntrada() {
        store.dispatch(EntradaAction.statusOcioso());
        navigate('/entradas');
    }

    return (
        <SearchStyle className={resultados.length === 0 && buscaAtual.length === 0 ? '' : 'mostrar'}>
            <div className="busca">
                <input type="text" id="buscaGeral" placeholder="Buscar" autoComplete="off" onClick={(e) => mostrarOpcoes(e)} onKeyUp={(e) => mostrarOpcoes(e)} />
            </div>
            <div className="caixaBuscaContainer">
                {buscaAtual.length === 0 ? <></> :
                <div className="itemBusca">
                    <FontAwesomeIcon icon={faDesktop} />
                    {
                        buscaAtual.map((value, index) => {
                            return (
                                (index === 0 ? '' : ' > ') + value
                            );
                        })
                    }
                </div> }
                {
                    resultados.map((value, index) => {
                        if (value.fim === false) {
                            return (
                                <div 
                                key={index} 
                                className='resultado' onClick={() => proximoComando(value)}>
                                    <div className='icone'><FontAwesomeIcon icon={faBahai} /> {value.nomeComando}</div> <div className="descricao">{value.nome}</div>
                                </div>
                            );
                        } else {
                            return (
                                <div 
                                key={index} 
                                className='resultado comando' onClick={() => executaComando(value)}>
                                    <div className='icone'><FontAwesomeIcon icon={faPlay} /> {value.nomeComando}</div> <div className="descricao">{value.nome}</div>
                                </div>
                            );
                        }
                    })
                }
                <div className='resultado' onClick={zerarBusca}>
                    <div className='icone'><FontAwesomeIcon icon={faDoorOpen} /> Fechar busca</div>
                </div>
            </div>
        </SearchStyle>
    );

}