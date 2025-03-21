package dev.merzin.forum.post;

import java.time.ZonedDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Post {
	@Id
	private UUID id;
	private UUID authorId;
	private String content;
	private ZonedDateTime created;

	Post() {}

	Post(PostCreation postCreation, UUID authorId) {
		this.id = UUID.randomUUID();
		this.authorId = authorId;
		this.content = postCreation.content();
		this.created = ZonedDateTime.now();
	}
}
