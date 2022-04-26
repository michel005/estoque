export default class ConvertUtils {
    static listOnText(list, value) {
        return list[value] === undefined ? '' : list[value];
    }
}