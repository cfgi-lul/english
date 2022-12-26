package com.maven.translationserverapp.rest;

import com.maven.translationserverapp.dto.AuthenticationRequestDTO;
import com.maven.translationserverapp.dto.UserDTO;
import com.maven.translationserverapp.model.User;
import com.maven.translationserverapp.security.jwt.JWTTokenProvider;
import com.maven.translationserverapp.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

// Контроллер для регистрации и авторизации пользователей

@CrossOrigin("http://localhost:10050") // с какого адреса можно делать запросы на этот контроллер
@RestController // контроллер не должен отдавать html страницы
@RequestMapping(value = "/api/auth/") // путь до контроллера
public class AuthenticationRESTController {
    private final AuthenticationManager authenticationManager; // объявляем переменную

    private final JWTTokenProvider jwtTokenProvider; // объявляем переменную

    private final UserService userService;// объявляем переменную

    @Autowired // внедрение зависимостей
    public AuthenticationRESTController(AuthenticationManager authenticationManager, JWTTokenProvider jwtTokenProvider,
                                        UserService userService) { // конструктор класса
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @PostMapping("login") // идем по /api/auth/login (постзапрос)
    public ResponseEntity<?> login(@RequestBody AuthenticationRequestDTO requestDto) { // публичный метод login возвращает ResponseEntity
        try {
            String username = requestDto.getUsername(); // из requestDto пытаемся получить getUsername
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, requestDto.getPassword()));
            User user = userService.findByUsername(username); // пытаемся найти в таблице users пользователя с именем username

            if (user == null) { // провряем на существование пользователя
                throw new UsernameNotFoundException("User with username: " + username + " not found"); // выкидываем ошибку
            }

            String token = jwtTokenProvider.createToken(username); // создаем токен для пользователя

            Map<Object, Object> response = new HashMap<>(); // создаем ответ для пользователя
            response.put("username", username); // в ответ устанавливаем поле username
            response.put("token", token); // в ответ устанавливаем поле token

            return ResponseEntity.ok(response); // возвращаем ответ пользователю
        } catch (AuthenticationException error) { // обрабатываем ошибки
            throw error; // выкидываем ошибку пользователю, если что-то пошло не так
        }
    }

    @PostMapping("register") // /api/auth/register путь до регистра. Это постзапрос
    @ResponseStatus(value = HttpStatus.OK) // штука нужная для пустого ответа сервера на запрос
    public void saveUser(@RequestBody UserDTO userDTO) { // метод ничего не возвращает и принимает UserDTO
        try {
            if (this.userService.findByUsername(userDTO.getUsername()) != null || this.userService.findByEmail(
                    userDTO.getEmail()) != null) { // проверяем есть ли в базе такой пользователь
                throw new Exception(); // выкидываем ошибку, если пользовтаель нашелся
            }
            User user = new User(); // 70-75 формируем нового пользователя для сохранения в БД
            user.setEmail(userDTO.getEmail());
            user.setPassword(userDTO.getPassword());
            user.setLastName(userDTO.getLastName());
            user.setUsername(userDTO.getUsername());
            user.setFirstName(userDTO.getFirstName());
            this.userService.register(user);// сохранение пользователя в БД
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with this username or email already exist"); // иначе возвращаем ошибку
        }
    }
}
