package com.example.demo.DTO.Organization;

import lombok.Data;

@Data
public class CompleteOnboardingRequest {
    private String token;
    private String password;
}
