export default class ConvertUtils {
    static listOnText(list: [], value: any) {
        return list[value] === undefined ? "" : list[value];
    }

    static moneyFormat(value) {
        var moneyFormater = Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
        return moneyFormater.format(value);
    }

    static firstUpperCase(texto: any) {
        return texto.substr(0, 1).toUpperCase() + texto.substr(1);
    }
}
