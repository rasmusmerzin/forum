package dev.merzin.forum.favorite;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostFavoriteRepository extends JpaRepository<PostFavorite, UUID> {
	public Optional<PostFavorite> findByAuthorUsernameAndPostId(String username, UUID postId);

	public List<PostFavorite> findByAuthorUsernameAndPostIdIn(String username, List<UUID> postIds);

	public void deleteByPostId(UUID postId);
}
