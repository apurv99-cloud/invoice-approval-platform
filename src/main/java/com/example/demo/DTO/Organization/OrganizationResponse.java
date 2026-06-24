package com.example.demo.DTO.Organization;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrganizationResponse {

    private Long organizationId;
    private String organizationName;
    private String legalBusinessName;
    private String businessType;
    private String industryType;
    private String gstNumber;
    private String registrationNumber;
    private String email;
    private String phoneNumber;
    private String website;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private Boolean active;
    private String contactPersonName;

    private String contactPersonEmail;

    private Boolean onboardingCompleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Getters & Setters
}