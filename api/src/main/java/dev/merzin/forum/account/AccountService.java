package dev.merzin.forum.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import dev.merzin.forum.jwt.JwtService;

@Service
public class AccountService implements UserDetailsService {
	@Autowired
	private AccountRepository accountRepository;
	@Lazy
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtService jwtService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return accountRepository.findByUsername(username)
			.orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}

	public void register(AccountRegistration registration) {
		accountRepository.save(new Account(registration));
	}

	public Account getAccountByUsername(String username) {
		return accountRepository.findByUsername(username)
			.orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}

	public String verifyCredentials(AccountAuthentication a) {
		var token = new UsernamePasswordAuthenticationToken(a.username(), a.password());
		authenticationManager.authenticate(token);
		return jwtService.generateToken(a.username(), a.rememberMe());
	}
}
