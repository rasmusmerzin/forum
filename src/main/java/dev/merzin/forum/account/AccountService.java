package dev.merzin.forum.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements UserDetailsService {
	@Autowired
	private AccountRepository accountRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return accountRepository.findByUsername(username)
			.orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}

	public void register(AccountRegistration registration) {
		accountRepository.save(new Account(registration));
	}

	public AccountProfile getAccountProfileByUsername(String username) {
		return new AccountProfile(accountRepository.findByUsername(username)
			.orElseThrow(() -> new UsernameNotFoundException("User not found")));
	}
}
