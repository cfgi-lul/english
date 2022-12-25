package com.maven.translationserverapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @Column(name = "user_id", insertable = false, updatable = false)
    private Long userId;

    @ManyToOne
    @JsonBackReference
    private User user;
}
