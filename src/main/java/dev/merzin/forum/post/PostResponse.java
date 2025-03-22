package dev.merzin.forum.post;

import java.time.ZonedDateTime;
import java.util.UUID;

import dev.merzin.forum.account.AccountResponse;
import lombok.Getter;

@Getter
public class PostResponse {
	private UUID id;
	private AccountResponse author;
	private String content;
	private ZonedDateTime created;

	public PostResponse(Post post) {
		this.id = post.getId();
		this.author = new AccountResponse(post.getAuthor());
		this.content = post.getContent();
		this.created = post.getCreated();
	}
}
