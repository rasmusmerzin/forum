package dev.merzin.forum.account;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Account implements UserDetails {
	@Id
	private UUID id;
	private String username;
	private String password;

	Account() {}

	Account(AccountRegistration registration) {
		this.id = UUID.randomUUID();
		System.out.println("Account: " + registration.username() + " " + registration.password());
		this.username = registration.username();
		this.password = passwordEncoder().encode(registration.password());
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(12);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of();
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public String getPassword() {
		return password;
	}
}
