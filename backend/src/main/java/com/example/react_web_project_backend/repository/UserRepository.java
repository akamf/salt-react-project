package com.example.react_web_project_backend.repository;


import com.example.react_web_project_backend.model.User;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class UserRepository {
    private final Map<UUID, User> usersDB = new HashMap<>();

    public List<User> findAll() {
        return new ArrayList<>(usersDB.values());
    }

    public Optional<User> findById(UUID id) {
        return Optional.ofNullable(usersDB.get(id));
    }

    public User save(User user) {
        usersDB.put(user.id(), user);
        return user;
    }

    public boolean deleteUser(UUID id) {
        return usersDB.remove(id) != null;
    }

    public boolean existsById(UUID id) {
        return usersDB.containsKey(id);
    }

    public boolean existsByName(String name) {
        return usersDB.values().stream().anyMatch(user -> user.name().equalsIgnoreCase(name));
    }
    public Optional<User> findByName(String name) {
        return usersDB.values().stream()
                .filter(user -> user.name().equalsIgnoreCase(name))
                .findFirst();
    }

}
