package com.maven.translationserverapp.service.interfaces;

import com.maven.translationserverapp.model.UserDictionary;

public interface TranslationService {
    UserDictionary addWord(UserDictionary word);

    UserDictionary[] addWords(UserDictionary[] words);

    UserDictionary deleteWordById(String id);

    UserDictionary[] getWords();

    UserDictionary updateWord(UserDictionary updatedWord);

    UserDictionary getWordById(UserDictionary updatedWord);
}
