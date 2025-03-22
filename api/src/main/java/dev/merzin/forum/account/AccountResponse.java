package dev.merzin.forum.account;

import java.time.ZonedDateTime;
import java.util.UUID;

import lombok.Getter;

@Getter
public class AccountResponse {
	private UUID id;
	private String username;
	private ZonedDateTime created;

	public AccountResponse(Account account) {
		this.id = account.getId();
		this.username = account.getUsername();
		this.created = account.getCreated();
	}
}
