package com.maven.translationserverapp.service;

import com.maven.translationserverapp.model.User;
import com.maven.translationserverapp.model.UserDictionary;
import com.maven.translationserverapp.repository.UserDictionaryRepository;
import com.maven.translationserverapp.repository.UserRepository;
import com.maven.translationserverapp.service.interfaces.TranslationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
public class TranslationServiceImpl implements TranslationService {
    private final UserRepository userRepository;
    private final UserDictionaryRepository userDictionaryRepository;

    public TranslationServiceImpl(UserRepository userRepository, UserDictionaryRepository userDictionaryRepository) { // конструктор класса
        this.userRepository = userRepository;
        this.userDictionaryRepository = userDictionaryRepository;
    }

    @Override
    public UserDictionary addWord(UserDictionary word) { // метод addWord принимает UserDictionary, возвращает UserDictionary
        return this.userDictionaryRepository.save(word); // сохраняем в БД передаваемое значение
    }

    @Override
    public UserDictionary[] addWords(UserDictionary[] words) {
        return this.userDictionaryRepository.saveAll(Arrays.asList(words)).toArray(new UserDictionary[0]);
    }

    @Override
    public UserDictionary deleteWordById(Long id) { // метод deleteWordById принимает Long, возращает UserDictionary
        this.userDictionaryRepository.deleteById(id); // ужаляем запись из базы по id
        return null;
    }

    @Override
    public List<UserDictionary> getWords(Long userId) {
        User user = this.userRepository.findById(userId).orElse(null);
        if (user == null) {
            return null;
        }

        return user.getDictionaries();
    }

    @Override
    public UserDictionary updateWord(UserDictionary updatedWord) {
        UserDictionary wordToUpdate = this.userDictionaryRepository.findById(updatedWord.getId()).orElse(null);
        if (wordToUpdate == null) {
            return null;
        }
        wordToUpdate.setDescription(updatedWord.getDescription());
        wordToUpdate.setLearningRating(updatedWord.getLearningRating());
        wordToUpdate.setEnglishValue(updatedWord.getEnglishValue());
        wordToUpdate.setRussianValue(updatedWord.getRussianValue());

        return this.userDictionaryRepository.save(wordToUpdate);
    }

    @Override
    // Optional<UserDictionary> значит может быть, а может не быть. Параметр в <> опционален
    public UserDictionary getWordById(Long id) {
        UserDictionary result = this.userDictionaryRepository.findById(id).orElse(null);

        if (result == null) {
            return null;
        }

        return result; // пытаемся найти запись по id
    }
}
