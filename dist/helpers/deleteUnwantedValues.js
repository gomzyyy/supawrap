export function getDataType(value) {
    if (value === null)
        return "null";
    if (typeof value === "string" && value.trim().length === 0)
        return "emptystrings";
    return typeof value;
}
export function deleteUnwantedValues(obj, datatypes) {
    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        const datatype = getDataType(value);
        if (datatypes.includes(datatype)) {
            continue;
        }
        result[key] = value;
    }
    return result;
}
