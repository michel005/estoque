export default class ValueUtils {
    static valueById(id: string) {
        var objeto: any = document.getElementById(id);
        return objeto !== undefined && objeto !== null ? (objeto.value === "" ? null : objeto.value) : null;
    }
}
