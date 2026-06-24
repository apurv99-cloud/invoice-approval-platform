package com.example.demo.DTO.Organization;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateOrganizationRequest {

    @NotBlank(message = "Organization name is required")
    private String organizationName;

//    public String getOrganizationName() {
//        return organizationName;
//    }
//
//    public void setOrganizationName(String organizationName) {
//        this.organizationName = organizationName;
//    }

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
    private String contactPersonName;

    private String contactPersonEmail;
}