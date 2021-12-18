import * as t from "io-ts/Codec";
import { Inverse } from "../base/inverse";
import { flow } from "fp-ts/function";

export const isDivisibleBy =
  (num: number) =>
    (mod: number): boolean => num % mod == 0;

export const DivisibleBy =
  (message = `Number is not divisible by`) =>
    (mod: number) =>
      t.refine<number, number>(
        (i): i is number => isDivisibleBy(i)(mod),
        message,
      )(t.number);
export type DivisibleBy = ReturnType<typeof DivisibleBy>;

export const NonDivisibleBy =
  (message = "Number is divisible by") =>
    flow(
      DivisibleBy(),
      Inverse(message)(t.number),
    );
export type NonDivisibleBy = ReturnType<typeof NonDivisibleBy>;

export const Even = DivisibleBy("Number is not even")(2);
export type Even = t.TypeOf<typeof Even>

export const Odd = NonDivisibleBy("Number is not odd")(2);
export type Odd = t.TypeOf<typeof Odd>
