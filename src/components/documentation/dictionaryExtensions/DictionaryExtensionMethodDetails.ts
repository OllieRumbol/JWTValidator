const DictionaryExtensionMethodDetails = [
    {
      title: ".Print()",
      summary: "This method converts a dictionary into a string. It allows developers clear visability of what is contained in a dictionary.",
      syntax: " public static string Print<TKey, TValue>(this Dictionary<TKey, List<TValue>> dictionary)",
      parameters: "This method can only be called from a dictonary that contains a list as its value.",
      returns: "This method returns a multi line string.",
    },
    {
      title: ".ContainsKeyAndValue()",
      summary: "This method can be used to see if there is a key value pair that contains both a matching key and value in the dictionary.",
      syntax: "public static bool ContainsKeyAndValue<TKey, TValue, T>(this Dictionary<TKey, List<TValue>> dictionary, T key, T value)",
      parameters: "This method can only be called from a dictonary that contains a list as its value.",
      returns: "Method returns a boolean",
    },
    {
      title: ".ContainsValueInList()",
      summary: "The method is used to see whether a dictionary that has a list as a value contains a specfic value",
      syntax: "public static bool ContainsValueInList<TKey, TValue, T>(this Dictionary<TKey, List<TValue>> dictionary, T value )",
      parameters: "This method can only be called from a dictonary that contains a list as its value.",
      returns: "Method returns a boolean",
    },
    {
      title: ".IsEmpty()",
      summary: "An extension method to validate if a dictionary contains any values.",
      syntax: "public static bool IsEmpty<TKey, TValue>(this Dictionary<TKey, List<TValue>> dictionary)",
      parameters: "This method can only be called from a dictonary that contains a list as its value.",
      returns: "Method returns a boolean",
    }
  ];
  
  export default DictionaryExtensionMethodDetails;
  