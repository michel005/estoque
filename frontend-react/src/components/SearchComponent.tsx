import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EntradaAction from '../actions/EntradaAction';
import FornecedorAction from '../actions/FornecedorAction';
import ItemAction from '../actions/ItemAction';
import API from '../API';
import store from '../store';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

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
            inicio: { fim: true, nome: 'Pagina inicial', comando: eventoInicioFornecedor },
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
            fim: false
        },
        item: {
            nome: 'Itens',
            inicio: { fim: true, nome: 'Pagina inicial', comando: eventoInicioItem },
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
            fim: false
        },
        entrada: {
            nome: 'Eventos de Entrada',
            inicio: { fim: true, nome: 'Pagina inicial', comando: eventoInicioEntrada },
            cadastrar: { fim: true, nome: 'Cadastrar um evento de entrada', comando: eventoCadastrarEntrada },
            fim: false
        },
        fim: false
    };
    const [buscaAtual, setBuscaAtual] = useState<any>([]);
    const [resultados, setResultados] = useState<any>([]);
    const navigate = useNavigate();

    function mostrarOpcoes(evento:any) {
        var buscaGeral : any = document.getElementById('buscaGeral');
        preencheSugestoes();
        if (evento.key === 'Enter') {
            eventoEnter(buscaAtual);
            buscaGeral.value = '';
        } else
        if (evento.key === 'Scape') {
            zerarBusca();
        }
    }

    function preencheSugestoes(ba : any = buscaAtual) {
        var buscaGeral : any = document.getElementById('buscaGeral');
        var opcoes: any = comandos;
        var baAux = ba;
        baAux.map((value: any) => {
            if (opcoes[value]) {
                opcoes = opcoes[value];
            }
            return value;
        });
        var resultadosAux : any = [];
        if (opcoes.fim === false) {
            var op = Object.keys(opcoes);
            op.filter((value) => value !== 'nome' && value !== 'fim' && value.match(buscaGeral.value)).map((value) => {
                resultadosAux.push({ ...opcoes[value], nomeComando: value })
                return value;
            })
        }
        setResultados(resultadosAux);
    }

    function eventoEnter(buscaAtu = buscaAtual) {
        var buscaGeral : any = document.getElementById('buscaGeral');
        var opcoes : any = comandos;
        buscaAtual.map((value: any) => {
            if (opcoes[value] !== undefined) {
                opcoes = opcoes[value];
            }
            return value;
        });
        if (opcoes.fim === true) {
            opcoes.comando(buscaGeral.value);
            zerarBusca();
        } else
        if (opcoes[buscaGeral.value].fim === true) {
            if (opcoes[buscaGeral.value].param !== undefined && opcoes[buscaGeral.value].param === true) {
                if (buscaGeral.value.trim().length !== 0) {
                    setBuscaAtual([ ...buscaAtual, buscaGeral.value ]);
                }
            
                preencheSugestoes([ ...buscaAtual, buscaGeral.value ]);
            } else {
                opcoes[buscaGeral.value].comando(buscaGeral.value);
                zerarBusca();
            }
        } else {
            if (buscaGeral.value.trim().length !== 0) {
                setBuscaAtual([ ...buscaAtual, buscaGeral.value ]);
            }
        
            preencheSugestoes([ ...buscaAtual, buscaGeral.value ]);
        }
        buscaGeral.value = '';
    }

    function proximoComando(com: any) {
        var valores = buscaAtual;
        valores.push(com.nomeComando);
        setBuscaAtual(valores)
        mostrarOpcoes({ key: '' })
    }

    function zerarBusca() {
        var buscaGeral : any = document.getElementById('buscaGeral');
        buscaGeral.value = '';
        setResultados([]);
        setBuscaAtual([]);
    }

    function executaComando(ex: any) {
        var buscaGeral : any = document.getElementById('buscaGeral');
        if (!ex.param || ex.param === false) {
            ex.comando();
            zerarBusca();
        } else {
            proximoComando(ex);
            buscaGeral.focus();
        }
    }

    function eventoCadastrarFornecedor() {
        navigate('/fornecedores');
        store.dispatch(FornecedorAction.statusOcioso());
        setTimeout(() => {
            store.dispatch(FornecedorAction.statusCadastrar());
        }, 100);
    }

    function eventoAlterarFornecedorCPF(cpfCnpj: string) {
        navigate('/fornecedores');
        API.post('/fornecedor/buscaPaginadaPorTermos?pagina=0&tamanho=1', { nome: '', cpfCnpj: cpfCnpj, tipoPessoa: '', orderBy: 'nome', orderByDirection: 'asc' }).then((value) => {
            store.dispatch(FornecedorAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(FornecedorAction.statusAlterar(value.data.content[0]));
            }, 100);
        });
    }

    function eventoAlterarFornecedorID(id: any) {
        navigate('/fornecedores');
        API.get('/fornecedor/buscarPorId?id=' + id).then((value) => {
            store.dispatch(FornecedorAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(FornecedorAction.statusAlterar(value.data));
            }, 100);
        })
    }

    function eventoExcluirFornecedorCPF(cpfCnpj: string) {
        navigate('/fornecedores');
        API.post('/fornecedor/buscaPaginadaPorTermos?pagina=0&tamanho=1', { nome: '', cpfCnpj: cpfCnpj, tipoPessoa: '', orderBy: 'nome', orderByDirection: 'asc' }).then((value) => {
            store.dispatch(FornecedorAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(FornecedorAction.statusExcluir(value.data.content[0]));
            }, 100);
        });
    }

    function eventoExcluirFornecedorID(id: any) {
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

    function eventoAlterarItemNome(nome: any) {
        navigate('/itens');
        API.get('/item/buscaPorNome?nome=' + nome).then((value) => {
            store.dispatch(ItemAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(ItemAction.statusAlterar(value.data));
            }, 100);
        });
    }

    function eventoAlterarItemID(id: any) {
        navigate('/itens');
        API.get('/item/buscarPorId?id=' + id).then((value) => {
            store.dispatch(ItemAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(ItemAction.statusAlterar(value.data));
            }, 100);
        });
    }

    function eventoExcluirItemNome(nome: any) {
        navigate('/itens');
        API.get('/item/buscaPorNome?nome=' + nome).then((value) => {
            store.dispatch(ItemAction.statusOcioso());
            setTimeout(() => {
                store.dispatch(ItemAction.statusExcluir(value.data));
            }, 100);
        });
    }

    function eventoExcluirItemID(id: any) {
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

    function eventoCadastrarEntrada() {
        navigate('/entradas');
        store.dispatch(EntradaAction.statusOcioso());
        setTimeout(() => {
            store.dispatch(EntradaAction.statusCadastrar());
        }, 100);
    }

    return (
        <SearchStyle className={resultados.length === 0 && buscaAtual.length === 0 ? '' : 'mostrar'}>
            <div className="busca">
                <input type="text" id="buscaGeral" placeholder="Buscar" autoComplete="off" onClick={(e) => mostrarOpcoes(e)} onKeyUp={(e) => mostrarOpcoes(e)} />
            </div>
            <div className="caixaBuscaContainer">
                {buscaAtual.length === 0 ? <></> :
                <div className="itemBusca">
                    <FontAwesomeIcon icon={solid("desktop")} />
                    {
                        buscaAtual.map((value: any, index: number) => {
                            return (
                                (index === 0 ? '' : ' > ') + value
                            );
                        })
                    }
                </div> }
                {
                    resultados.map((value: any, index: any) => {
                        if (value.fim === false) {
                            return (
                                <div 
                                key={index} 
                                className='resultado' onClick={() => proximoComando(value)}>
                                    <div className='icone'><FontAwesomeIcon icon={solid("bahai")} /> {value.nomeComando}</div> <div className="descricao">{value.nome}</div>
                                </div>
                            );
                        } else {
                            return (
                                <div 
                                key={index} 
                                className='resultado comando' onClick={() => executaComando(value)}>
                                    <div className='icone'><FontAwesomeIcon icon={solid("play")} /> {value.nomeComando}</div> <div className="descricao">{value.nome}</div>
                                </div>
                            );
                        }
                    })
                }
                <div className='resultado' onClick={zerarBusca}>
                    <div className='icone'><FontAwesomeIcon icon={solid("play")} /> Fechar busca</div>
                </div>
            </div>
        </SearchStyle>
    );

}