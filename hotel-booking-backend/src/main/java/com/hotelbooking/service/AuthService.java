package com.hotelbooking.service;

import com.hotelbooking.dto.request.LoginRequest;
import com.hotelbooking.dto.request.RegisterRequest;
import com.hotelbooking.dto.response.AuthResponse;
import com.hotelbooking.entity.User;
import com.hotelbooking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "Email already registered", null, null, null, null);
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhone(request.getPhone());
        user.setRole(User.Role.USER);

        User saved = userRepository.save(user);
        return new AuthResponse(true, "Registration successful", saved.getId(),
                saved.getName(), saved.getEmail(), saved.getRole().name());
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user == null) {
            return new AuthResponse(false, "User not found", null, null, null, null);
        }
        if (!user.getPassword().equals(request.getPassword())) {
            return new AuthResponse(false, "Invalid password", null, null, null, null);
        }
        return new AuthResponse(true, "Login successful", user.getId(),
                user.getName(), user.getEmail(), user.getRole().name());
    }
}