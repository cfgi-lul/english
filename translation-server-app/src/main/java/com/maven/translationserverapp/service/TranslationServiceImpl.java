package com.maven.translationserverapp.service;

import com.maven.translationserverapp.model.UserDictionary;
import com.maven.translationserverapp.repository.UserDictionaryRepository;
import com.maven.translationserverapp.repository.UserRepository;
import com.maven.translationserverapp.service.interfaces.TranslationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
@Slf4j
public class TranslationServiceImpl implements TranslationService {
    private final UserRepository userRepository;
    private final UserDictionaryRepository userDictionaryRepository;

    public TranslationServiceImpl(UserRepository userRepository, UserDictionaryRepository userDictionaryRepository) {
        this.userRepository = userRepository;
        this.userDictionaryRepository = userDictionaryRepository;
    }

    @Override
    public UserDictionary addWord(UserDictionary word) {
        return this.userDictionaryRepository.save(word);
    }

    @Override
    public UserDictionary[] addWords(UserDictionary[] words) {
        return this.userDictionaryRepository.saveAll(Arrays.asList(words)).toArray(new UserDictionary[0]);
    }

    @Override
    public UserDictionary deleteWordById(String id) {
        return null;
    }

    @Override
    public UserDictionary[] getWords() {
        return new UserDictionary[0];
    }

    @Override
    public UserDictionary updateWord(UserDictionary updatedWord) {
        return null;
    }

    @Override
    public UserDictionary getWordById(UserDictionary updatedWord) {
        return null;
    }
}
