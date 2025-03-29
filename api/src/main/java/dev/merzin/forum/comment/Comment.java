package dev.merzin.forum.comment;

import java.time.ZonedDateTime;
import java.util.UUID;

import dev.merzin.forum.account.Account;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;

@Entity
@Getter
public class Comment {
	@Id
	private UUID id;
	private UUID postId;
	@OneToOne
	private Account author;
	private String content;
	private ZonedDateTime created;
	private int favorites;

	public Comment() {}

	public Comment(CommentCreation commentCreation, Account author) {
		this.id = UUID.randomUUID();
		this.postId = commentCreation.postId();
		this.author = author;
		this.content = commentCreation.content();
		this.created = ZonedDateTime.now();
	}
}
