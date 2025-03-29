package dev.merzin.forum.favorite;

import java.time.ZonedDateTime;
import java.util.UUID;

import dev.merzin.forum.account.Account;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;

@Entity
@Getter
public class PostFavorite {
	@Id
	private UUID id;
	private UUID postId;
	@OneToOne
	private Account author;
	private ZonedDateTime created;

	public PostFavorite() {}

	public PostFavorite(UUID postId, Account author) {
		this.id = UUID.randomUUID();
		this.postId = postId;
		this.author = author;
		this.created = ZonedDateTime.now();
	}
}
