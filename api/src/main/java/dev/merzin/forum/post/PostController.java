package dev.merzin.forum.post;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/post")
public class PostController {
	@Autowired
	private PostService postService;

	@PostMapping
	public PostResponse createPost(@RequestBody PostCreation postCreation) {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		var post = postService.createPost(postCreation, authentication.getName());
		return new PostResponse(post);
	}

	@DeleteMapping("/{id}")
	public void deletePost(@PathVariable UUID id) {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		postService.deletePost(id, authentication.getName());
	}

	@GetMapping("/{id}")
	public PostResponse getPost(@PathVariable UUID id) {
		return new PostResponse(postService.getPost(id));
	}

	@GetMapping("/list/new")
	public List<PostResponse> getNewPosts(@RequestParam(required = false) ZonedDateTime before) {
		return postService.getNewPosts(before).stream().map(PostResponse::new).toList();
	}

	@GetMapping("/list/user/{username}")
	public List<PostResponse> getMyPosts(
		@PathVariable String username,
		@RequestParam(required = false) ZonedDateTime before
	) {
		return postService.getMyPosts(username, before).stream().map(PostResponse::new).toList();
	}
}
