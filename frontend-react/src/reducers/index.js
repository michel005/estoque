import PaginaActionTypes from "../constants/PaginaActionTypes";
import EntradaActionTypes from "../constants/EntradaActionTypes";
import FornecedorActionTypes from "../constants/FornecedorActionTypes";
import ItemActionTypes from "../constants/ItemActionTypes";
import PaginaReducer from "./PaginaReducer";
import EntradaReducer from "./EntradaReducer";
import FornecedorReducer from "./FornecedorReducer";
import ItemReducer from "./ItemReducer";
import { faCalendar, faDollarSign, faFile, faFolderMinus, faHashtag, faIdCard, faList, faListAlt, faLocationArrow, faMailBulk, faMap, faMapMarker, faMapPin, faMoneyBill, faPhone, faSimCard, faSitemap, faSortNumericUp, faStreetView, faSync, faUser } from "@fortawesome/free-solid-svg-icons";
import TabelaActionTypes from "../constants/TabelaActionTypes";
import TabelaReducer from "./TabelaReducer";
import DateUtils from "../utils/DateUtils";

const tipoPessoaType = { F: 'Física', J: 'Jurídica' };
const statusType = { PENDENTE: 'Pendente', APROVADO: 'Aprovado', CANCELADO: 'Cancelado' };

const initialState = {
    appName: 'App4Store',
    pagina: {
        atual: 'inicio'
    },
    inicio: {

    },
    tabela: {
        item: {
            columnMapper: {
                id: {
                    name: 'ID',
                    style: 'colunaId',
                    icon: faHashtag
                },
                nome: {
                    name: 'Nome do Item',
                    titleColumn: true,
                    style: 'colunaNome',
                    icon: faIdCard,
                    filtered: true,
                    order: 'item.nome',
                    startOrder: true
                },
                categoria: {
                    name: 'Categoria',
                    icon: faList,
                    filtered: true,
                    order: 'item.categoria'
                },
                quantidade: {
                    name: 'Quantidade',
                    icon: faSortNumericUp,
                    align: 'center'
                },
                minValor: {
                    name: 'Valor Mínimo',
                    align: 'right',
                    money: true,
                    icon: faMoneyBill
                },
                maxValor: {
                    name: 'Valor Máximo',
                    align: 'right',
                    money: true,
                    icon: faMoneyBill
                }
            }
        },
        fornecedor: {
            columnMapper: {
                id: {
                    name: 'ID',
                    style: 'colunaId',
                    icon: faHashtag,
                    order: 'id'
                },
                nome: {
                    name: 'Nome',
                    titleColumn: true,
                    style: 'colunaNome',
                    icon: faFolderMinus,
                    filtered: true,
                    order: 'nome',
                    startOrder: true
                },
                tipoPessoa: {
                    name: 'Tipo Pessoa',
                    style: 'colunaTipoPessoa',
                    convert: tipoPessoaType,
                    icon: faUser,
                    filtered: true,
                    order: 'tipoPessoa'
                },
                cpfCnpj: {
                    name: 'CPF/CNPJ',
                    icon: faIdCard,
                    filtered: true,
                    order: 'cpfCnpj'
                },
                telefone: {
                    name: 'Telefone',
                    visible: false,
                    icon: faPhone
                },
                email: {
                    name: 'E-mail',
                    style: 'colunaEmail',
                    icon: faMailBulk
                },
                cidade: {
                    name: 'Cidade',
                    visible: false,
                    icon: faLocationArrow
                },
                estado: {
                    name: 'Estado',
                    visible: false,
                    icon: faMap
                },
                pais: {
                    name: 'País',
                    visible: false,
                    icon: faMapPin
                },
                cep: {
                    name: 'CEP',
                    visible: false,
                    icon: faMapMarker
                },
                rua: {
                    name: 'Rua',
                    visible: false,
                    icon: faSitemap
                },
                numero: {
                    name: 'Número',
                    visible: false,
                    icon: faSortNumericUp
                },
                bairro: {
                    name: 'Bairro',
                    visible: false,
                    icon: faStreetView
                },
                complemento: {
                    name: 'Complemento',
                    visible: false,
                    icon: faFile
                }
            }
        },
        entrada: {
            columnMapper: {
                id: {
                    name: 'ID',
                    style: 'colunaId',
                    icon: faHashtag,
                    getValue: (reg) => {
                        return reg.eventoEntrada.id;
                    },
                    order: 'id'
                },
                dataEntrada: {
                    name: 'Data Entrada',
                    icon: faCalendar,
                    style: 'colunaDataEntrada',
                    getValue: (reg) => {
                        return reg.eventoEntrada.dataEntrada;
                    },
                    filtered: true,
                    filterVisible: true,
                    date: true, 
                    defaultFilterValue: DateUtils.stringJustDate(new Date()),
                    order: 'dataEntrada',
                    startOrder: true
                },
                descricao: {
                    name: 'Descricao',
                    titleColumn: true,
                    getValue: (reg) => {
                        return reg.eventoEntrada.descricao;
                    },
                    filtered: true,
                    style: 'colunaDescricao',
                    icon: faFile,
                    order: 'descricao'
                },
                status: {
                    name: 'Situação',
                    icon: faSync,
                    filtered: true,
                    getValue: (reg) => {
                        return reg.eventoEntrada.status;
                    },
                    style: 'colunaStatus',
                    convert: statusType,
                    order: 'status'
                },
                fornecedor: {
                    name: 'Fornecedor',
                    nameDesc: 'Nome Completo',
                    icon: faSimCard,
                    getValue: (reg) => {
                        return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.nome;
                    }
                },
                tipoPessoa: {
                    name: 'Tipo Pessoa',
                    icon: faSimCard,
                    getValue: (reg) => {
                        return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.tipoPessoa;
                    },
                    convert: tipoPessoaType,
                    visible: false
                },
                cpfCnpj: {
                    name: 'CPF/CNPJ',
                    icon: faSimCard,
                    getValue: (reg) => {
                        return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.cpfCnpj;
                    },
                    visible: false
                },
                valor: {
                    name: 'Valor Total',
                    icon: faDollarSign,
                    getValue: (reg) => {
                        return reg.itens.map(e => e.valor).reduce((prev, curr) => prev + curr, 0);
                    },
                    money: true,
                    align: 'right',
                    style: 'colunaValor'
                },
                quantidadeItens: {
                    name: 'Lista Itens',
                    icon: faListAlt,
                    getValue: (reg) => {
                        return reg.itens.length;
                    },
                    visible: false
                },
                quantidade: {
                    name: 'Qtde. de Itens',
                    icon: faList,
                    getValue: (reg) => {
                        return reg.itens.map(e => e.quantidade).reduce((prev, curr) => prev + curr, 0);
                    },
                    align: 'right',
                    visible: false
                }
            }
        }
    },
    fornecedor: {
        status: FornecedorActionTypes.STATUS_OCIOSO,
        currentFornecedor: null,
        list: [],
        pageInfo: [],
        page: 0,
        size: 10,
        error: null,
        termo: null
    },
    item: {
        status: ItemActionTypes.STATUS_OCIOSO,
        categorias: [],
        currentItem: null,
        list: [],
        pageInfo: [],
        page: 0,
        size: 10,
        error: null,
        termo: ''
    },
    entrada: {
        status: EntradaActionTypes.STATUS_OCIOSO,
        termo: null,
        list: [],
        itemList: [],
        fornecedoresList: [],
        pageInfo: [],
        page: 0,
        size: 10,
        error: null
    }
};

function rootReducer(state = initialState, action) {
    if (action.type.module && action.type.module === TabelaActionTypes.MODULE) {
        return TabelaReducer(state, action);
    } else
    if (action.type.module && action.type.module === PaginaActionTypes.MODULE) {
        return PaginaReducer(state, action);
    } else
    if (action.type.module && action.type.module === ItemActionTypes.MODULE) {
        return ItemReducer(state, action);
    } else
    if (action.type.module && action.type.module === EntradaActionTypes.MODULE) {
        return EntradaReducer(state, action);
    } else
    if (action.type.module && action.type.module === FornecedorActionTypes.MODULE) {
        return FornecedorReducer(state, action);
    } else {
        return state;
    }
};

export default rootReducer;