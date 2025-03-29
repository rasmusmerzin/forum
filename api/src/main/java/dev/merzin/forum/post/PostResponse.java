package dev.merzin.forum.post;

import java.time.ZonedDateTime;
import java.util.UUID;

import lombok.Getter;

@Getter
public class PostResponse {
	private UUID id;
	private String username;
	private String content;
	private ZonedDateTime created;

	public PostResponse(Post post) {
		this.id = post.getId();
		this.username = post.getAuthor().getUsername();
		this.content = post.getContent();
		this.created = post.getCreated();
	}
}
