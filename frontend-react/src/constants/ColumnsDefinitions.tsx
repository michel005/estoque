import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DateUtils from "../utils/DateUtils";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import EntradaStatusType from "./EntradaStatusType";

const tipoPessoaType = { F: "Física", J: "Jurídica" };

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
    static savedValues = {
        item: {},
        fornecedor: {},
        entrada: {},
    };
    static definition = {
        item: {
            savedValues: {},
            columnMapper: {
                id: {
                    name: "ID",
                    icon: <FontAwesomeIcon icon={solid("hashtag")} />,
                    width: "80px",
                },
                nome: {
                    name: "Nome do Item",
                    titleColumn: true,
                    icon: <FontAwesomeIcon icon={solid("id-card")} />,
                    filtered: true,
                    order: "item.nome",
                    startOrder: true,
                },
                categoria: {
                    name: "Categoria",
                    icon: <FontAwesomeIcon icon={solid("list")} />,
                    filtered: true,
                    order: "item.categoria",
                    width: "200px",
                },
                quantidade: {
                    name: "Qtd. (Hoje)",
                    icon: <FontAwesomeIcon icon={solid("sort-numeric-up")} />,
                    align: "center",
                    width: "150px",
                },
                minValor: {
                    name: "Valor Mínimo",
                    align: "right",
                    money: true,
                    icon: <FontAwesomeIcon icon={solid("money-bill")} />,
                    width: "180px",
                },
                maxValor: {
                    name: "Valor Máximo",
                    align: "right",
                    money: true,
                    icon: <FontAwesomeIcon icon={solid("money-bill")} />,
                    width: "180px",
                },
            },
        },
        fornecedor: {
            savedValues: {},
            columnMapper: {
                id: {
                    name: "ID",
                    icon: <FontAwesomeIcon icon={solid("hashtag")} />,
                    order: "id",
                    width: "80px",
                },
                nome: {
                    name: "Nome",
                    titleColumn: true,
                    icon: <FontAwesomeIcon icon={solid("folder-minus")} />,
                    filtered: true,
                    order: "nome",
                    startOrder: true,
                },
                tipoPessoa: {
                    name: "Tipo Pessoa",
                    convert: tipoPessoaType,
                    icon: <FontAwesomeIcon icon={solid("user")} />,
                    filtered: true,
                    order: "tipoPessoa",
                    width: "140px",
                },
                cpfCnpj: {
                    name: "CPF/CNPJ",
                    icon: <FontAwesomeIcon icon={solid("id-card")} />,
                    filtered: true,
                    order: "cpfCnpj",
                    width: "160px",
                },
                telefone: {
                    name: "Telefone",
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid("phone")} />,
                    width: "160px",
                },
                email: {
                    name: "E-mail",
                    icon: <FontAwesomeIcon icon={solid("mail-bulk")} />,
                    order: "email",
                    width: "300px",
                },
                cidade: {
                    name: "Cidade",
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid("location-arrow")} />,
                    width: "160px",
                },
                estado: {
                    name: "Estado",
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid("map")} />,
                    width: "160px",
                },
                pais: {
                    name: "País",
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid("map-pin")} />,
                    width: "160px",
                },
                cep: {
                    name: "CEP",
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid("map-marker")} />,
                    width: "130px",
                },
                rua: {
                    name: "Rua",
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid("sitemap")} />,
                },
                numero: {
                    name: "Número",
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid("sort-numeric-up")} />,
                },
                bairro: {
                    name: "Bairro",
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid("street-view")} />,
                },
                complemento: {
                    name: "Complemento",
                    visible: false,
                    icon: <FontAwesomeIcon icon={solid("file")} />,
                },
            },
        },
        entrada: {
            savedValues: {},
            columnMapper: {
                id: {
                    name: "ID",
                    icon: <FontAwesomeIcon icon={solid("hashtag")} />,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.id;
                    },
                    order: "id",
                    width: "80px",
                },
                dataEntrada: {
                    name: "Data Entrada",
                    icon: <FontAwesomeIcon icon={solid("calendar")} />,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.dataEntrada;
                    },
                    filtered: true,
                    filterVisible: false,
                    date: true,
                    defaultFilterValue: DateUtils.stringJustDate(new Date()),
                    order: "dataEntrada",
                    startOrder: true,
                    width: "180px",
                },
                descricao: {
                    name: "Descricao",
                    titleColumn: true,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.descricao;
                    },
                    filtered: true,
                    icon: <FontAwesomeIcon icon={solid("file")} />,
                    order: "descricao",
                },
                status: {
                    name: "Situação",
                    icon: <FontAwesomeIcon icon={solid("sync")} />,
                    filtered: true,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.status;
                    },
                    convert: EntradaStatusType,
                    order: "status",
                    width: "120px",
                },
                fornecedor: {
                    name: "Fornecedor",
                    nameDesc: "Nome Completo",
                    icon: <FontAwesomeIcon icon={solid("sim-card")} />,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.nome;
                    },
                    order: "fornecedor.nome",
                    width: "250px",
                },
                tipoPessoa: {
                    name: "Tipo Pessoa",
                    icon: <FontAwesomeIcon icon={solid("sim-card")} />,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.tipoPessoa;
                    },
                    convert: tipoPessoaType,
                    visible: false,
                    order: "fornecedor.tipoPessoa",
                    width: "140px",
                },
                cpfCnpj: {
                    name: "CPF/CNPJ",
                    icon: <FontAwesomeIcon icon={solid("sim-card")} />,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.cpfCnpj;
                    },
                    visible: false,
                    order: "fornecedor.cpfCnpj",
                    width: "160px",
                },
                fornecedorEmail: {
                    name: "E-mail",
                    icon: <FontAwesomeIcon icon={solid("mail-bulk")} />,
                    getValue: (reg: any) => {
                        return reg.eventoEntrada.fornecedor === null ? null : reg.eventoEntrada.fornecedor.email;
                    },
                    visible: false,
                },
                quantidadeItens: {
                    name: "Itens",
                    icon: <FontAwesomeIcon icon={solid("list-alt")} />,
                    getValue: (reg: any) => {
                        return reg.itens.length;
                    },
                    align: "right",
                    visible: false,
                    width: "120px",
                },
                quantidade: {
                    name: "Unidades",
                    icon: <FontAwesomeIcon icon={solid("list")} />,
                    getValue: (reg: any) => {
                        return reg.itens.map((e: any) => e.quantidade).reduce((prev: any, curr: any) => prev + curr, 0);
                    },
                    align: "right",
                    visible: false,
                    width: "120px",
                },
                valor: {
                    name: "Valor Total",
                    icon: <FontAwesomeIcon icon={solid("dollar-sign")} />,
                    getValue: (reg: any) => {
                        return reg.itens.map((e: any) => e.valor).reduce((prev: any, curr: any) => prev + curr, 0);
                    },
                    money: true,
                    visible: false,
                    align: "right",
                    width: "180px",
                },
            },
        },
    };
}
