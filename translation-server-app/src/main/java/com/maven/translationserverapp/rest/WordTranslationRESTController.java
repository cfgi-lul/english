package com.maven.translationserverapp.rest;

import com.maven.translationserverapp.dto.WordTranslationDTO;
import com.maven.translationserverapp.model.UserDictionary;
import com.maven.translationserverapp.security.jwt.JWTUser;
import com.maven.translationserverapp.service.interfaces.TranslationService;
import com.maven.translationserverapp.service.interfaces.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

@CrossOrigin("http://localhost:10050")
@Slf4j
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
    public ResponseEntity<?> addWord(@RequestBody WordTranslationDTO requestDto) {
        try {
            UserDictionary word = new UserDictionary();
            word.setDescription(requestDto.getDescription());
            word.setEnglishValue(requestDto.getEnd());
            word.setRussianValue(requestDto.getRus());
            word.setLearningRating("0");
            Long userId = ((JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            word.setUserId(userId);
            word.setUser(userService.findById(userId));
            this.translationService.addWord(word);
            return ResponseEntity.ok(200);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Word already exist");
        }
    }

    @DeleteMapping("delete-word")
    public ResponseEntity<?> addWord(@RequestBody Long id) {
        Long userId = ((JWTUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        userService.findById(userId);

        Optional<UserDictionary> word = this.translationService.getWordById(id);
        if (!word.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No such word to delete");
        }
        if (!Objects.equals(userId, word.get().getUserId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot delete someone else's word");
        }
        this.translationService.deleteWordById(id);
        return ResponseEntity.ok(200);
    }
}
