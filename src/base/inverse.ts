import * as t from "io-ts";

export const InverseBrand = <C extends t.Any, B>(brand: Readonly<t.BrandC<C, B>>) => {
  return t.brand(
    brand.type,
    (
      val,
    ): val is t.Branded<t.TypeOf<C>, AddPrefixToObject<B, "Inverse">> =>
      !brand.predicate(val),
    brand.name,
  );
};
