package com.example.react_web_project_backend.dto;

public record BlackJackStatsResponseDto(
    String game,
    int wins,
    int losses,
    int ties,
    int blackjacks
) implements GameStatsResponseDto {}
