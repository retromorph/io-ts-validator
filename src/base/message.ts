import * as t from "io-ts/Codec";
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";
import * as d from "io-ts/Decoder";

export const Message =
  (message: string) =>
    <I, O, A>(codec: t.Codec<I, O, A>): t.Codec<I, O, A> =>
      ({
        ...codec,
        decode: (i: I) => pipe(
          i,
          codec.decode,
          E.chainFirst(
            (a) => d.failure(a, message),
          ),
        ),
      });
