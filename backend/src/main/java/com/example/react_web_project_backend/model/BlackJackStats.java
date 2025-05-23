package com.example.react_web_project_backend.model;

import com.example.react_web_project_backend.model.enums.BlackJackOutcome;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
public class BlackJackStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    private int wins = 0;
    private int losses = 0;
    private int ties = 0;
    private int blackjacks = 0;

    public void apply(BlackJackOutcome outcome) {
        switch (outcome) {
            case WIN -> this.wins++;
            case LOSS -> this.losses++;
            case TIE -> this.ties++;
            case BLACKJACK -> {
                this.blackjacks++;
                this.wins++;
            }
        }
    }

}
