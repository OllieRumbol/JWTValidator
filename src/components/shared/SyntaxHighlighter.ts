// The types for these paths are in the package's index.d.ts, which no import here loads.
/// <reference types="react-syntax-highlighter" />
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/light";
import csharp from "react-syntax-highlighter/dist/esm/languages/hljs/csharp";
import vs2015 from "react-syntax-highlighter/dist/esm/styles/hljs/vs2015";

// The light build has no languages until they are registered. Registering C# only keeps
// every other grammar out of the bundle (spec section 6.6.2, item 2).
SyntaxHighlighter.registerLanguage("csharp", csharp);

export { vs2015 };
export default SyntaxHighlighter;
