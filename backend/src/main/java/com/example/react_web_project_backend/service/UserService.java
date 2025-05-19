package com.example.react_web_project_backend.service;

import com.example.react_web_project_backend.dto.GameStatsUpdateDto;
import com.example.react_web_project_backend.dto.UpdateUserRequestDto;
import com.example.react_web_project_backend.dto.UserDto;
import com.example.react_web_project_backend.exception.InvalidCredentialsException;
import com.example.react_web_project_backend.model.GameStats;
import com.example.react_web_project_backend.model.User;
import com.example.react_web_project_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static com.example.react_web_project_backend.utils.GameStatUtils.handleBlackjackStats;
import static com.example.react_web_project_backend.utils.GameStatUtils.handleTexasStats;

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

    public void updateStats(UUID id, GameStatsUpdateDto update) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));;
        Map<String, GameStats> gameStatsMap = new HashMap<>(user.gameStats());

        GameStats current = gameStatsMap.getOrDefault(
            update.game(),
            new GameStats(0, 0, 0, new HashMap<>())
        );

        GameStats updated;

        switch (update.game()) {
            case "blackjack" -> updated = handleBlackjackStats(current, update.outcome());
            case "texas"     -> updated = handleTexasStats(current, update.outcome());
            default -> {
                Map<String, Integer> extras = new HashMap<>(current.extraStats());
                extras.put(update.outcome(), extras.getOrDefault(update.outcome(), 0) + 1);
                updated = new GameStats(current.wins(), current.losses(), current.ties(), extras);
            }
        }

        gameStatsMap.put(update.game(), updated);
        User updatedUser = new User(user.id(), user.name(), user.password(), gameStatsMap);
        userRepository.save(updatedUser);
    }

    public User updateUser(UpdateUserRequestDto dto) {
        UUID id = dto.id();

        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!user.password().equals(dto.oldPassword())) {
            throw new IllegalArgumentException("Incorrect current password");
        }

        String updatedName = dto.name().trim();
        if (updatedName.isEmpty()) {
            throw new IllegalArgumentException("Username cannot be blank");
        }

        String updatedPassword = dto.newPassword() != null && !dto.newPassword().isBlank()
                ? dto.newPassword().trim()
                : user.password();

        return userRepository.save(new User(user.id(), updatedName, updatedPassword, user.gameStats()));
    }
}
