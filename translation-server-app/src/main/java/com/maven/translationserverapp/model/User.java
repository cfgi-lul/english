package com.maven.translationserverapp.model;

// работа с БД

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users") // модель User привязана к таблице users из БД
@Data
public class User {
    @Id
    // каждый новый пользователь получит свой id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username") // обращаемся к столбцу username
    private String username;
    @Column(name = "email") // обращаемся к столбцу email
    private String email;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserDictionary> dictionaries;
}
