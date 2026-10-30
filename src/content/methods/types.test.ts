import { describe, expect, test } from "vitest";
import { methodSectionId } from "./types";

describe("methodSectionId", () => {
  test.each([
    ["Create", "create"],
    ["WithSigningKeyFromSecret", "with-signing-key-from-secret"],
    ["TryValidateJWT", "try-validate-jwt"],
    ["HasJWTExpired", "has-jwt-expired"],
    ["WhenDoesJWTExpire", "when-does-jwt-expire"],
  ])("%s becomes %s", (name, id) => {
    expect(methodSectionId(name)).toBe(id);
  });
});
