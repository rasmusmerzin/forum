package dev.merzin.forum.email;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class EmailValidatorTests {
  @Test
  void testValidEmails() {
    assertTrue(EmailValidator.isValid("rasmusmerzin@gmail.com"));
    assertTrue(EmailValidator.isValid("rasmus@merzin.dev"));
    assertTrue(EmailValidator.isValid("John.Doe@mail.co"));
    assertTrue(EmailValidator.isValid("JANE_DOE@EXAMPLEmail.to"));
  }

  @Test
  void testInvalidEmails() {
    assertFalse(EmailValidator.isValid("!rasmusmerzin@gmail.com"));
    assertFalse(EmailValidator.isValid("merzin.dev"));
    assertFalse(EmailValidator.isValid("john.doe.com"));
    assertFalse(EmailValidator.isValid("jane_doe"));
  }
}
