package com.example.demo.Services;

public interface EmailService {
    void sendOnboardingEmail(
            String email,
            String organizationName,
            String token);
}
