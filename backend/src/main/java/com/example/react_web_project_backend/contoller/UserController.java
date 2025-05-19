package com.example.react_web_project_backend.contoller;


import com.example.react_web_project_backend.dto.GameStatsUpdateDto;
import com.example.react_web_project_backend.dto.RegisterRequestDto;
import com.example.react_web_project_backend.dto.UpdateUserRequestDto;
import com.example.react_web_project_backend.dto.UserDto;
import com.example.react_web_project_backend.exception.InvalidCredentialsException;
import com.example.react_web_project_backend.model.User;
import com.example.react_web_project_backend.service.UserService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable UUID id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add-user")
    public ResponseEntity<?> addUser(@RequestBody @Valid RegisterRequestDto dto) {
        try {
            User created = userService.addUser(dto.name().trim(), dto.password().trim());
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Username is already taken. Please choose another one."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String name, @RequestParam String password) {
        try {
            UserDto user = userService.login(name, password);
            return ResponseEntity.ok(user);
        } catch (InvalidCredentialsException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        return userService.deleteUser(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUserStats(@PathVariable UUID id, @RequestBody GameStatsUpdateDto update) {
        try {
            userService.updateStats(id, update);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/update-user")
    public ResponseEntity<?> updateUser(@RequestBody @Valid UpdateUserRequestDto dto) {
        try {
            User updated = userService.updateUser(dto);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }
}
