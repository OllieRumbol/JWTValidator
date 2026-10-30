// The reference data of one public method (plan section 3.4). Each class gets its own
// file in this folder when its docs page is rebuilt.
export type MethodReference = {
  name: string; // "WithSigningKeyFromSecret"
  summary: string;
  signatures: string[];
  parameters: { name: string; description: string }[];
  returns: string;
  // When it throws or returns false. Optional in release 2 only, because the 1.0.3 text
  // has none. Release 3 writes it for every method (spec section 6.1.3, item 3).
  failsWhen?: string;
  changedIn2?: string; // The "Changed in 2.0.0" text, when there is one
};

// The section id of a method's reference block, and so the last part of its address.
// "WithSigningKeyFromSecret" becomes "with-signing-key-from-secret".
export function methodSectionId(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}
