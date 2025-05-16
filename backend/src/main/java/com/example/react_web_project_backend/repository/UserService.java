package com.example.react_web_project_backend.repository;

import com.example.react_web_project_backend.model.User;
import com.example.react_web_project_backend.service.UserRepository;
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
        UUID id = UUID.randomUUID();
        User user = new User(id, name, password, new HashMap<>());
        return userRepository.save(user);
    }

    public boolean deleteUser(UUID id) {
        return userRepository.deleteUser(id);
    }
}
