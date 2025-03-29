package dev.merzin.forum.account;

import java.util.regex.Pattern;

public class EmailValidator {
	private static final Pattern EMAIL_PATTERN = Pattern.compile(
		"^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
	);

	public static boolean isValid(String email) {
		return EMAIL_PATTERN.matcher(email).matches();
	}
}
