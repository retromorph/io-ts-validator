import * as t from "io-ts/Codec";
import { flow } from "fp-ts/function";
import { Inverse } from "../base/inverse";

export const Matching =
  (message = "String doesn't match provided regexp") =>
    (regexp: Readonly<RegExp>) =>
      t.refine<string, string>(
        (i): i is string => (i.match(regexp) ?? []).length != 0,
        message,
      )(t.string);
export type Matching = t.TypeOf<typeof Matching>

export const NonMatching =
  (message = "String matches provided regexp") =>
    flow(
      Matching(),
      Inverse(message)(t.string),
    );
export type NonMatching = t.TypeOf<typeof NonMatching>

export const Contains =
  (message = "String doesn't contain provided regexp") =>
    (regexp: Readonly<RegExp>) =>
      t.refine<string, string>(
        (i): i is string => regexp.test(i),
        message,
      )(t.string);
export type Contains = t.TypeOf<typeof Contains>

export const NonContains =
  (message = "String contains provided regexp") =>
    flow(
      Matching(),
      Inverse(message)(t.string),
    );
export type NonContains = t.TypeOf<typeof NonContains>
