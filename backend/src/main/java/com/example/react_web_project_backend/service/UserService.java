package com.example.react_web_project_backend.service;

import com.example.react_web_project_backend.dto.*;
import com.example.react_web_project_backend.exception.InvalidCredentialsException;
import com.example.react_web_project_backend.model.User;
import com.example.react_web_project_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User addUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("User with name already exists");
        }
        return userRepository.save(user);
    }

    public boolean deleteUser(Long id) {
        if (!userRepository.existsById(id)) return false;
        userRepository.deleteById(id);
        return true;
    }

    public LoggedInUserDto login(LogInRequestDto dto) {
        return userRepository.findByUsername(dto.username())
                .map(user -> {
                    if (!user.getPassword().equals(dto.password())) {
                        throw new InvalidCredentialsException("Wrong password");
                    }
                    LocalDateTime timestamp = LocalDateTime.now();
                    user.setLastLogin(timestamp);
                    userRepository.save(user);
                    String token = UUID.randomUUID().toString();
                    return new LoggedInUserDto(user.getId(), user.getUsername(), token, timestamp);
                })
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));
    }

    public User updateUser(UpdateUserRequestDto dto) {
        User user = userRepository.findById(dto.id())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!user.getPassword().equals(dto.oldPassword())) {
            throw new IllegalArgumentException("Incorrect current password");
        }

        String updatedName = dto.username().trim();
        if (updatedName.isEmpty()) {
            throw new IllegalArgumentException("Username cannot be blank");
        }

        String updatedPassword = dto.newPassword() != null && !dto.newPassword().isBlank()
                ? dto.newPassword().trim()
                : user.getPassword();

        return userRepository.save(new User(dto.id(), updatedName, updatedPassword));
    }
}
