export function getDataType(value) {
    if (value === null)
        return "null";
    if (typeof value === 'string' && value.trim().length === 0)
        return "emptystrings";
    return typeof value;
}
