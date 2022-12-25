package com.maven.translationserverapp.service.interfaces;

import com.maven.translationserverapp.model.UserDictionary;

import java.util.List;
import java.util.Optional;

// интерфейс, который описывает какие методы нужно реализовать
public interface TranslationService {
    UserDictionary addWord(UserDictionary word);

    UserDictionary[] addWords(UserDictionary[] words);

    UserDictionary deleteWordById(Long id);

    List<UserDictionary> getWords(Long userId);

    UserDictionary updateWord(UserDictionary updatedWord);

    UserDictionary getWordById(Long id);
}
