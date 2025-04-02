package dev.merzin.forum.email;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import dev.merzin.forum.account.AccountRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;

@Service
public class EmailService {
	@Value("${spring.mail.username}")
	private String sender;
	@Value("classpath:templates/verification.email.html")
	private Resource verificationEmailTemplate;
	@Autowired
	private JavaMailSender mailSender;
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private EmailVerificationRepository emailVerificationRepository;

	@Transactional
	public void sendVerificationEmail(String username) throws Exception {
		var account = accountRepository.findByUsername(username).orElseThrow();
		if (account.isEmailVerified()) throw new Exception("Email already verified");
		var linkedAccount = accountRepository.findByVerifiedEmail(account.getEmail());
		if (linkedAccount.isPresent()) throw new Exception("Email already in use");
		var verification = emailVerificationRepository.findPendingByAccountUsernameAndEmailAndCreatedAfter(
			account.getUsername(),
			account.getEmail(),
			ZonedDateTime.now().minusDays(1)
		).orElse(null);
		if (verification == null) {
			verification = new EmailVerification(account);
			emailVerificationRepository.save(verification);
		} else {
			var after = Instant.now().minusSeconds(30);
			if (verification.getSent().toInstant().isAfter(after)) throw new Exception("Email already sent");
		}
		var email = Email.builder()
			.recipient(account.getEmail())
			.subject("Verify your email")
			.body(formatVerificationEmail(account.getUsername(), verification.getId()))
			.build();
		sendEmail(email);
		verification.updateSent();
		emailVerificationRepository.save(verification);
	}

	@Transactional
	public void verifyEmail(UUID id) throws Exception {
		var verification = emailVerificationRepository.findById(id).orElseThrow();
		if (verification.isExpired()) throw new Exception("Verification expired");
		var account = verification.getAccount();
		account.verifyEmail(verification.getEmail());
		accountRepository.save(account);
		verification.updateConfirmed();
		emailVerificationRepository.save(verification);
	}

	private String formatVerificationEmail(String username, UUID verificationId) throws IOException {
		var template = StreamUtils.copyToString(verificationEmailTemplate.getInputStream(), StandardCharsets.UTF_8);
		return template.replaceAll("%USERNAME%", username).replaceAll("%ID%", verificationId.toString());
	}

	private void sendEmail(Email email) throws MessagingException, UnsupportedEncodingException {
		var message = mailSender.createMimeMessage();
		var helper = new MimeMessageHelper(message, true);
		helper.setFrom(sender, "Merzin Forum");
		helper.setTo(email.getRecipient());
		helper.setSubject(email.getSubject());
		helper.setText(email.getBody(), true);
		mailSender.send(message);
	}
}
