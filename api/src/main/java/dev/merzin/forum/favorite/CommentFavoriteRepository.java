package dev.merzin.forum.favorite;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentFavoriteRepository extends JpaRepository<CommentFavorite, UUID> {
	public Optional<CommentFavorite> findByAuthorUsernameAndCommentId(String username, UUID postId);

	public List<CommentFavorite> findByAuthorUsernameAndCommentIdIn(String username, List<UUID> postIds);

	public void deleteByCommentId(UUID postId);
}
