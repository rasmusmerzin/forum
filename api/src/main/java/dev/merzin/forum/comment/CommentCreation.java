package dev.merzin.forum.comment;

import java.util.UUID;

public record CommentCreation(UUID postId, String content) {}
