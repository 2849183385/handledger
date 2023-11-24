/**将时间戳格式的时间，转换成年月日的格式*/
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
// console.log(formatTimestamp(1731318200));
//转换时间戳 日期字符串作为参数，将其转换为JavaScript的日期对
export function convertToTimestamp(dateString) {
    const date = new Date(dateString);
    const timestamp = date.getTime();
    return timestamp;
}
