import { is } from "https://deno.land/x/unknownutil@v3.18.0/mod.ts";
import {
  fromErrorObject,
  isErrorObject,
  toErrorObject,
  tryOr,
} from "https://deno.land/x/errorutil@v1.0.0/mod.ts";

export function errorSerializer(err: unknown): unknown {
  if (err instanceof Error) {
    return JSON.stringify(toErrorObject(err));
  }
  return String(err);
}

export function errorDeserializer(err: unknown): unknown {
  if (is.String(err)) {
    const obj = tryOr(() => JSON.parse(err), undefined);
    if (isErrorObject(obj)) {
      return fromErrorObject(obj);
    }
  }
  return err;
}
