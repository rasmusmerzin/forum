package dev.merzin.forum.post;

import java.time.ZonedDateTime;
import java.util.UUID;

import dev.merzin.forum.account.Account;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Getter;

@Entity
@Getter
public class Post {
	@Id
	private UUID id;
	@OneToOne
	private Account author;
	private String content;
	private ZonedDateTime created;

	public Post() {}

	public Post(PostCreation postCreation, Account author) {
		this.id = UUID.randomUUID();
		this.author = author;
		this.content = postCreation.content();
		this.created = ZonedDateTime.now();
	}
}
