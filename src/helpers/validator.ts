import { ValidationError } from "@/core/index.js";
import type { JSDataType } from "../types/index.js";
import { getDataType } from "./fn.js";

const validator = {
  response: {
    isValidJson: (str: string): boolean => {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    },
    hasProperty: (obj: object | string, key: string): boolean => {
      if (typeof obj === "string" && validator.response.isValidJson(obj)) {
        return Object.prototype.hasOwnProperty.call(JSON.parse(obj), key);
      } else if (typeof obj === "object") {
        return Object.prototype.hasOwnProperty.call(obj, key);
      } else {
        return false;
      }
    },
    isArray(arr: any) {
      return Array.isArray(arr);
    },
    isValidObject(obj: any): boolean {
      return obj && typeof obj === "object" && !Array.isArray(obj);
    },
    isString(arg: any): boolean {
      return typeof arg === "string" || arg instanceof String;
    },
    isBoolean(arg: any): boolean {
      return typeof arg === "boolean";
    },
    isNumber(arg: any): boolean {
      return typeof arg === "number" && isFinite(arg);
    },
  },
  form: {
    isEmail: (email: string): boolean => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    },
  },
  amend: {
    deleteKey<T extends Record<string, any>, K extends keyof T>(
      obj: T,
      key: K,
    ): Omit<T, K> {
      const { [key]: _, ...rest } = obj;
      return rest;
    },
    deleteKeyIteratable<
      T extends ReadonlyArray<Record<string, any>>,
      K extends Extract<keyof T[number], string>,
    >(
      arr: T,
      key: K,
      opts?: {
        where?: {
          datatypes: Array<JSDataType>;
        };
      },
    ): Array<Omit<T[number], K> | T[number]> {
      return arr.map((item) => {
        const value = item[key];

        const shouldDelete =
          !opts?.where?.datatypes ||
          opts.where.datatypes.includes(typeof value);

        if (!shouldDelete) {
          return item;
        }

        const { [key]: _, ...rest } = item;
        return rest;
      });
    },
    deleteUnwantedValues<T>(
      obj: T,
      datatypes: JSDataType[],
    ): Partial<T> {
      if(typeof obj !== "object" || obj === null) {
        throw new ValidationError("Invalid type of data received while checking for unwanted values.");
      }
      const result: Partial<T> = {};

      for (const [key, value] of Object.entries(obj as any)) {
        const datatype = getDataType(value);
        if (datatypes.includes(datatype)) {
          continue;
        }
        (result as Record<string, unknown>)[key] = value;
      }

      return result as T;
    },
    overrideProperty<T extends Record<string, any>, K extends keyof T>(
      obj: T,
      key: K,
      value: T[K],
    ): T {
      return {
        ...obj,
        [key]: value,
      };
    },
  },
};

export { validator };
