package dev.merzin.forum.post;

import dev.merzin.forum.account.AccountService;
import dev.merzin.forum.comment.CommentRepository;
import dev.merzin.forum.favorite.CommentFavoriteRepository;
import dev.merzin.forum.favorite.PostFavoriteRepository;
import jakarta.transaction.Transactional;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {
  @Autowired private PostRepository postRepository;
  @Autowired private PostFavoriteRepository postFavoriteRepository;
  @Autowired private CommentRepository commentRepository;
  @Autowired private CommentFavoriteRepository commentFavoriteRepository;
  @Autowired private AccountService accountService;

  public Post createPost(PostCreation postCreation, String username) {
    var account = accountService.getAccountByUsername(username);
    var post = new Post(postCreation, account);
    return postRepository.save(post);
  }

  @Transactional
  public void deletePost(UUID id, String username) {
    var post = postRepository.findById(id).orElse(null);
    if (post == null)
      return;
    if (!post.getAuthor().getUsername().equals(username))
      return;
    for (var comment : commentRepository.findByPostId(id))
      commentFavoriteRepository.deleteByCommentId(comment.getId());
    commentFavoriteRepository.flush();
    commentRepository.deleteByPostId(id);
    commentRepository.flush();
    postFavoriteRepository.deleteByPostId(id);
    postFavoriteRepository.flush();
    postRepository.delete(post);
  }

  public Post getPost(UUID id) {
    return postRepository.findById(id).orElse(null);
  }

  public List<Post> getNewPosts(ZonedDateTime before) {
    if (before == null)
      before = ZonedDateTime.now();
    return postRepository.findTop10ByCreatedBefore(before);
  }

  public List<Post> getMyPosts(String username, ZonedDateTime before) {
    if (before == null)
      before = ZonedDateTime.now();
    return postRepository.findTop10ByAuthorUsernameAndCreatedBefore(username,
                                                                    before);
  }
}
