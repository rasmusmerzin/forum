package dev.merzin.forum.account;

import java.time.ZonedDateTime;
import java.util.UUID;

import lombok.Getter;

@Getter
public class AccountProfile {
	private UUID id;
	private String username;
	private ZonedDateTime created;

	AccountProfile() {}

	AccountProfile(Account account) {
		this.id = account.getId();
		this.username = account.getUsername();
		this.created = account.getCreated();
	}
}
