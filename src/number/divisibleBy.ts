import * as t from "io-ts/Codec";
import { flow } from "fp-ts/function";
import * as d from "io-ts/Decoder";
import { Inverse } from "../base/inverse";

export const isDivisibleBy =
  (num: number) =>
    (mod: number): boolean => num % mod == 0;

export const DivisibleBy =
  (mod: number) =>
    (message = `Number is not divisible by ${mod}`) =>
      t.fromDecoder<number, number>({
          decode: flow(
            (i) => isDivisibleBy(i)(mod)
              ? d.success(i)
              : d.failure(i, message),
          ),
        },
      );
export type DivisibleBy = ReturnType<typeof DivisibleBy>;

export const NonDivisibleBy = (mod: number) =>
  flow(
    DivisibleBy(mod),
    Inverse,
  );
export type NonDivisibleBy = ReturnType<typeof NonDivisibleBy>;

export const Even = DivisibleBy(2)("Number is not even");
export type Even = t.TypeOf<typeof Even>

export const Odd = NonDivisibleBy(2)("Number is not odd");
export type Odd = t.TypeOf<typeof Odd>
