package com.maven.translationserverapp.config;

import com.maven.translationserverapp.security.jwt.JWTConfigurer;
import com.maven.translationserverapp.security.jwt.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter{
    private final JWTTokenProvider jwtTokenProvider;

    private static final String LOGIN_ENDPOINT = "/api/auth/login";
    private static final String REGISTER_ENDPOINT = "/api/auth/register";
    private static final String DICTIONARY_ENDPOINT = "/api/v1/auth/dictionary/**";

    @Autowired
    public SecurityConfig(JWTTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(LOGIN_ENDPOINT, REGISTER_ENDPOINT).permitAll()
                .antMatchers(DICTIONARY_ENDPOINT).hasAnyRole()
                .anyRequest().authenticated()
                .and()
                .apply(new JWTConfigurer(jwtTokenProvider));
    }
}
