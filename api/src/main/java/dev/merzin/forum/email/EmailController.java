package dev.merzin.forum.email;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/email")
public class EmailController {
	@Autowired
	private EmailService emailService;

	@GetMapping("/verify")
	public void sendVerificationEmail() throws Exception {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		emailService.sendVerificationEmail(authentication.getName());
	}

	@PostMapping("/verify/{id}")
	public void verifyEmail(@PathVariable UUID id) throws Exception {
		emailService.verifyEmail(id);
	}
}
