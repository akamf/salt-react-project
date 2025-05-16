package com.example.react_web_project_backend.model;

import java.util.Map;

public record GameStats(
        int wins,
        int losses,
        int ties,
        Map<String, Integer> extraStats
) {}
