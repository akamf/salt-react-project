package com.example.react_web_project_backend.model;

import java.util.Map;
import java.util.UUID;

public record User(
        UUID id,
        String name,
        String password,
        Map<String, GameStats> gameStats
) {}
