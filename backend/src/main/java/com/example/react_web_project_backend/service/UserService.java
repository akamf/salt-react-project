package com.example.react_web_project_backend.service;

import com.example.react_web_project_backend.dto.GameStatsUpdateDto;
import com.example.react_web_project_backend.dto.LogInRequestDto;
import com.example.react_web_project_backend.dto.UpdateUserRequestDto;
import com.example.react_web_project_backend.dto.LoggedInUserDto;
import com.example.react_web_project_backend.exception.InvalidCredentialsException;
import com.example.react_web_project_backend.model.User;
import com.example.react_web_project_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
//
//import static com.example.react_web_project_backend.utils.GameStatUtils.handleBlackjackStats;
//import static com.example.react_web_project_backend.utils.GameStatUtils.handleTexasStats;

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
                    String token = UUID.randomUUID().toString();
                    return new LoggedInUserDto(user.getId(), user.getUsername(), token);
                })
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));
    }

    public User updateStats(Long id, GameStatsUpdateDto update) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));;
//        Map<String, GameStats> gameStatsMap = new HashMap<>(user.gameStats());

//        GameStats current = gameStatsMap.getOrDefault(
//            update.game(),
//            new GameStats(0, 0, 0, new HashMap<>())
//        );
//
//        GameStats updated;
//
//        switch (update.game()) {
//            case "blackjack" -> updated = handleBlackjackStats(current, update.outcome());
//            case "texas"     -> updated = handleTexasStats(current, update.outcome());
//            default -> {
//                Map<String, Integer> extras = new HashMap<>(current.extraStats());
//                extras.put(update.outcome(), extras.getOrDefault(update.outcome(), 0) + 1);
//                updated = new GameStats(current.wins(), current.losses(), current.ties(), extras);
//            }
//        }
//
//        gameStatsMap.put(update.game(), updated);
        User updatedUser = new User(
                user.getId(),
                user.getUsername(),
                user.getPassword()
        );
        userRepository.save(updatedUser);
        return updatedUser;
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
