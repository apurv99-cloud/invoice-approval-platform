package com.example.demo.Services.Impl;

import com.example.demo.DTO.Auth.AuthResponse;
import com.example.demo.DTO.Auth.LoginRequest;
import com.example.demo.DTO.User.UserResponse;
import com.example.demo.Entity.Users;
import com.example.demo.Entity.Users_Role;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.UserRoleRepository;
import com.example.demo.Services.AuthService;
import com.example.demo.Services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRoleRepository userRoleRepository;

    @Override
    public AuthResponse login(LoginRequest request) {

        Users user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invalid Email"));

        boolean matches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword());

        if (!matches) {

            throw new RuntimeException(
                    "Invalid Password");
        }

        Users_Role userRole =
                userRoleRepository
                        .findByUsers(user)
                        .stream()
                        .findFirst()
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Role not assigned"));

        String token =
                jwtService.generateToken(
                        user,
                        userRole.getRole()
                                .getRoleName()
                );

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .build();
    }

    @Override
    public UserResponse getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email = authentication.getName();

        Users user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Users_Role userRole = userRoleRepository
                .findByUsers(user)
                .stream()
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Role not assigned"));

        UserResponse response = new UserResponse();

        response.setUserId(user.getUser_id());

        response.setFullName(user.getFullName());

        response.setEmail(user.getEmail());

        response.setActive(user.getActive());

        response.setRoleName(
                userRole.getRole().getRoleName()
        );

        if (user.getOrganization() != null) {

            response.setOrganizationId(
                    user.getOrganization().getOrganizationId());

            response.setOrganizationName(
                    user.getOrganization().getOrganizationName());
        }

        response.setCreatedAt(
                user.getCreatedAt());

        return response;
    }


}