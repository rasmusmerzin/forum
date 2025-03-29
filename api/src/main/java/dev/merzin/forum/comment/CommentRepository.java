package dev.merzin.forum.comment;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
	public Optional<Comment> findById(UUID id);

	public List<Comment> findByPostId(UUID postId);

	public void deleteByPostId(UUID postId);

	public List<Comment> findTop10ByPostIdOrderByCreatedAsc(UUID postId);

	public List<Comment> findTop10ByPostIdAndCreatedAfterOrderByCreatedAsc(UUID postId, ZonedDateTime after);
}
