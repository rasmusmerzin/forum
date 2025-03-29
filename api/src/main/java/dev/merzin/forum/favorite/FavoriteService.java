package dev.merzin.forum.favorite;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.merzin.forum.account.AccountService;
import dev.merzin.forum.post.PostResponse;

@Service
public class FavoriteService {
	@Autowired
	private PostFavoriteRepository postFavoriteRepository;
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

	public List<PostResponse> populateFavorite(List<PostResponse> posts, String username) {
		var postIds = posts.stream().map(PostResponse::getId).toList();
		var favorites = postFavoriteRepository.findByAuthorUsernameAndPostIdIn(username, postIds);
		for (var post : posts)
			post.setFavorited(favorites.stream().anyMatch(f -> f.getPostId().equals(post.getId())));
		return posts;
	}
}
