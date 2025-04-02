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
public class CommentFavorite {
	@Id
	private UUID id;
	private UUID commentId;
	@ManyToOne
	private Account author;
	private ZonedDateTime created;

	public CommentFavorite(UUID commentId, Account author) {
		this.id = UUID.randomUUID();
		this.commentId = commentId;
		this.author = author;
		this.created = ZonedDateTime.now();
	}
}
