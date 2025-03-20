package dev.merzin.forum.account;

import org.springframework.beans.factory.annotation.Autowired;
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

	@PostMapping
	public void register(@RequestBody AccountRegistration registration) {
		accountService.register(registration);
	}

	@GetMapping("{username}")
	public AccountProfile getAccountProfile(@PathVariable String username) {
		return accountService.getAccountProfileByUsername(username);
	}
}
