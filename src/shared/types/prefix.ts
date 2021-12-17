type AddPrefix<TKey, TPrefix extends string> = TKey extends string
  ? `${TPrefix}${TKey}`
  : never;

type RemovePrefix<TPrefixedKey, TPrefix extends string> = TPrefixedKey extends AddPrefix<infer TKey, TPrefix>
  ? TKey
  : "";

type PrefixedValue<TObject, TPrefixedKey extends string, TPrefix extends string> = TObject extends { [K in RemovePrefix<TPrefixedKey, TPrefix>]: infer TValue }
  ? TValue
  : never;

type AddPrefixToObject<TObject, TPrefix extends string> = {
  [K in AddPrefix<keyof TObject, TPrefix>]: PrefixedValue<TObject, K, TPrefix>
}
