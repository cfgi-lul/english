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
    public List<UserDictionary> getWords(Long userId) { // метод для получения всех слов пользователя
        User user = this.userRepository.findById(userId).orElse(null); //ищем пользователя
        if (user == null) { // проверка что он существует в базе
            return null;
        }

        return user.getDictionaries(); // возаращение коллеции слов пользователя
    }

    @Override
    public UserDictionary updateWord(UserDictionary updatedWord) { // Метод для обновления данных одной записи в табличке dictionaries
        UserDictionary wordToUpdate = this.userDictionaryRepository.findById(updatedWord.getId()).orElse(null); // ищем исходное слово для его обновления
        if (wordToUpdate == null) { // проверям что оно существует
            return null;
        }
        wordToUpdate.setDescription(updatedWord.getDescription());// обновляем поля
        wordToUpdate.setLearningRating(updatedWord.getLearningRating());// обновляем поля
        wordToUpdate.setEnglishValue(updatedWord.getEnglishValue());// обновляем поля
        wordToUpdate.setRussianValue(updatedWord.getRussianValue());// обновляем поля

        return this.userDictionaryRepository.save(wordToUpdate);// сохраняем обновленное слово в базу
    }

    @Override
    public UserDictionary getWordById(Long id) {// медод для получения одного слова пользователя по id
        UserDictionary result = this.userDictionaryRepository.findById(id).orElse(null); // ищем слово

        if (result == null) {// проверяем, что оно существует
            return null;
        }

        return result; // возаращаем найденное слово
    }
}
