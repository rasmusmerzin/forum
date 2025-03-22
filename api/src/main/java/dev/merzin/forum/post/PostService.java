package dev.merzin.forum.post;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.merzin.forum.account.AccountService;

@Service
public class PostService {
	@Autowired
	private PostRepository postRepository;
	@Autowired
	private AccountService accountService;

	public Post createPost(PostCreation postCreation, String username) {
		var account = accountService.getAccountByUsername(username);
		var post = new Post(postCreation, account);
		return postRepository.save(post);
	}

	public Post getPost(UUID id) {
		return postRepository.findById(id).orElse(null);
	}

	public List<Post> getNewPosts(ZonedDateTime before) {
		if (before == null) before = ZonedDateTime.now();
		return postRepository.findTop10ByCreatedBeforeOrderByCreatedDesc(before);
	}

	public List<Post> getMyPosts(String username, ZonedDateTime before) {
		if (before == null) before = ZonedDateTime.now();
		return postRepository.findTop10ByAuthorUsernameAndCreatedBeforeOrderByCreatedDesc(username, before);
	}
}
