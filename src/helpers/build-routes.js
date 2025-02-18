export function buildRoutes(path) {
    const pathParamsRegex = /:([a-zA-Z]+)/g;
    const pathWithParams = path.replace(pathParamsRegex, "(?<$1>[a-zA-Z0-9\-_]+)");

    return new RegExp(`^${pathWithParams}(?<query>\\?(.*))?`);
}