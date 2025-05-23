package com.example.react_web_project_backend.repository;

import com.example.react_web_project_backend.model.User;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;

public interface UserRepository extends ListCrudRepository<User, Long> {
    boolean existsByUsername(@Size(max = 40) @NotNull String username);

    Optional<User> findByUsername(String username);
}
