package dev.merzin.forum.favorite;

import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/favorite")
public class FavoriteController {
  @Autowired private FavoriteService favoriteService;

  @PostMapping("/post/{postId}")
  public void favoritePost(@PathVariable UUID postId) {
    var username =
        SecurityContextHolder.getContext().getAuthentication().getName();
    favoriteService.favoritePost(postId, username);
  }

  @DeleteMapping("/post/{postId}")
  public void unfavoritePost(@PathVariable UUID postId) {
    var username =
        SecurityContextHolder.getContext().getAuthentication().getName();
    favoriteService.unfavoritePost(postId, username);
  }

  @PostMapping("/comment/{commentId}")
  public void favoriteComment(@PathVariable UUID commentId) {
    var username =
        SecurityContextHolder.getContext().getAuthentication().getName();
    favoriteService.favoriteComment(commentId, username);
  }

  @DeleteMapping("/comment/{commentId}")
  public void unfavoriteComment(@PathVariable UUID commentId) {
    var username =
        SecurityContextHolder.getContext().getAuthentication().getName();
    favoriteService.unfavoriteComment(commentId, username);
  }
}
