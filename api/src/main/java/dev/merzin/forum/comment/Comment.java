package dev.merzin.forum.comment;

import java.time.ZonedDateTime;
import java.util.UUID;

import dev.merzin.forum.account.Account;
import dev.merzin.forum.post.Post;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Comment {
	@Id
	private UUID id;
	@ManyToOne
	private Post post;
	@ManyToOne
	private Account author;
	private String content;
	private ZonedDateTime created;
	private int favorites;

	public Comment(CommentCreation commentCreation, Post post, Account author) {
		this.id = UUID.randomUUID();
		this.post = post;
		this.author = author;
		this.content = commentCreation.content();
		this.created = ZonedDateTime.now();
	}
}
