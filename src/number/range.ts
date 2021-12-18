import * as t from "io-ts/Codec";
import { flow } from "fp-ts/function";
import * as d from "io-ts/Decoder";
import { Inverse } from "../base/inverse";

export const OpenMin =
  (message = `Number is smaller than min`) =>
    (min: number) =>
      t.refine<number, number>(
        (i): i is number => i > min,
        message,
      )(t.number);
export type OpenMin = ReturnType<typeof OpenMin>

export const OpenMax =
  (message = `Number is larger than max`) =>
    (max: number) =>
      t.refine<number, number>(
        (i): i is number => i < max,
        message,
      )(t.number);
export type OpenMax = ReturnType<typeof OpenMax>;

export const ClosedMax =
  (message = "String matches provided regexp") =>
    flow(
      OpenMin(),
      Inverse(message)(t.number),
    );
export type ClosedMax = ReturnType<typeof ClosedMax>;

export const ClosedMin =
  (message = "String matches provided regexp") =>
    flow(
      OpenMax(),
      Inverse(message)(t.number),
    );
export type ClosedMin = ReturnType<typeof ClosedMin>;

export const Positive = OpenMin("Number isn't positive")(0);
export type Positive = t.TypeOf<typeof Positive>

export const Negative = OpenMax("Number isn't negative")(0);
export type Negative = t.TypeOf<typeof Negative>

export const NonPositive = ClosedMin("Number isn't non-positive")(0);
export type NonPositive = t.TypeOf<typeof NonPositive>

export const NonNegative = ClosedMax("Number isn't non-negative")(0);
export type NonNegative = t.TypeOf<typeof NonNegative>
