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

@CrossOrigin("http://localhost:10050")
@RestController
@RequestMapping(value = "/api/auth/")
public class AuthenticationRESTController {
    private final AuthenticationManager authenticationManager;

    private final JWTTokenProvider jwtTokenProvider;

    private final UserService userService;

    @Autowired
    public AuthenticationRESTController(AuthenticationManager authenticationManager, JWTTokenProvider jwtTokenProvider,
                                        UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }

    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequestDTO requestDto) {
        try {
            String username = requestDto.getUsername();
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, requestDto.getPassword()));
            User user = userService.findByUsername(username);

            if (user == null) {
                throw new UsernameNotFoundException("User with username: " + username + " not found");
            }

            String token = jwtTokenProvider.createToken(username);

            Map<Object, Object> response = new HashMap<>();
            response.put("username", username);
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (AuthenticationException error) {
            throw error;
        }
    }

    @PostMapping("register")
    @ResponseStatus(value = HttpStatus.OK)
    public void saveUser(@RequestBody UserDTO userDTO) {
        try {
            if (this.userService.findByUsername(userDTO.getUsername()) != null || this.userService.findByEmail(
                    userDTO.getEmail()) != null) {
                throw new Exception();
            }
            User user = new User();
            user.setEmail(userDTO.getEmail());
            user.setPassword(userDTO.getPassword());
            user.setLastName(userDTO.getLastName());
            user.setUsername(userDTO.getUsername());
            user.setFirstName(userDTO.getFirstName());
            this.userService.register(user);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User with this username or email already exist");
        }
    }
}
