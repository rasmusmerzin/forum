package dev.merzin.forum.post;

import java.time.ZonedDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
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
	public Post createPost(@RequestBody PostCreation postCreation) {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		return postService.createPost(postCreation, authentication.getName());
	}

	@GetMapping("/list/new")
	public List<Post> getNewPosts(@RequestParam(required = false) ZonedDateTime before) {
		return postService.getNewPosts(before);
	}
}
