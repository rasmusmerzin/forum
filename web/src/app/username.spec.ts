import { sanitizeUsername } from "./username";

describe("sanitizeUsername", () => {
  it("convertToLowercase", () => {
    const src = "RasmusMerzin";
    const out = "rasmusmerzin";
    expect(sanitizeUsername(src)).toBe(out);
  });

  it("replaceSpaces", () => {
    const src = "rasmus merzin";
    const out = "rasmus_merzin";
    expect(sanitizeUsername(src)).toBe(out);
  });

  it("allowSeparation", () => {
    const src = "e.rasmus-merzin_daniel";
    expect(sanitizeUsername(src)).toBe(src);
  });

  it("filterSpecialCharacters", () => {
    const src = "<< [!] DRAGON : SLAYER [!] >>";
    const out = "__dragon__slayer__";
    expect(sanitizeUsername(src)).toBe(out);
  });
});
