package com.maven.translationserverapp.service;

import com.maven.translationserverapp.model.User;

public interface UserService {
    User register(User user);

    User findByUsername(String username);
    User findByEmail(String email);

    User findById(Long id);
}
