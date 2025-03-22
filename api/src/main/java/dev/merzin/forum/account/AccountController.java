package dev.merzin.forum.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
public class AccountController {
	@Autowired
	private AccountService accountService;

	@GetMapping
	public AccountResponse getAccount() {
		var authentication = SecurityContextHolder.getContext().getAuthentication();
		var account = accountService.getAccountByUsername(authentication.getName());
		return new AccountResponse(account);
	}

	@PostMapping("/register")
	public void register(@RequestBody AccountRegistration registration) {
		accountService.register(registration);
	}

	@PostMapping("/login")
	public String login(@RequestBody AccountAuthentication authentication) {
		return accountService.verifyCredentials(authentication);
	}

	@GetMapping("/{username}")
	public AccountResponse getAccount(@PathVariable String username) {
		return new AccountResponse(accountService.getAccountByUsername(username));
	}
}
