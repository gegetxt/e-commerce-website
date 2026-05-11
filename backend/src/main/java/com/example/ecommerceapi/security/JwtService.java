package com.example.ecommerceapi.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;

@Service
public class JwtService {

    private final String secret;
    private final long expirationMinutes;

    public JwtService(@Value("${app.security.secret}") String secret,
                      @Value("${app.security.token-expiration-minutes}") long expirationMinutes) {
        this.secret = secret;
        this.expirationMinutes = expirationMinutes;
    }

    public String generateToken(String email) {
        long expiresAt = Instant.now().plusSeconds(expirationMinutes * 60).getEpochSecond();
        String payload = email + ":" + expiresAt;
        return Base64.getUrlEncoder().withoutPadding().encodeToString((payload + ":" + sign(payload)).getBytes(StandardCharsets.UTF_8));
    }

    public String extractEmail(String token) {
        String[] parts = decode(normalize(token));
        return parts[0];
    }

    public boolean isTokenValid(String token) {
        try {
            String[] parts = decode(normalize(token));
            String payload = parts[0] + ":" + parts[1];
            long expiresAt = Long.parseLong(parts[1]);
            return parts[2].equals(sign(payload)) && Instant.now().getEpochSecond() <= expiresAt;
        } catch (Exception ex) {
            return false;
        }
    }

    private String[] decode(String token) {
        String decoded = new String(Base64.getUrlDecoder().decode(token), StandardCharsets.UTF_8);
        return decoded.split(":");
    }

    private String normalize(String token) {
        if (token == null) {
            return null;
        }
        if (token.startsWith("Bearer ")) {
            return token.substring(7).trim();
        }
        return token.trim();
    }

    private String sign(String payload) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            byte[] signature = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(signature);
        } catch (Exception ex) {
            throw new IllegalStateException("Token could not be created", ex);
        }
    }
}
