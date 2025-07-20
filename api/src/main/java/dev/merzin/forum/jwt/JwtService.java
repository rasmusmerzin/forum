package dev.merzin.forum.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
  @Value("${jwt.secret}") private String secret;
  private long DAY_MS = 1000 * 60 * 60 * 24;
  private long MONTH_MS = DAY_MS * 30;

  public String generateToken(String username, boolean rememberMe) {
    var exp =
        new Date(System.currentTimeMillis() + (rememberMe ? MONTH_MS : DAY_MS));
    return Jwts.builder()
        .subject(username)
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(exp)
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
        .verifyWith((SecretKey)getKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  private Key getKey() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
  }
}
