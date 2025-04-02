package dev.merzin.forum.account;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {
	Optional<Account> findByUsername(String username);

	@Query("""
		SELECT a
		FROM Account a
		WHERE a.email = :email
		AND a.emailVerified = true""")
	Optional<Account> findByVerifiedEmail(String email);
}
