package com.maven.translationserverapp.service;

import com.maven.translationserverapp.model.User;
import com.maven.translationserverapp.model.UserDictionary;
import com.maven.translationserverapp.repository.UserDictionaryRepository;
import com.maven.translationserverapp.repository.UserRepository;
import com.maven.translationserverapp.service.interfaces.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserDictionaryRepository userDictionaryRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserDictionaryRepository userDictionaryRepository,
                           BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userDictionaryRepository = userDictionaryRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(User user) {
        List<UserDictionary> userDictionaries = new ArrayList<>();
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setDictionaries(userDictionaries);
        User registeredUser = userRepository.save(user);
        log.info("IN register - user: {} successfully registered", registeredUser);

        return registeredUser;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findById(Long id) {
        User result = userRepository.findById(id).orElse(null);

        if (result == null) {
            log.warn("IN findById - no user found by id: {}", id);
            return null;
        }

        log.info("IN findById - user: {} found by id: " + id, result);
        return result;
    }
}
