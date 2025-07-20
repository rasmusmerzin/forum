package dev.merzin.forum.comment;

import java.time.ZonedDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
public class CommentResponse {
  private UUID id;
  private UUID postId;
  private String opUsername;
  private boolean opVerified;
  private String username;
  private boolean verified;
  private String content;
  private ZonedDateTime created;
  private int favorites;
  @Setter private boolean favorited = false;

  public CommentResponse(Comment comment) {
    this.id = comment.getId();
    this.postId = comment.getPost().getId();
    this.opUsername = comment.getPost().getAuthor().getUsername();
    this.opVerified = comment.getPost().getAuthor().isEmailVerified();
    this.username = comment.getAuthor().getUsername();
    this.verified = comment.getAuthor().isEmailVerified();
    this.content = comment.getContent();
    this.created = comment.getCreated();
    this.favorites = comment.getFavorites();
  }
}
