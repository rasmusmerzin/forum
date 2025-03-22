package dev.merzin.forum.post;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, UUID> {
	public List<Post> findTop10ByCreatedBeforeOrderByCreatedDesc(ZonedDateTime before);

	public List<Post> findTop10ByAuthorUsernameAndCreatedBeforeOrderByCreatedDesc(String username, ZonedDateTime before);
}
