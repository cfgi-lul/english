package com.maven.translationserverapp.rest;

import com.maven.translationserverapp.dto.WordTranslationDTO;
import com.maven.translationserverapp.model.UserDictionary;
import com.maven.translationserverapp.security.jwt.JWTUser;
import com.maven.translationserverapp.service.interfaces.TranslationService;
import com.maven.translationserverapp.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@CrossOrigin("http://localhost:10050") // разрешаем с этого адреса обращаться в наш контроллер
@RestController // не отдаем html
@RequestMapping(value = "/api/dictionary/") // идем по /api/dictionary/ к контроллеру
public class WordTranslationRESTController {

    private final TranslationService translationService; // объявляем переменную
    private final UserService userService;

    @Autowired // механизм внедренения завесимостей
    public WordTranslationRESTController(UserService userService, TranslationService translationService) { // конструктор класса
        this.userService = userService;
        this.translationService = translationService;
    }

    @PostMapping("add-word")// /api/dictionary/add-word . постзапрос
    @ResponseStatus(value = HttpStatus.OK) // штука нужная для пустого ответа сервера на запрос
    public void addWord(@RequestBody WordTranslationDTO requestDto) {
        try {
            UserDictionary word = new UserDictionary(); // создали переменную
            word.setDescription(requestDto.getDescription()); // 37-40 записываем параметры в созданную переменную
            word.setEnglishValue(requestDto.getEng());
            word.setRussianValue(requestDto.getRus());
            word.setLearningRating("0");
            //42-44 проверяем что запрос пришел от авторизированного пользователя
            Long userId = ((JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            word.setUserId(userId);
            word.setUser(userService.findById(userId));
            this.translationService.addWord(word); // записываем переменную в БД
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Word already exist"); // ошибка, если такого юзера нет в БД
        }
    }

    @DeleteMapping("delete-word") // /api/dictionary/delete-word. делит запрос
    @ResponseStatus(value = HttpStatus.OK) // штука нужная для пустого ответа сервера на запрос
    public void deleteWord(@RequestBody Long id) { // метод addWord возвращает ничего, принимает Long
        Long userId = ((JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        userService.findById(userId); // проверяем, что запрос от авторизованного пользователя

        UserDictionary word = this.translationService.getWordById(id); // пытаемся получить word по id
        if (word == null) { // проверяем что word в БД чуществует
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No such word to delete");
        }
        if (!Objects.equals(userId, word.getUserId())) { // проверяем что такой word в БД принадлежит пользователю, который сделал запрос
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot delete someone else's word");
        }
        this.translationService.deleteWordById(id); // если все ок, то удаляем word (запись) из БД
    }

    @GetMapping("get-word")  // /api/dictionary/get-word. get запрос для получения одного слова по его id
    public ResponseEntity<UserDictionary> getWord(@RequestBody Long id) { // метод принимает long id и возвращает ResponseEntity<UserDictionary>
        Long userId = ((JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId(); // проверяем, что запрос от авторизованного пользователя
        UserDictionary word = this.translationService.getWordById(id); // проверяем, что запрос от авторизованного пользователя

        if (word == null || Objects.equals(word.getUserId(), userId)) { // выкидываем ошибку если такого слова нет у пользователя
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No such word to get");
        }
        return ResponseEntity.ok(word);// даем пользователю ответ
    }

    @GetMapping("get-words")// /api/dictionary/get-words . get запрос для получения всех слов пользователя
    public ResponseEntity<List<UserDictionary>> getWords() {// метод не принимает ничего и возаращает ResponseEntity от коллекции слов пользователя
        try {
            Long userId = ((JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId(); // Получаем текущего пользователя из запроса

            List<UserDictionary> words = this.translationService.getWords(userId); // Находим все слова пользователя

            return ResponseEntity.ok(words); // Возвращаем пользователю коллекцию слов
        } catch (Error error) { // Обработка ошибок
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Some shit happened");
        }
    }
}
