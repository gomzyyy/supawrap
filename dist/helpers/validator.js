import { ValidationError } from "@/core/index.js";
import { getDataType } from "./fn.js";
const validator = {
    response: {
        isValidJson: (str) => {
            try {
                JSON.parse(str);
                return true;
            }
            catch (e) {
                return false;
            }
        },
        hasProperty: (obj, key) => {
            if (typeof obj === "string" && validator.response.isValidJson(obj)) {
                return Object.prototype.hasOwnProperty.call(JSON.parse(obj), key);
            }
            else if (typeof obj === "object") {
                return Object.prototype.hasOwnProperty.call(obj, key);
            }
            else {
                return false;
            }
        },
        isArray(arr) {
            return Array.isArray(arr);
        },
        isValidObject(obj) {
            return obj && typeof obj === "object" && !Array.isArray(obj);
        },
        isString(arg) {
            return typeof arg === "string" || arg instanceof String;
        },
        isBoolean(arg) {
            return typeof arg === "boolean";
        },
        isNumber(arg) {
            return typeof arg === "number" && isFinite(arg);
        },
    },
    form: {
        isEmail: (email) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        },
    },
    amend: {
        deleteKey(obj, key) {
            const { [key]: _, ...rest } = obj;
            return rest;
        },
        deleteKeyIteratable(arr, key, opts) {
            return arr.map((item) => {
                const value = item[key];
                const shouldDelete = !opts?.where?.datatypes ||
                    opts.where.datatypes.includes(typeof value);
                if (!shouldDelete) {
                    return item;
                }
                const { [key]: _, ...rest } = item;
                return rest;
            });
        },
        deleteUnwantedValues(obj, datatypes) {
            if (typeof obj !== "object" || obj === null) {
                throw new ValidationError("Invalid type of data received while checking for unwanted values.");
            }
            const result = {};
            for (const [key, value] of Object.entries(obj)) {
                const datatype = getDataType(value);
                if (datatypes.includes(datatype)) {
                    continue;
                }
                result[key] = value;
            }
            return result;
        },
        overrideProperty(obj, key, value) {
            return {
                ...obj,
                [key]: value,
            };
        },
    },
};
export { validator };
