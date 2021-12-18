import * as d from "io-ts/Decoder";
import * as t from "io-ts/Codec";
import { flow } from "fp-ts/function";

export const isNotEmpty = (val: string): boolean => val.trim() !== "";

export const NonEmpty =
  (message = "String is empty") =>
    t.fromDecoder<string, string>({
        decode: flow(
          (i) => isNotEmpty(i)
            ? d.success(i)
            : d.failure(i, message),
        ),
      },
    );
export type NonEmpty = ReturnType<typeof NonEmpty>
