package dev.merzin.forum.comment;

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
@RequestMapping("/comment")
public class CommentController {
	@Autowired
	private CommentService commentService;

	@PostMapping
	public CommentResponse createComment(@RequestBody CommentCreation commentCreation) {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		var comment = commentService.createComment(commentCreation, authentication.getName());
		return new CommentResponse(comment);
	}

	@DeleteMapping("/{id}")
	public void deleteComment(@PathVariable UUID id) {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		commentService.deleteComment(id, authentication.getName());
	}

	@GetMapping("/list/post/{postId}")
	public List<CommentResponse> getPostComments(
		@PathVariable UUID postId,
		@RequestParam(required = false) ZonedDateTime after
	) {
		return commentService.getPostComments(postId, after).stream().map(CommentResponse::new).toList();
	}
}
