package com.example.react_web_project_backend.dto;

import com.example.react_web_project_backend.model.GameStats;

import java.util.Map;
import java.util.UUID;

public record UserDto(
        UUID id,
        String name,
        Map<String, GameStats> gameStats,
        String token
) {}
