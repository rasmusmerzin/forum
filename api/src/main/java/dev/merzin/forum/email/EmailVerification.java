package dev.merzin.forum.email;

import java.time.ZonedDateTime;
import java.util.UUID;

import dev.merzin.forum.account.Account;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class EmailVerification {
	@Id
	private UUID id;
	@ManyToOne
	private Account account;
	private String email;
	private ZonedDateTime created;
	private ZonedDateTime sent;
	private ZonedDateTime confirmed;

	public EmailVerification(Account account) {
		this.id = UUID.randomUUID();
		this.account = account;
		this.email = account.getEmail();
		this.created = ZonedDateTime.now();
	}

	public void updateSent() {
		this.sent = ZonedDateTime.now();
	}

	public void updateConfirmed() {
		this.confirmed = ZonedDateTime.now();
	}

	public boolean isExpired() {
		return this.created.plusDays(1).isBefore(ZonedDateTime.now());
	}
}
