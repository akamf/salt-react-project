package com.example.react_web_project_backend.dto;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

public record LoggedInUserDto(
        Long id,
        String username,
        String token,
        LocalDateTime timestamp
) {}
