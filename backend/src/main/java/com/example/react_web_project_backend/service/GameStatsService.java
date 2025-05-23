package com.example.react_web_project_backend.service;

import com.example.react_web_project_backend.dto.BlackJackStatsResponseDto;
import com.example.react_web_project_backend.dto.GameStatsResponseDto;
import com.example.react_web_project_backend.dto.GameStatsUpdateDto;
import com.example.react_web_project_backend.model.BlackJackStats;
import com.example.react_web_project_backend.model.User;
import com.example.react_web_project_backend.model.enums.BlackJackOutcome;
import com.example.react_web_project_backend.repository.UserRepository;
import com.example.react_web_project_backend.repository.gamestats.BlackJackStatsRepository;
import org.springframework.stereotype.Service;

@Service
public class GameStatsService {
    private final UserRepository userRepository;
    private final BlackJackStatsRepository blackJackStatsRepository;

    public GameStatsService(
            UserRepository userRepository,
            BlackJackStatsRepository blackJackStatsRepository
    ) {
        this.userRepository = userRepository;
        this.blackJackStatsRepository = blackJackStatsRepository;
    }

    public GameStatsResponseDto updateStats(Long user_id, GameStatsUpdateDto update) {
        User user = userRepository.findById(user_id).orElse(null);

        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        switch(update.game()) {
            case "blackjack" -> {
                BlackJackStats stats = blackJackStatsRepository.findByUserId(user_id).orElse(null);

                if (stats == null) {
                    stats = new BlackJackStats();
                    stats.setUser(user);
                }

                BlackJackOutcome outcome = BlackJackOutcome.valueOf(update.outcome().toUpperCase());
                stats.apply(outcome);

                blackJackStatsRepository.save(stats);

                return new BlackJackStatsResponseDto(
                        "blackjack",
                        stats.getWins(),
                        stats.getLosses(),
                        stats.getTies(),
                        stats.getBlackjacks()
                );
            }

            default -> {
                throw new UnsupportedOperationException("Game type not supported: " + update.game());
            }
        }
    }
}
