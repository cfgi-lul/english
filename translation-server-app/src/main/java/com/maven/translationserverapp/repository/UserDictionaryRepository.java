package com.maven.translationserverapp.repository;

import com.maven.translationserverapp.model.UserDictionary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDictionaryRepository extends JpaRepository<UserDictionary, Long> {
//    UserDictionary findById(Long id);
}
