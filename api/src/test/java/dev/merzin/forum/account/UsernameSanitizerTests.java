package dev.merzin.forum.account;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class UsernameSanitizerTests {
	@Test
	void convertToLowercase() {
		var src = "RasmusMerzin";
		var out = "rasmusmerzin";
		assertTrue(UsernameSanitizer.sanitize(src).equals(out));
	}

	@Test
	void allowSeparation() {
		var src = "e.rasmus-merzin_daniel";
		assertTrue(UsernameSanitizer.sanitize(src).equals(src));
	}

	@Test
	void replaceSpaces() {
		var src = "rasmus merzin";
		var out = "rasmus_merzin";
		assertTrue(UsernameSanitizer.sanitize(src).equals(out));
	}

	@Test
	void filterSpecialCharacters() {
		var src = "<< [!] DRAGON : SLAYER [!] >>";
		var out = "__dragon__slayer__";
		assertTrue(UsernameSanitizer.sanitize(src).equals(out));
	}
}
