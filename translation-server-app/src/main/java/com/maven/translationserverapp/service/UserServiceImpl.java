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

// реализует интерфейс юзер сервис
@Service
@Slf4j
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository; // объявляем переменные
    private final UserDictionaryRepository userDictionaryRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserDictionaryRepository userDictionaryRepository,
                           BCryptPasswordEncoder passwordEncoder) { // конструктор класса
        this.userRepository = userRepository;
        this.userDictionaryRepository = userDictionaryRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User register(User user) { // метод принимает User, предает User
        List<UserDictionary> userDictionaries = new ArrayList<>(); // создает переменную список словарей пользователей
        user.setPassword(passwordEncoder.encode(user.getPassword())); // устанавливает пароль
        user.setDictionaries(userDictionaries); // устанавливает список словарей пользователей
        User registeredUser = userRepository.save(user); // сохраняем юзера в БД
        log.info("IN register - user: {} successfully registered", registeredUser);

        return registeredUser; // возвращаем зарегистрированного юзера
    }

    @Override
    public User findByUsername(String username) { // ищем в БД такого юзера с именем username
        return userRepository.findByUsername(username);
    }

    @Override
    public User findByEmail(String email) { // ищем в БД такого юзера с email
        return userRepository.findByEmail(email);
    }

    @Override
    public User findById(Long id) { // ищем пользователя по id
        User result = userRepository.findById(id).orElse(null); // пытаемся найти пользовователя

        if (result == null) { // обрабатываем ошибку
            log.warn("IN findById - no user found by id: {}", id);
            return null; // если не нашли ошибку, то вернуть null
        }

        log.info("IN findById - user: {} found by id: " + id, result.getId());
        return result;
    }
}
