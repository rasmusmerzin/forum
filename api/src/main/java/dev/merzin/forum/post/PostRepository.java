package dev.merzin.forum.post;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, UUID> {
  @Query("""
    SELECT p
    FROM Post p
    WHERE p.created < :before
    ORDER BY p.created DESC
    LIMIT 10""") List<Post> findTop10ByCreatedBefore(ZonedDateTime before);

  @Query("""
    SELECT p
    FROM Post p
    WHERE p.author.username = :username
    AND p.created < :before
    ORDER BY p.created DESC
    LIMIT 10""")
  List<Post> findTop10ByAuthorUsernameAndCreatedBefore(String username,
                                                       ZonedDateTime before);
}
