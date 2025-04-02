package dev.merzin.forum.post;

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
public class Post {
	@Id
	private UUID id;
	@ManyToOne
	private Account author;
	private String content;
	private ZonedDateTime created;
	private int comments;
	private int favorites;

	public Post(PostCreation postCreation, Account author) {
		this.id = UUID.randomUUID();
		this.author = author;
		this.content = postCreation.content();
		this.created = ZonedDateTime.now();
	}
}
