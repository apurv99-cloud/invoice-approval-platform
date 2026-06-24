package com.example.demo.Services;

import com.example.demo.DTO.Organization.*;
import com.example.demo.DTO.User.CreateOrganizationUserRequest;
import com.example.demo.DTO.User.UserResponse;

import java.util.List;

public interface OrganizationService {

    OrganizationResponse createOrganization(
            CreateOrganizationRequest request);

    OrganizationResponse updateOrganization(
            Long organizationId,
            UpdateOrganizationRequest request);

    void deactivateOrganization(Long organizationId);

    void activateOrganization(Long organizationId);

    OrganizationResponse getOrganization(Long organizationId);

    List<OrganizationResponse> getAllOrganizations();
    UserResponse createOrganizationAdmin(
            Long organizationId,   // POJO (Plain Old Java Object)
            CreateOrgAdminRequest request);

    UserResponse createOrganizationUser(
            CreateOrganizationUserRequest request);

    List<UserResponse> getMyOrganizationUsers();
    void deactivateOrganizationUser(Long userId);
    void activateOrganizationUser(Long userId);

    void sendOrganizationOnboarding(
            Long organizationId);

    void completeOnboarding(
            CompleteOnboardingRequest request);
}