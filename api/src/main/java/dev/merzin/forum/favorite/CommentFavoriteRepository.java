package dev.merzin.forum.favorite;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentFavoriteRepository
    extends JpaRepository<CommentFavorite, UUID> {
  Optional<CommentFavorite> findByAuthorUsernameAndCommentId(String username,
                                                             UUID postId);

  List<CommentFavorite> findByAuthorUsernameAndCommentIdIn(String username,
                                                           List<UUID> postIds);

  void deleteByCommentId(UUID postId);
}
