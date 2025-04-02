package dev.merzin.forum.favorite;

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
public class PostFavorite {
	@Id
	private UUID id;
	private UUID postId;
	@ManyToOne
	private Account author;
	private ZonedDateTime created;

	public PostFavorite(UUID postId, Account author) {
		this.id = UUID.randomUUID();
		this.postId = postId;
		this.author = author;
		this.created = ZonedDateTime.now();
	}
}
