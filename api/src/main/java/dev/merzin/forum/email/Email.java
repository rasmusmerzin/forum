package dev.merzin.forum.email;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class Email {
	String recipient;
	String subject;
	String body;
}
