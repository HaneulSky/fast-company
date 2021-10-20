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
    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
}
