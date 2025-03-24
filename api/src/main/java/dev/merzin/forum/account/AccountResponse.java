package dev.merzin.forum.account;

import java.time.ZonedDateTime;
import java.util.UUID;

import lombok.Getter;

@Getter
public class AccountResponse {
	private UUID id;
	private String username;
	private String firstName;
	private String lastName;
	private String bio;
	private String email;
	private boolean emailVerified;
	private ZonedDateTime created;

	public AccountResponse(Account account) {
		this.id = account.getId();
		this.username = account.getUsername();
		this.firstName = account.getFirstName();
		this.lastName = account.getLastName();
		this.bio = account.getBio();
		this.email = account.getEmail();
		this.emailVerified = account.isEmailVerified();
		this.created = account.getCreated();
	}
}
