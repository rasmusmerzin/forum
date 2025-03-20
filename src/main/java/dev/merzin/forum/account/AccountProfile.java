package dev.merzin.forum.account;

import java.util.UUID;

import lombok.Data;

@Data
public class AccountProfile {
	private UUID id;
	private String username;

	AccountProfile() {}

	AccountProfile(Account account) {
		this.id = account.getId();
		this.username = account.getUsername();
	}
}
