import { faCalendar, faDollarSign, faFile, faFolderMinus, faHashtag, faIdCard, faList, faListAlt, faLocationArrow, faMailBulk, faMap, faMapMarker, faMapPin, faMoneyBill, faPhone, faSimCard, faSitemap, faSortNumericUp, faStreetView, faSync, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DateUtils from "../utils/DateUtils";
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const tipoPessoaType = { F: 'Física', J: 'Jurídica' };
const statusType = { PENDENTE: 'Pendente', APROVADO: 'Aprovado', CANCELADO: 'Cancelado' };

/**
 * [modulo]: {
 *     [coluna]: {
 *         name: Nome descritivo da coluna
 *         icon: Icone utilizado no cabecalho da coluna e campo descritivo
 *         titleColumn: Coluna reançada quando um registro é expandido
 *         filtered: O campo sera enviado no evento filter
 *         convert: Caso informado converte a lista em um componente selecionavel de filtro e converte chave em valor
 *         filterVisible: Mostra o filtro por padrão
 *         defaultFilterValue: Valor inicial do filtro
 *         order: Campo sera enviado como valor no parametro sortBy
 *         startOrder: Ao entrar na tabela pela primeira vez, esta sera a primeira coluna a ser ordenada. Caso não seja informado, usara o primeiro campo com order preenchido
 *         align: Alinha o conteudo da coluna para o centro (center) ou direita (right)
 *         money: Formata o valor da coluna como dinheiro brasileiro (R$)
 *         getValue: Função para pegar o valor ou manipula-lo de outra forma
 *         visible: Mostra a coluna na tabela
 *     }
 * }
 */
export default class ColumnsDefinitions {
    static definition = {
        item: {
            columnMapper: {
                id: {
                    name: 'ID',
                    icon: <FontAwesomeIcon icon={solid('hashtag')} />
                },
                nome: {
                    name: 'Nome do Item',
                    titleColumn: true,
                    icon: <FontAwesomeIcon icon={solid('id-card')} />,
                    filtered: true,
                    order: 'item.nome',
                    startOrder: true
                },
                categoria: {
                    name: 'Categoria',
                    icon: <FontAwesomeIcon icon={solid('list')} />,
                    filtered: true,
                    order: 'item.categoria'
                },
                quantidade: {
                    name: 'Quantidade',
                    icon: <FontAwesomeIcon icon={solid('sort-numeric-up')} />,
                    align: 'center'
                },
                minValor: {
                    name: 'Valor Mínimo',
                    align: 'right',
                    money: true,
                    icon: <FontAwesomeIcon icon={solid('money-bill')} />
                },
                maxValor: {
                    name: 'Valor Máximo',
                    align: 'right',
                    money: true,
                    icon: <FontAwesomeIcon icon={solid('money-bill')} />
                }
            }
        },
        fornecedor: {
            columnMapper: {
                id: {
                    name: 'ID',
                    icon: <FontAwesomeIcon icon={solid('hashtag')} />,
                    order: 'id'
                },
                nome: {
                    name: 'Nome',
                    titleColumn: true,
                    icon: <FontAwesomeIcon icon={solid('folder-minus')} />,
                    filtered: true,
                    order: 'nome',
                    startOrder: true
                },
                tipoPessoa: {
                    name: 'Tipo Pessoa',
                    convert: tipoPessoaType,
                    icon: <FontAwesomeIcon icon={solid('user')} />,
                    filtered: true,
                    order: 'tipoPessoa'
                },
                cpfCnpj: {
                    name: 'CPF/CNPJ',
                    icon: <FontAwesomeIcon icon={solid('id-card')} />,
                    filtered: true,
                    order: 'cpfCnpj'
                },
                telefone: {
                    name: 'Telefone',
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid('phone')} />
                },
                email: {
                    name: 'E-mail',
                    icon: <FontAwesomeIcon icon={solid('mail-bulk')} />
                },
                cidade: {
                    name: 'Cidade',
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid('location-arrow')} />
                },
                estado: {
                    name: 'Estado',
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid('map')} />
                },
                pais: {
                    name: 'País',
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid('map-pin')} />
                },
                cep: {
                    name: 'CEP',
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid('map-marker')} />
                },
                rua: {
                    name: 'Rua',
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid('sitemap')} />
                },
                numero: {
                    name: 'Número',
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid('sort-numeric-up')} />
                },
                bairro: {
                    name: 'Bairro',
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid('street-view')} />
                },
                complemento: {
                    name: 'Complemento',
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid('file')} />
                }
            }
        },
        entrada: {
            columnMapper: {
                id: {
                    name: 'ID',
                    icon: <FontAwesomeIcon icon={solid('hashtag')} />,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.id;
                    },
                    order: 'id'
                },
                dataEntrada: {
                    name: 'Data Entrada',
                    icon: <FontAwesomeIcon icon={solid('calendar')} />,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.dataEntrada;
                    },
                    filtered: true,
                    filterVisible: false,
                    date: true, 
                    defaultFilterValue: DateUtils.stringJustDate(new Date()),
                    order: 'dataEntrada',
                    startOrder: true
                },
                descricao: {
                    name: 'Descricao',
                    titleColumn: true,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.descricao;
                    },
                    filtered: true,
                    icon: <FontAwesomeIcon icon={solid('file')} />,
                    order: 'descricao'
                },
                status: {
                    name: 'Situação',
                    icon: <FontAwesomeIcon icon={solid('sync')} />,
                    filtered: true,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.status;
                    },
                    convert: statusType,
                    order: 'status'
                },
                fornecedor: {
                    name: 'Fornecedor',
                    nameDesc: 'Nome Completo',
                    icon: <FontAwesomeIcon icon={solid('sim-card')} />,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.nome;
                    },
                    order: 'fornecedor.nome'
                },
                tipoPessoa: {
                    name: 'Tipo Pessoa',
                    icon: <FontAwesomeIcon icon={solid('sim-card')} />,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.tipoPessoa;
                    },
                    convert: tipoPessoaType,
                    visible: false,
                    order: 'fornecedor.tipoPessoa'
                },
                cpfCnpj: {
                    name: 'CPF/CNPJ',
                    icon: <FontAwesomeIcon icon={solid('sim-card')} />,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.cpfCnpj;
                    },
                    visible: false,
                    order: 'fornecedor.cpfCnpj'
                },
                fornecedorEmail: {
                    name: 'E-mail',
                    icon: <FontAwesomeIcon icon={solid('mail-bulk')} />,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.email;
                    },
                    visible: false
                },
                valor: {
                    name: 'Valor Total',
                    icon: <FontAwesomeIcon icon={solid('dollar-sign')} />,
                    getValue: (reg: any) => {
                        return reg.itens.map((e: any) => e.valor).reduce((prev: any, curr: any) => prev + curr, 0);
                    },
                    money: true,
                    visible: false,
                    align: 'right'
                },
                quantidadeItens: {
                    name: 'Lista Itens',
                    icon: <FontAwesomeIcon icon={solid('list-alt')} />,
                    getValue: (reg: any) => {
                        return reg.itens.length;
                    },
                    align: 'right',
                    visible: false
                },
                quantidade: {
                    name: 'Qtde. de Itens',
                    icon: <FontAwesomeIcon icon={solid('list')} />,
                    getValue: (reg: any) => {
                        return reg.itens.map((e: any) => e.quantidade).reduce((prev: any, curr: any) => prev + curr, 0);
                    },
                    align: 'right',
                    visible: false
                }
            }
        }
    }
}