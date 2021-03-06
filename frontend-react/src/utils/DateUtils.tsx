export default class DateUtils {
    static firstDayOfMonth(date = new Date()) {
        var temp = new Date(date);
        temp.setDate(1);
        return temp;
    }

    static lastDayOfMonth(date: Date) {
        var auxDate = new Date(date);
        var currentMonth = auxDate.getMonth();
        var lastDay = auxDate.getDate();

        while (currentMonth === auxDate.getMonth()) {
            auxDate.setDate(auxDate.getDate() + 1);
            if (currentMonth === auxDate.getMonth()) {
                lastDay = auxDate.getDate();
            }
        }
        return lastDay;
    }

    static justDate(date = new Date()) {
        var temp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return temp;
    }

    static stringJustDate(date = new Date()) {
        return date.getDate().toString().padStart(2, "0") + "/" + (date.getMonth() + 1).toString().padStart(2, "0") + "/" + date.getFullYear();
    }

    static stringJustTime(date = new Date()) {
        return date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds().toString().padStart(2, "0");
    }

    static stringDateTime(date = new Date()) {
        return this.stringJustDate(date) + " " + this.stringJustTime(date);
    }

    static stringToDateTime(date: string) {
        var auxDate = date.split(" ")[0];
        var day = auxDate.split("/")[0];
        var month = auxDate.split("/")[1];
        var year = auxDate.split("/")[2];
        var auxTime = date.split(" ")[1];
        var hours = auxTime.split(":")[0];
        var minutes = auxTime.split(":")[1];
        var seconds = auxTime.split(":")[2];
        return new Date(parseInt(year), parseInt(month, 10) - 1, parseInt(day), parseInt(hours), parseInt(minutes), parseInt(seconds));
    }

    static stringToDate(auxDate: string) {
        var day = auxDate.split("/")[0];
        var month = auxDate.split("/")[1];
        var year = auxDate.split("/")[2];
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
}
