package com.maven.translationserverapp.dto;

import lombok.Data;

@Data
public class UserDTO {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
