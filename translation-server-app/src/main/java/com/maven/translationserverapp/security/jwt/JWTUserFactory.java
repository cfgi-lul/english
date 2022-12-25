package com.maven.translationserverapp.security.jwt;

import com.maven.translationserverapp.model.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collections;


// создание новых JWT пользователей (фабрика)
public final class JWTUserFactory {
    public JWTUserFactory() {
    }

    public static JWTUser create(User user) {
        return new JWTUser(user.getId(), user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmail(),
                           user.getPassword(),
                           new ArrayList<>(Collections.singleton(new SimpleGrantedAuthority("ADMIN")))
        );
    }

}
