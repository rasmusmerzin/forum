package dev.merzin.forum.favorite;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.merzin.forum.account.AccountService;
import dev.merzin.forum.comment.CommentResponse;
import dev.merzin.forum.post.PostResponse;

@Service
public class FavoriteService {
	@Autowired
	private PostFavoriteRepository postFavoriteRepository;
	@Autowired
	private CommentFavoriteRepository commentFavoriteRepository;
	@Autowired
	private AccountService accountService;

	public void favoritePost(UUID postId, String username) {
		var account = accountService.getAccountByUsername(username);
		var favorite = new PostFavorite(postId, account);
		postFavoriteRepository.save(favorite);
	}

	public void unfavoritePost(UUID postId, String username) {
		var favorite = postFavoriteRepository.findByAuthorUsernameAndPostId(username, postId).orElse(null);
		if (favorite == null) return;
		postFavoriteRepository.delete(favorite);
	}

	public List<PostResponse> populatePostFavorited(List<PostResponse> posts, String username) {
		var postIds = posts.stream().map(PostResponse::getId).toList();
		var favorites = postFavoriteRepository.findByAuthorUsernameAndPostIdIn(username, postIds);
		for (var post : posts)
			post.setFavorited(favorites.stream().anyMatch(f -> f.getPostId().equals(post.getId())));
		return posts;
	}

	public void favoriteComment(UUID commentId, String username) {
		var account = accountService.getAccountByUsername(username);
		var favorite = new CommentFavorite(commentId, account);
		commentFavoriteRepository.save(favorite);
	}

	public void unfavoriteComment(UUID commentId, String username) {
		var favorite = commentFavoriteRepository.findByAuthorUsernameAndCommentId(username, commentId).orElse(null);
		if (favorite == null) return;
		commentFavoriteRepository.delete(favorite);
	}

	public List<CommentResponse> populateCommentFavorited(List<CommentResponse> comments, String username) {
		var commentIds = comments.stream().map(CommentResponse::getId).toList();
		var favorites = commentFavoriteRepository.findByAuthorUsernameAndCommentIdIn(username, commentIds);
		for (var comment : comments)
			comment.setFavorited(favorites.stream().anyMatch(f -> f.getCommentId().equals(comment.getId())));
		return comments;
	}
}
