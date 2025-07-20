package dev.merzin.forum.account;

import java.util.regex.Pattern;

public class UsernameSanitizer {
  private static final Pattern USERNAME_PATTERN =
      Pattern.compile("^[a-zA-Z0-9_.-]+$");

  public static String sanitize(String username) {
    return username.toLowerCase()
        .chars()
        .mapToObj(c -> String.valueOf((char)c))
        .map(c -> c.equals(" ") ? "_" : c)
        .filter(c -> USERNAME_PATTERN.matcher(c).matches())
        .reduce("", String::concat);
  }
}
