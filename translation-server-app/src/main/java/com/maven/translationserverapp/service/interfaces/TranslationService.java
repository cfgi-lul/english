package com.maven.translationserverapp.service.interfaces;

import com.maven.translationserverapp.model.UserDictionary;

import java.util.Optional;

public interface TranslationService {
    UserDictionary addWord(UserDictionary word);

    UserDictionary[] addWords(UserDictionary[] words);

    UserDictionary deleteWordById(Long id);

    UserDictionary[] getWords();

    UserDictionary updateWord(UserDictionary updatedWord);

    Optional<UserDictionary> getWordById(Long id);
}
