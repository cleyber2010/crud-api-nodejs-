export function extractQueryParams(query) {
    return query.substring(1).split("&").reduce((queryItem, item) => {
        const [key, value] = item.split("=");
        queryItem[key] = value;
        return queryItem;
    },{});
}