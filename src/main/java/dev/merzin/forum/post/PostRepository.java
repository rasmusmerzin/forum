package dev.merzin.forum.post;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, UUID> {
	public Optional<Post> findById(UUID id);

	public List<Post> findTop10ByCreatedBeforeOrderByCreatedDesc(ZonedDateTime before);

	public List<Post> findTop10ByAuthorUsernameAndCreatedBeforeOrderByCreatedDesc(String username, ZonedDateTime before);
}
