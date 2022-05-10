export default class ConvertUtils {
    static listOnText(list: [], value: any) {
        return list[value] === undefined ? '' : list[value];
    }
}