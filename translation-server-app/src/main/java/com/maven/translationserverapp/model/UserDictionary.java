package com.maven.translationserverapp.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "dictionaries")
@Data
public class UserDictionary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rus")
    private String russianValue;
    @Column(name = "eng")
    private String englishValue;
    @Column(name = "learning_rating")
    private String learningRating;
    @Column(name = "description")
    private String description;

    @ManyToOne
    private User user;
}
