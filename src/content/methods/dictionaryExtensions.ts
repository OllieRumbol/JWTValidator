import type { MethodReference } from "./types";

// The dictionary extension methods. The text is the 1.0.3 site's, unchanged. Each
// method's one parameter sentence is kept whole, named by the signature's parameters.
// Release 3 rewrites it for 2.0.0 (plan section 3.2).
export const dictionaryExtensionMethods: MethodReference[] = [
  {
    name: "Print",
    summary:
      "This method converts a dictionary into a string. It allows developers clear visability of what is contained in a dictionary.",
    signatures: [
      "public static string Print<TKey, TValue>(this Dictionary<TKey, List<TValue>> dictionary)",
    ],
    parameters: [
      {
        name: "dictionary",
        description:
          "This method can only be called from a dictonary that contains a list as its value.",
      },
    ],
    returns: "This method returns a multi line string.",
  },
  {
    name: "ContainsKeyAndValue",
    summary:
      "This method can be used to see if there is a key value pair that contains both a matching key and value in the dictionary.",
    signatures: [
      "public static bool ContainsKeyAndValue<TKey, TValue, T>(this Dictionary<TKey, List<TValue>> dictionary, T key, T value)",
    ],
    parameters: [
      {
        name: "dictionary, key, value",
        description:
          "This method can only be called from a dictonary that contains a list as its value.",
      },
    ],
    returns: "Method returns a boolean",
  },
  {
    name: "ContainsValueInList",
    summary:
      "The method is used to see whether a dictionary that has a list as a value contains a specfic value",
    signatures: [
      "public static bool ContainsValueInList<TKey, TValue, T>(this Dictionary<TKey, List<TValue>> dictionary, T value)",
    ],
    parameters: [
      {
        name: "dictionary, value",
        description:
          "This method can only be called from a dictonary that contains a list as its value.",
      },
    ],
    returns: "Method returns a boolean",
  },
  {
    name: "IsEmpty",
    summary:
      "An extension method to validate if a dictionary contains any values.",
    signatures: [
      "public static bool IsEmpty<TKey, TValue>(this Dictionary<TKey, List<TValue>> dictionary)",
    ],
    parameters: [
      {
        name: "dictionary",
        description:
          "This method can only be called from a dictonary that contains a list as its value.",
      },
    ],
    returns: "Method returns a boolean",
  },
];
