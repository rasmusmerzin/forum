package dev.merzin.forum.jwt;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	@Value("${jwt.secret}")
	private String secret;

	public String generateToken(String username) {
		return Jwts.builder()
			.subject(username)
			.issuedAt(new Date())
			.expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
			.signWith(getKey())
			.compact();
	}

	public boolean validateToken(String token) {
		return getClaims(token).getExpiration().after(new Date());
	}

	public String extractUsername(String token) {
		return getClaims(token).getSubject();
	}

	private Claims getClaims(String token) {
		return Jwts.parser()
			.verifyWith((SecretKey) getKey())
			.build()
			.parseSignedClaims(token)
			.getPayload();
	}

	private Key getKey() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
	}
}
