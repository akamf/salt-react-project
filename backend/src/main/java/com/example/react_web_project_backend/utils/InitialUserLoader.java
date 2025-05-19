package com.example.react_web_project_backend.utils;

import com.example.react_web_project_backend.model.GameStats;
import com.example.react_web_project_backend.model.User;
import com.example.react_web_project_backend.repository.UserRepository;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class InitialUserLoader {

    public static void loadInitialUsers(UserRepository userRepository) {
        Map<String, GameStats> stats1 = new HashMap<>();
        stats1.put("blackjack", new GameStats(
                (int) (Math.random() * 10),  // wins
                (int) (Math.random() * 10),  // losses
                (int) (Math.random() * 5),   // ties
                Map.of("blackjack", (int) (Math.random() * 5))  // extraStats
        ));

        userRepository.save(new User(
                UUID.randomUUID(),
                "akamf",
                "test123",
                stats1
        ));
        userRepository.save(new User(
                UUID.randomUUID(),
                "user2",
                "s3cr37",
                new HashMap<>()
        ));
    }
}
