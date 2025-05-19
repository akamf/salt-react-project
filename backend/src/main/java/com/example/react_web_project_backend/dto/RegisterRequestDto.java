package com.example.react_web_project_backend.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterRequestDto(
        @NotBlank(message = "Username cannot be blank")
        String name,

        @NotBlank(message = "Password cannot be blank")
        String password
) {}