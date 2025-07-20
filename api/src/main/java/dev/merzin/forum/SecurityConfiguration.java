package dev.merzin.forum;

import dev.merzin.forum.account.AccountService;
import dev.merzin.forum.jwt.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
  @Autowired private AccountService accountService;
  @Autowired private JwtFilter jwtFilter;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http)
      throws Exception {
    return http.csrf(customizer -> customizer.disable())
        .cors(customizer -> customizer.configurationSource(request -> {
          var cors = new CorsConfiguration();
          cors.addAllowedOrigin("*");
          cors.addAllowedMethod("*");
          cors.addAllowedHeader("*");
          return cors;
        }))
        .authorizeHttpRequests(request -> {
          request.requestMatchers("/account/*").permitAll();
          request.requestMatchers("/post/list/new").permitAll();
          request.requestMatchers("/post/list/user/*").permitAll();
          request.requestMatchers("/post/*").permitAll();
          request.requestMatchers("/comment/list/post/*").permitAll();
          request.requestMatchers("/comment/list/user/*").permitAll();
          request.requestMatchers("/email/verify/*").permitAll();
          request.anyRequest().authenticated();
        })
        .httpBasic(Customizer.withDefaults())
        .sessionManagement(
            session
            -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
  }

  @Bean
  public AuthenticationProvider authenticationProvider() {
    var provider = new DaoAuthenticationProvider();
    provider.setPasswordEncoder(new BCryptPasswordEncoder(12));
    provider.setUserDetailsService(accountService);
    return provider;
  }

  @Bean
  public AuthenticationManager
  authenticationManager(AuthenticationConfiguration configuration)
      throws Exception {
    return configuration.getAuthenticationManager();
  }
}
