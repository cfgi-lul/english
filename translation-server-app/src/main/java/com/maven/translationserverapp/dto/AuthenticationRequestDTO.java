package com.maven.translationserverapp.dto;

import lombok.Data;

@Data // создать для каждого поля геттер и сеттер
public class AuthenticationRequestDTO {
    private String username;
    private String password;
}
