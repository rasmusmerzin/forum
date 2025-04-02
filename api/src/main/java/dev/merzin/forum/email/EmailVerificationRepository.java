package dev.merzin.forum.email;

import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmailVerificationRepository extends JpaRepository<EmailVerification, UUID> {
	@Query("""
		SELECT e
		FROM EmailVerification e
		WHERE e.account.username = :username
		AND e.email = :email
		AND e.confirmed IS NULL
		AND e.created > :after""")
	Optional<EmailVerification> findPendingByAccountUsernameAndEmailAndCreatedAfter(
		String username,
		String email,
		ZonedDateTime after
	);
}
