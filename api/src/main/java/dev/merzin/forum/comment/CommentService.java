package dev.merzin.forum.comment;

import dev.merzin.forum.account.AccountService;
import dev.merzin.forum.favorite.CommentFavoriteRepository;
import dev.merzin.forum.post.PostService;
import jakarta.transaction.Transactional;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
  @Autowired private CommentRepository commentRepository;
  @Autowired private CommentFavoriteRepository commentFavoriteRepository;
  @Autowired private AccountService accountService;
  @Autowired private PostService postService;

  public Comment createComment(CommentCreation commentCreation,
                               String username) {
    var account = accountService.getAccountByUsername(username);
    var post = postService.getPost(commentCreation.postId());
    var comment = new Comment(commentCreation, post, account);
    return commentRepository.save(comment);
  }

  @Transactional
  public void deleteComment(UUID id, String username) {
    var comment = commentRepository.findById(id).orElse(null);
    if (comment == null)
      return;
    if (!comment.getAuthor().getUsername().equals(username))
      return;
    commentFavoriteRepository.deleteByCommentId(id);
    commentFavoriteRepository.flush();
    commentRepository.delete(comment);
  }

  public List<Comment> getPostComments(UUID postId, ZonedDateTime after) {
    if (after == null)
      return commentRepository.findTop10ByPostId(postId);
    return commentRepository.findTop10ByPostIdAndCreatedAfter(postId, after);
  }

  public List<Comment> getUserComments(String username, ZonedDateTime before) {
    if (before == null)
      before = ZonedDateTime.now();
    return commentRepository.findTop10ByAuthorUsernameAndCreatedBefore(username,
                                                                       before);
  }
}
