package dev.merzin.forum.account;

import dev.merzin.forum.email.EmailValidator;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Getter
@NoArgsConstructor
public class Account implements UserDetails {
  @Id private UUID id;
  private String username;
  private String password;
  private String firstName = "";
  private String lastName = "";
  private String bio = "";
  private String email = "";
  private boolean emailVerified = false;
  private ZonedDateTime created;

  public Account(AccountRegistration registration) {
    this.id = UUID.randomUUID();
    this.username = UsernameSanitizer.sanitize(registration.username());
    this.password = passwordEncoder().encode(registration.password());
    this.created = ZonedDateTime.now();
  }

  public void update(AccountUpdate update) {
    if (update.firstName() != null)
      firstName = update.firstName();
    if (update.lastName() != null)
      lastName = update.lastName();
    if (update.bio() != null)
      bio = update.bio();
    if (update.email() != null) {
      var updatedEmail = update.email().toLowerCase();
      var isValidOrEmpty =
          EmailValidator.isValid(updatedEmail) || updatedEmail.isEmpty();
      if (!email.equals(updatedEmail) && isValidOrEmpty) {
        email = updatedEmail;
        emailVerified = false;
      }
    }
  }

  public void verifyEmail(String email) {
    if (this.email.equals(email))
      emailVerified = true;
    else
      throw new IllegalArgumentException("Email does not match");
  }

  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12);
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }
}
