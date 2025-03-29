package dev.merzin.forum.account;

import java.util.Arrays;
import java.util.regex.Pattern;

public class UsernameSanitizer {
	private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9_]+$");

	public static String sanitize(String username) {
		return Arrays.asList(username.toLowerCase().toCharArray()).stream()
			.filter(c -> USERNAME_PATTERN.matcher(String.valueOf(c)).matches())
			.map(String::valueOf)
			.reduce("", String::concat);
	}
}
