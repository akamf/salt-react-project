package com.example.react_web_project_backend.dto;

import com.example.react_web_project_backend.model.User;
import jakarta.validation.constraints.NotBlank;

public record RegisterRequestDto(
        @NotBlank(message = "Username cannot be blank")
        String username,

        @NotBlank(message = "Password cannot be blank")
        String password
) {
        public static User userFromDto(RegisterRequestDto dto) {
                return new User(dto.username(), dto.password());
        }
}