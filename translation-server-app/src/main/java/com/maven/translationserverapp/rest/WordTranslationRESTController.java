package com.maven.translationserverapp.rest;

import com.maven.translationserverapp.dto.WordTranslationDTO;
import com.maven.translationserverapp.model.UserDictionary;
import com.maven.translationserverapp.security.jwt.JWTTokenProvider;
import com.maven.translationserverapp.service.interfaces.TranslationService;
import com.maven.translationserverapp.service.interfaces.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin("http://localhost:10050")
@Slf4j
@RestController
@RequestMapping(value = "/api/dictionary/")
public class WordTranslationRESTController {

    private final TranslationService translationService;
    private final UserService userService;
    private final JWTTokenProvider jwtTokenProvider;


    //
    @Autowired
    public WordTranslationRESTController(UserService userService, TranslationService translationService,
                                         JWTTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.translationService = translationService;
        this.jwtTokenProvider = jwtTokenProvider;

    }

    @PostMapping("add-word")
    public ResponseEntity<?> addWord(@RequestBody WordTranslationDTO requestDto) {
        try {
            System.out.println("requestDto" + requestDto + " ");
            UserDictionary word = new UserDictionary();
            word.setUser(this.userService.findByUsername("qwer"));
            word.setDescription(requestDto.getDescription());
            word.setEnglishValue(requestDto.getEnd());
            word.setRussianValue(requestDto.getRus());

            this.translationService.addWord(word);
            return ResponseEntity.ok(200);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid password or username");
        }
    }
}
