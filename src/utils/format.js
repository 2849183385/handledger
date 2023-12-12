// function isValidTimestamp(timestamp) {
//     return !isNaN(timestamp) && timestamp > 0;
// }

/**将时间戳格式的时间，转换成年月日的格式*/
export function formatTimestamp(timestamp) {
    // if (isValidTimestamp(timestamp)) {
    const date = new Date(timestamp);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
    // } else {
    //     return "Invalid timestamp";
    // }
}
// console.log(convertToTimestamp(new Date()))
// Wed Dec 20 2023 00:00:00 GMT +0800(中国标准时间)
// console.log(new Date(1703001600000))
// console.log(formatTimestamp(1703001600000));
// 1703001600000
//转换为时间戳 日期字符串作为参数，将其转换为JavaScript的日期对
export function convertToTimestamp(dateString) {
    const date = new Date(dateString);
    const timestamp = date.getTime();
    return timestamp;
}
// Sat Nov 25 2023 23: 48: 32 GMT +0800(中国标准时间)
// console.log(new Date().toDateString());


//去除不想要的时间格式
/**
 * @param {string} date 时间字符串
 * @param {string} timeformat 时间格式
 * @returns {string} 格式化后的时间
 */
export function formatDate(date, timeformat) {
    const dataString = new Date(date);
    const year = dataString.getFullYear();  // 年
    const month = (dataString.getMonth() + 1).toString().padStart(2, '0');  // 月
    const day = (dataString.getDate()).toString().padStart(2, '0');  // 日
    const hours = (dataString.getHours()).toString().padStart(2, '0');
    const minutes = (dataString.getMinutes()).toString().padStart(2, '0');
    const seconds = (dataString.getSeconds()).toString().padStart(2, '0');
    switch (timeformat) {
        case 'day':
            return `${year}-${month}-${day}`
        case 'month':
            return `${year}-${month}`
        case 'year':
            return `${year}`
        case 'time':
            return `${hours}:${minutes}:${seconds}`
        default:
            return `${year}-${month}-${day}`
    }
}
