package dev.merzin.forum.comment;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
	List<Comment> findByPostId(UUID postId);

	void deleteByPostId(UUID postId);

	@Query("""
		SELECT c
		FROM Comment c
		WHERE c.post.id = :postId
		ORDER BY c.created ASC
		LIMIT 10""")
	List<Comment> findTop10ByPostId(UUID postId);

	@Query("""
		SELECT c
		FROM Comment c
		WHERE c.post.id = :postId
		AND c.created > :after
		ORDER BY c.created ASC
		LIMIT 10""")
	List<Comment> findTop10ByPostIdAndCreatedAfter(UUID postId, ZonedDateTime after);

	@Query("""
		SELECT c
		FROM Comment c
		WHERE c.author.username = :username
		AND c.created < :before
		ORDER BY c.created DESC
		LIMIT 10""")
	List<Comment> findTop10ByAuthorUsernameAndCreatedBefore(String username, ZonedDateTime before);
}
