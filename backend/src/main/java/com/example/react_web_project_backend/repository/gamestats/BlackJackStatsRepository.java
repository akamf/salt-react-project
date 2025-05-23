package com.example.react_web_project_backend.repository.gamestats;

import com.example.react_web_project_backend.model.BlackJackStats;
import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;

public interface BlackJackStatsRepository extends ListCrudRepository<BlackJackStats, Long> {
    Optional<BlackJackStats> findByUserId(Long userId);
}
