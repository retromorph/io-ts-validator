import * as E from "fp-ts/Either";
import * as d from "io-ts/Decoder";
import * as t from "io-ts/Codec";

export const  Inverse =
  (message = "") =>
    <I, O1, A1>(baseCodec: t.Codec<I, O1, A1>) =>
      <O>(codec: t.Codec<I, O, A1>): t.Codec<I, O, A1> => ({
          ...codec,
          decode: (i: I) => {
            const base = baseCodec.decode(i);
            const lead = codec.decode(i);

            return E.isRight(base) && E.isLeft(lead) ? d.success(base.right) : d.failure(i, message);
          },
        }
      );
