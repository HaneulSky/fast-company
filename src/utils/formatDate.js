export function formatDate(param) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const date = new Date(param);
    const dateToday = Date.now();
    const diff = dateToday - +date;
    if (diff / 60000 <= 1) {
        return "1 минуту назад";
    } else if (diff / 60000 <= 5) {
        return "5 минут назад";
    } else if (diff / 60000 <= 10) {
        return "10 минут назад";
    } else if (diff / 60000 <= 30) {
        return "30 минут назад";
    } else if (diff / 60000 <= 1440) {
        return `${date.getHours()} : ${date.getMinutes()}`;
    } else if (diff / 60000 <= 1440 * 365) {
        return `${date.getDate()} ${monthNames[date.getMonth()]}`;
    } else if (diff / 60000 > 1440 * 365) {
        return `${date.getDate()} ${
            monthNames[date.getMonth()]
        } ${date.getFullYear()}`;
    }
}
