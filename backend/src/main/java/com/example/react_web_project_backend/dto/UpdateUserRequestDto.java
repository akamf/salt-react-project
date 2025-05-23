package com.example.react_web_project_backend.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.UUID;

public record UpdateUserRequestDto(
        @NotBlank Long id,
        @NotBlank String username,
        @NotBlank String oldPassword,
        String newPassword
) {}
