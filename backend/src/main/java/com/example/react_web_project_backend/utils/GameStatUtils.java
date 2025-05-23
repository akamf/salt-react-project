package com.example.react_web_project_backend.utils;


import java.util.HashMap;
import java.util.Map;

public class GameStatUtils {

//    public static GameStats handleBlackjackStats(GameStats current, String outcome) {
//        Map<String, Integer> extras = new HashMap<>(current.extraStats());
//
//        final GameStats winstats = new GameStats(current.wins() + 1, current.losses(), current.ties(), extras);
//        switch (outcome) {
//            case "win" -> {
//                return winstats;
//            }
//            case "lose" -> {
//                return new GameStats(current.wins(), current.losses() + 1, current.ties(), extras);
//            }
//            case "tie" -> {
//                return new GameStats(current.wins(), current.losses(), current.ties() + 1, extras);
//            }
//            case "blackjack" -> {
//                extras.put("blackjack", extras.getOrDefault("blackjack", 0) + 1);
//                return winstats;
//            }
//            default -> {
//                extras.put(outcome, extras.getOrDefault(outcome, 0) + 1);
//                return new GameStats(current.wins(), current.losses(), current.ties(), extras);
//            }
//        }
//    }
//
//    public static GameStats handleTexasStats(GameStats current, String outcome) {
//        Map<String, Integer> extras = new HashMap<>(current.extraStats());
//
//        return switch (outcome) {
//            case "win" -> new GameStats(current.wins() + 1, current.losses(), current.ties(), extras);
//            case "loss" -> new GameStats(current.wins(), current.losses() + 1, current.ties(), extras);
//            case "tie" -> new GameStats(current.wins(), current.losses(), current.ties() + 1, extras);
//            case "fold" -> {
//                extras.put("fold", extras.getOrDefault("fold", 0) + 1);
//                yield new GameStats(current.wins(), current.losses(), current.ties(), extras);
//            }
//            case "all_in" -> {
//                extras.put("all_in", extras.getOrDefault("all_in", 0) + 1);
//                yield new GameStats(current.wins(), current.losses(), current.ties(), extras);
//            }
//            default -> {
//                extras.put(outcome, extras.getOrDefault(outcome, 0) + 1);
//                yield new GameStats(current.wins(), current.losses(), current.ties(), extras);
//            }
//        };
//    }
}