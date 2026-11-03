import type { MethodReference } from "./types";

// The dictionary extension methods, for 2.0.0. The signatures are from the library
// source at tag v2.0.0. Each result for a null or empty dictionary was checked with a
// probe against the 2.0.0 package (T30).
const dictionaryParameter = {
  name: "dictionary",
  description:
    "The dictionary the method is called on, for example the claims. It can be null.",
};

// Print and ContainsValueInList read every list. A dictionary that the reader builds can
// hold a null list; the validator's claims never do.
const nullListFailure =
  "Throws ArgumentNullException when a key's list is null. The validator's claims never have a null list.";

const containsChange =
  "Returns false for a null dictionary, and no longer throws for a null value in a list. Version 1.0.3 threw for both.";

export const dictionaryExtensionMethods: MethodReference[] = [
  {
    name: "Print",
    summary: "Returns the dictionary as text, while you debug.",
    signatures: [
      "public static String Print<TKey, TValue>(this Dictionary<TKey, List<TValue>>? dictionary) where TKey : notnull",
    ],
    parameters: [dictionaryParameter],
    returns:
      "One line for each key: the key, a colon, then its values separated by commas. An empty string for an empty or null dictionary.",
    failsWhen: nullListFailure,
    changedIn2:
      "Returns an empty string for a null dictionary. Version 1.0.3 threw.",
  },
  {
    name: "ContainsKeyAndValue",
    summary: "Says whether a key holds a value.",
    signatures: [
      "public static Boolean ContainsKeyAndValue<TKey, TValue, T>(this Dictionary<TKey, List<TValue>>? dictionary, T key, T value) where TKey : notnull",
    ],
    parameters: [
      dictionaryParameter,
      {
        name: "key",
        description: "The key to look for, such as a claim name.",
      },
      {
        name: "value",
        description: "The value to look for in that key's list.",
      },
    ],
    returns:
      "True when the key exists and its list holds the value. The match is exact, so case matters.",
    failsWhen:
      "It does not fail. It returns false for an empty or null dictionary.",
    changedIn2: containsChange,
  },
  {
    name: "ContainsValueInList",
    summary: "Says whether any key holds a value.",
    signatures: [
      "public static Boolean ContainsValueInList<TKey, TValue, T>(this Dictionary<TKey, List<TValue>>? dictionary, T value) where TKey : notnull",
    ],
    parameters: [
      dictionaryParameter,
      { name: "value", description: "The value to look for in every list." },
    ],
    returns:
      "True when any list holds the value. The match is exact, so case matters.",
    failsWhen: `It returns false for an empty or null dictionary. ${nullListFailure}`,
    changedIn2: containsChange,
  },
  {
    name: "IsEmpty",
    summary: "Says whether the dictionary is empty or null.",
    signatures: [
      "public static Boolean IsEmpty<TKey, TValue>(this Dictionary<TKey, List<TValue>>? dictionary) where TKey : notnull",
    ],
    parameters: [dictionaryParameter],
    returns: "True when the dictionary is empty or null, otherwise false.",
    failsWhen: "It does not fail.",
    changedIn2:
      "Returns true for an empty or null dictionary. Version 1.0.3 returned false for an empty dictionary, and threw for null.",
  },
];
