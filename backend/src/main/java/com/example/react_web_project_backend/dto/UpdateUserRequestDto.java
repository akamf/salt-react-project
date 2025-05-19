package com.example.react_web_project_backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.UUID;

public record UpdateUserRequestDto(
        @NotBlank UUID id,
        @NotBlank String name,
        @NotBlank String oldPassword,
        String newPassword
) {}
