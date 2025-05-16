package com.example.react_web_project_backend.utils;


import com.example.react_web_project_backend.model.GameStats;

import java.util.HashMap;
import java.util.Map;

public class GameStatUtils {

    public static GameStats handleBlackjackStats(GameStats current, String outcome) {
        Map<String, Integer> extras = new HashMap<>(current.extraStats());

        switch (outcome) {
            case "win" -> {
                return new GameStats(current.wins() + 1, current.losses(), current.ties(), extras);
            }
            case "loss" -> {
                return new GameStats(current.wins(), current.losses() + 1, current.ties(), extras);
            }
            case "tie" -> {
                return new GameStats(current.wins(), current.losses(), current.ties() + 1, extras);
            }
            case "blackjack" -> {
                extras.put("blackjack", extras.getOrDefault("blackjack", 0) + 1);
                return new GameStats(current.wins() + 1, current.losses(), current.ties(), extras);
            }
            default -> {
                extras.put(outcome, extras.getOrDefault(outcome, 0) + 1);
                return new GameStats(current.wins(), current.losses(), current.ties(), extras);
            }
        }
    }
}