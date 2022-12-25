package com.maven.translationserverapp.config;

import com.maven.translationserverapp.security.jwt.JWTConfigurer;
import com.maven.translationserverapp.security.jwt.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// Куда пускаем или не пускаем не авторизованных пользователей

@EnableWebSecurity
@Configuration // пометить класс как конфигурацию
public class SecurityConfig extends WebSecurityConfigurerAdapter { // SecurityConfig расширяет класс WebSecurityConfigurerAdapter
    private static final String AUTH_ENDPOINT = "/api/auth/**"; // путь до рест-контроллера
    private static final String DICTIONARY_ENDPOINT = "/api/dictionary"; // путь до другого рест-контроллера
    private final JWTTokenProvider jwtTokenProvider; // класс работает с jwt Token

    @Autowired // внедрение зависимостей
    public SecurityConfig(JWTTokenProvider jwtTokenProvider) { // конструктор класса
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Bean
    @Override // переопределение метода родительского коасса
    public AuthenticationManager authenticationManagerBean() throws Exception { // метод, который возвращает authenticationManagerBean из родителя WebSecurityConfigurerAdapter
        return super.authenticationManagerBean();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors() // cors
                .and()
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests().antMatchers(AUTH_ENDPOINT).permitAll()// по пути AUTH_ENDPOINT разрешаем ходить всем
                .antMatchers(DICTIONARY_ENDPOINT).hasAnyRole()// по адресу DICTIONARY_ENDPOINT разрешаем ходить только пользовтаелям с ролью
                .anyRequest().authenticated()// для всех остальных адресов нужна аутентификация
                .and()
                .apply(new JWTConfigurer(jwtTokenProvider));// работаем с jwt Token
    }
}