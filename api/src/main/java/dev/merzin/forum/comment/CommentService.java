package dev.merzin.forum.comment;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.merzin.forum.account.AccountService;
import dev.merzin.forum.favorite.CommentFavoriteRepository;
import jakarta.transaction.Transactional;

@Service
public class CommentService {
	@Autowired
	private CommentRepository commentRepository;
	@Autowired
	private CommentFavoriteRepository commentFavoriteRepository;
	@Autowired
	private AccountService accountService;

	public Comment createComment(CommentCreation commentCreation, String username) {
		var account = accountService.getAccountByUsername(username);
		var comment = new Comment(commentCreation, account);
		return commentRepository.save(comment);
	}

	@Transactional
	public void deleteComment(UUID id, String username) {
		var comment = commentRepository.findById(id).orElse(null);
		if (comment == null) return;
		if (!comment.getAuthor().getUsername().equals(username)) return;
		commentFavoriteRepository.deleteByCommentId(id);
		commentFavoriteRepository.flush();
		commentRepository.delete(comment);
	}

	public List<Comment> getPostComments(UUID postId, ZonedDateTime after) {
		if (after == null) return commentRepository.findTop10ByPostIdOrderByCreatedAsc(postId);
		return commentRepository.findTop10ByPostIdAndCreatedAfterOrderByCreatedAsc(postId, after);
	}
}
