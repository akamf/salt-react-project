package com.example.react_web_project_backend.repository;

import org.apache.el.stream.Optional;
import org.springframework.stereotype.Service;

import java.util.List;
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
        return userRepository.findbyId(id);
    }

    public User adduser(String name, String password) {
        UUID id = UUID.randomUUID();
        User user = new User(id, name, password);
        return userRepository.save(user);
    }

    public boolean deleteuser(UUID id) {
        return userRepository.deleteUser(id);
    }
}
