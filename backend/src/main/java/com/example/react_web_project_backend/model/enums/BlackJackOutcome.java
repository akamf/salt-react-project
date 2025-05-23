package com.example.react_web_project_backend.model.enums;

public enum BlackJackOutcome {
    WIN,
    LOSS,
    TIE,
    BLACKJACK;

    public static BlackJackOutcome fromString(String value) {
        return switch (value.toLowerCase()) {
            case "win" -> WIN;
            case "lose" -> LOSS;
            case "tie" -> TIE;
            case "blackjack" -> BLACKJACK;
            default -> throw new IllegalArgumentException("Unknown outcome: " + value);
        };
    }
}
