package dev.merzin.forum.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;

@Service
public class EmailService {
	@Value("${spring.mail.username}")
	private String sender;
	@Autowired
	private JavaMailSender mailSender;

	public void sendEmail(Email email) throws MessagingException {
		var message = mailSender.createMimeMessage();
		var helper = new MimeMessageHelper(message, true);
		helper.setFrom(sender);
		helper.setTo(email.getRecipient());
		helper.setSubject(email.getSubject());
		helper.setText(email.getBody(), true);
		mailSender.send(message);
	}
}
