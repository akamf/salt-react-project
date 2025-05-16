package com.example.react_web_project_backend.service;

import com.example.react_web_project_backend.dto.UserDto;
import com.example.react_web_project_backend.exception.InvalidCredentialsException;
import com.example.react_web_project_backend.model.User;
import com.example.react_web_project_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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

    public Optional<User> getUserById(UUID id) {
        return userRepository.findById(id);
    }

    public User addUser(String name, String password) {
        if (userRepository.existsByName(name)) {
            throw new IllegalArgumentException("User with name already exists");
        }

        UUID id = UUID.randomUUID();
        User user = new User(id, name, password, new HashMap<>());
        return userRepository.save(user);
    }

    public boolean deleteUser(UUID id) {
        if (!userRepository.existsById(id)) return false;
        return userRepository.deleteUser(id);
    }

    public UserDto login(String name, String password) {
        return userRepository.findByName(name)
                .map(user -> {
                    if (!user.password().equals(password)) {
                        throw new InvalidCredentialsException("Wrong password");
                    }
                    String token = UUID.randomUUID().toString();
                    return new UserDto(user.id(), user.name(), user.gameStats(), token);
                })
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));
    }
}
