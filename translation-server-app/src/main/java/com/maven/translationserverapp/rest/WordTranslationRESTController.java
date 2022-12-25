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

@CrossOrigin("http://localhost:10050")
@RestController
@RequestMapping(value = "/api/dictionary/")
public class WordTranslationRESTController {

    private final TranslationService translationService;
    private final UserService userService;

    @Autowired
    public WordTranslationRESTController(UserService userService, TranslationService translationService) {
        this.userService = userService;
        this.translationService = translationService;
    }

    @PostMapping("add-word")
    @ResponseStatus(value = HttpStatus.OK)
    public void addWord(@RequestBody WordTranslationDTO requestDto) {
        try {
            UserDictionary word = new UserDictionary();
            word.setDescription(requestDto.getDescription());
            word.setEnglishValue(requestDto.getEng());
            word.setRussianValue(requestDto.getRus());
            word.setLearningRating("0");
            Long userId = ((JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            word.setUserId(userId);
            word.setUser(userService.findById(userId));
            this.translationService.addWord(word);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Word already exist");
        }
    }

    @DeleteMapping("delete-word")
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteWord(@RequestBody Long id) {
        Long userId = ((JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        userService.findById(userId);

        UserDictionary word = this.translationService.getWordById(id);
        if (word == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No such word to delete");
        }
        if (!Objects.equals(userId, word.getUserId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot delete someone else's word");
        }
        this.translationService.deleteWordById(id);
    }

    @GetMapping("get-word")
    public ResponseEntity<UserDictionary> getWord(@RequestBody Long id) {
        Long userId = ((JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        UserDictionary word = this.translationService.getWordById(id);

        if (word == null || Objects.equals(word.getUserId(), userId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No such word to get");
        }
        return ResponseEntity.ok(word);
    }

    @GetMapping("get-words")
    public ResponseEntity<List<UserDictionary>> getWords() {
        try {
            Long userId = ((JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();

            List<UserDictionary> words = this.translationService.getWords(userId);

            return ResponseEntity.ok(words);
        } catch (Error error) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Some shit happened");
        }
    }
}
