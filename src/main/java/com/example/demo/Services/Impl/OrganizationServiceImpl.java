package com.example.demo.Services.Impl;

import com.example.demo.DTO.Organization.*;
import com.example.demo.DTO.User.CreateOrganizationUserRequest;
import com.example.demo.DTO.User.UserResponse;
import com.example.demo.Entity.*;
import com.example.demo.Repository.*;
import com.example.demo.Services.EmailService;
import com.example.demo.Services.OrganizationService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrganizationServiceImpl
        implements OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final OrganizationOnboardingTokenRepository
            organizationOnboardingTokenRepository;

    private final EmailService emailService;
//    private Organization organization;


    @Override
    public OrganizationResponse createOrganization(
            CreateOrganizationRequest request) {

        organizationRepository
                .findByOrganizationName(
                        request.getOrganizationName())
                .ifPresent(org -> {
                    throw new RuntimeException(
                            "Organization already exists");
                });

        Organization organization =
                Organization.builder()
                        .organizationName(
                                request.getOrganizationName())
                        .legalBusinessName(
                                request.getLegalBusinessName())
                        .businessType(
                                request.getBusinessType())
                        .industryType(
                                request.getIndustryType())
                        .gstNumber(
                                request.getGstNumber())
                        .registrationNumber(
                                request.getRegistrationNumber())
                        .email(
                                request.getEmail())
                        .phoneNumber(
                                request.getPhoneNumber())
                        .website(
                                request.getWebsite())
                        .addressLine1(
                                request.getAddressLine1())
                        .addressLine2(
                                request.getAddressLine2())
                        .contactPersonName(
                                request.getContactPersonName()
                        )
                        .contactPersonEmail(
                                request.getContactPersonEmail()
                        )
                        .onboardingCompleted(false)
                        .city(
                                request.getCity())
                        .state(
                                request.getState())
                        .country(
                                request.getCountry())
                        .pincode(
                                request.getPincode())

                        .active(true)


                        .build();

        Organization saved =
                organizationRepository.save(
                        organization);
        sendOrganizationOnboarding(saved.getOrganizationId());

        return mapToResponse(saved);
    }

    @Override
    public OrganizationResponse updateOrganization(
            Long organizationId,
            UpdateOrganizationRequest request) {

        Organization organization =
                organizationRepository.findById(
                                organizationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"));

        organization.setOrganizationName(
                request.getOrganizationName());

        organization.setLegalBusinessName(
                request.getLegalBusinessName());

        organization.setBusinessType(
                request.getBusinessType());

        organization.setIndustryType(
                request.getIndustryType());

        organization.setGstNumber(
                request.getGstNumber());

        organization.setRegistrationNumber(
                request.getRegistrationNumber());

        organization.setEmail(
                request.getEmail());

        organization.setPhoneNumber(
                request.getPhoneNumber());

        organization.setWebsite(
                request.getWebsite());

        organization.setAddressLine1(
                request.getAddressLine1());

        organization.setAddressLine2(
                request.getAddressLine2());
        organization.setContactPersonName(
                request.getContactPersonName());

        organization.setContactPersonEmail(
                request.getContactPersonEmail());

        organization.setOnboardingCompleted(false);

        organization.setCity(
                request.getCity());

        organization.setState(
                request.getState());

        organization.setCountry(
                request.getCountry());

        organization.setPincode(
                request.getPincode());


        return mapToResponse(
                organizationRepository.save(
                        organization));
    }

    @Override
    public void deactivateOrganization(Long organizationId) {

        Organization organization =
                organizationRepository.findById(organizationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"));

        organization.setActive(false);

        organizationRepository.save(organization);
    }

    @Override
    public void activateOrganization(Long organizationId) {

        Organization organization =
                organizationRepository.findById(organizationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"));

        organization.setActive(true);

        organizationRepository.save(organization);
    }

    @Override
    public OrganizationResponse getOrganization(
            Long organizationId) {

        Organization organization =
                organizationRepository.findById(organizationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"));

        return mapToResponse(organization);
    }

    @Override
    public List<OrganizationResponse>
    getAllOrganizations() {

        return organizationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public UserResponse createOrganizationAdmin(
            Long organizationId,
            CreateOrgAdminRequest request) {

        Organization organization =
                organizationRepository.findById(organizationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"));

//        if (userRepository.existsByEmail(request.getEmail())) {
//            throw new RuntimeException(
//                    "Email already exists");
//        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Users user = Users.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()))
                .organization(organization)
                .active(true)
                .deleted(false)
                .build();

        Users savedUser =
                userRepository.save(user);

        Role orgAdminRole =
                roleRepository.findByRoleName(
                                "ROLE_ORG_ADMIN")
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "ROLE_ORG_ADMIN not found"));

        Users_Role userRole =
                Users_Role.builder()
                        .users(savedUser)
                        .role(orgAdminRole)
                        .build();

        userRoleRepository.save(userRole);

        UserResponse response =
                new UserResponse();

        response.setUserId(savedUser.getUser_id());
        response.setFullName(savedUser.getFullName());
        response.setEmail(savedUser.getEmail());
        response.setOrganizationId(
                organization.getOrganizationId());
        response.setOrganizationName(
                organization.getOrganizationName());
        response.setActive(savedUser.getActive());
        response.setCreatedAt(savedUser.getCreatedAt());

        return response;
    }


    private UserResponse mapToResponse(
            Users users) {

        UserResponse response =
                new UserResponse();

        response.setUserId(
                users.getUser_id());

        response.setFullName(
                users.getFullName());

        response.setEmail(
                users.getEmail());

        response.setOrganizationId(
                users.getOrganization()
                        .getOrganizationId());

        response.setOrganizationName(
                users.getOrganization()
                        .getOrganizationName());

        response.setActive(
                users.getActive());

        response.setCreatedAt(
                users.getCreatedAt());

        userRoleRepository
                .findFirstByUsers(users)
                .ifPresent(userRole ->
                        response.setRoleName(
                                userRole.getRole()
                                        .getRoleName()));

        return response;
    }

    private OrganizationResponse mapToResponse(
            Organization organization) {

        OrganizationResponse response =
                new OrganizationResponse();

        response.setOrganizationId(
                organization.getOrganizationId());

        response.setOrganizationName(
                organization.getOrganizationName());

        response.setLegalBusinessName(
                organization.getLegalBusinessName());

        response.setBusinessType(
                organization.getBusinessType());

        response.setIndustryType(
                organization.getIndustryType());

        response.setGstNumber(
                organization.getGstNumber());

        response.setRegistrationNumber(
                organization.getRegistrationNumber());

        response.setEmail(
                organization.getEmail());

        response.setPhoneNumber(
                organization.getPhoneNumber());

        response.setWebsite(
                organization.getWebsite());

        response.setAddressLine1(
                organization.getAddressLine1());

        response.setAddressLine2(
                organization.getAddressLine2());
        response.setContactPersonName(
                organization.getContactPersonName()
        );
        response.setContactPersonEmail(
                organization.getContactPersonEmail()
        );
        response.setOnboardingCompleted(
                organization.getOnboardingCompleted()
        );

        response.setCity(
                organization.getCity());

        response.setState(
                organization.getState());

        response.setCountry(
                organization.getCountry());

        response.setPincode(
                organization.getPincode());


        response.setActive(
                organization.getActive());

        response.setCreatedAt(
                organization.getCreatedAt());

        response.setUpdatedAt(
                organization.getUpdatedAt());

        return response;
    }

    @Override
    public UserResponse createOrganizationUser(
            CreateOrganizationUserRequest request) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        Users orgAdmin =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Org Admin not found"));

        Organization organization =
                orgAdmin.getOrganization();

        if (organization == null) {

            throw new RuntimeException(
                    "Organization not found");
        }

        if (userRepository.findByEmail(
                request.getEmail()).isPresent()) {

            throw new RuntimeException(
                    "Email already exists");
        }

        List<String> allowedRoles = List.of(
                "ROLE_REVIEWER",
                "ROLE_FINANCE",
                "ROLE_DIRECTOR",
                "ROLE_CFO"
        );

        if (!allowedRoles.contains(request.getRoleName())) {

            throw new RuntimeException(
                    "Invalid role assignment");
        }

        Users user = Users.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()))
                .organization(organization)
                .active(true)
                .deleted(false)
                .build();

        Users savedUser =
                userRepository.save(user);


        Role role =
                roleRepository.findByRoleName(
                                request.getRoleName())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Role not found"));

        Users_Role userRole =
                Users_Role.builder()
                        .users(savedUser)
                        .role(role)
                        .build();

        userRoleRepository.save(userRole);

        UserResponse response =
                new UserResponse();

        response.setUserId(savedUser.getUser_id());
        response.setFullName(savedUser.getFullName());
        response.setEmail(savedUser.getEmail());

        response.setOrganizationId(
                organization.getOrganizationId());

        response.setOrganizationName(
                organization.getOrganizationName());

        response.setActive(savedUser.getActive());

        response.setCreatedAt(
                savedUser.getCreatedAt());

        return response;
    }

    @Override
    public List<UserResponse>
    getMyOrganizationUsers() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        Users admin =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));

        Organization organization =
                admin.getOrganization();

        return userRepository
                .findByOrganization(organization)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void deactivateOrganizationUser(
            Long userId) {

        Users targetUser =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        Users admin =
                userRepository.findByEmail(
                                authentication.getName())
                        .orElseThrow();

        if (targetUser.getUser_id()
                .equals(admin.getUser_id())) {

            throw new RuntimeException(
                    "You cannot deactivate yourself");
        }

        if (!targetUser.getOrganization()
                .getOrganizationId()
                .equals(
                        admin.getOrganization()
                                .getOrganizationId())) {

            throw new RuntimeException(
                    "Access denied");
        }

        targetUser.setActive(false);

        userRepository.save(targetUser);
    }

    @Override
    public void activateOrganizationUser(
            Long userId) {

        Users user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));

        user.setActive(true);

        userRepository.save(user);
    }

    @Override
    public void sendOrganizationOnboarding(
            Long organizationId) {

        Organization organization =
                organizationRepository.findById(
                                organizationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"));

        String token =
                UUID.randomUUID().toString();

        OrganizationOnboardingToken onboardingToken =
                OrganizationOnboardingToken.builder()
                        .token(token)
                        .email(
                                organization
                                        .getContactPersonEmail())
                        .used(false)
                        .expiryTime(
                                LocalDateTime.now()
                                        .plusDays(1))
                        .organization(
                                organization)
                        .build();

        organizationOnboardingTokenRepository
                .save(onboardingToken);

        emailService.sendOnboardingEmail(
                organization
                        .getContactPersonEmail(),
                organization
                        .getOrganizationName(),
                token);
    }

    @Override
    @Transactional
    public void completeOnboarding(
            CompleteOnboardingRequest request) {

        OrganizationOnboardingToken organizationOnboardingToken =
                organizationOnboardingTokenRepository
                        .findByToken(
                                request.getToken())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid Token"));

        if (Boolean.TRUE.equals(
                organizationOnboardingToken.getUsed())) {

            throw new RuntimeException(
                    "Token already used");
        }

        if (organizationOnboardingToken.getExpiryTime()
                .isBefore(
                        LocalDateTime.now())) {

            throw new RuntimeException(
                    "Token expired");
        }

        Organization organization =
                organizationOnboardingToken.getOrganization();

        Users orgAdmin =
                Users.builder()
                        .fullName(
                                organization
                                        .getContactPersonName())
                        .email(
                                organization
                                        .getContactPersonEmail())
                        .password(
                                passwordEncoder.encode(
                                        request.getPassword()))
                        .organization(
                                organization)
                        .active(true)
                        .deleted(false)
                        .build();

        Users savedUser =
                userRepository.save(
                        orgAdmin);

        Role role =
                roleRepository
                        .findByRoleName(
                                "ROLE_ORG_ADMIN")
                        .orElseThrow();

        Users_Role userRole =
                Users_Role.builder()
                        .users(savedUser)
                        .role(role)
                        .build();

        userRoleRepository.save(
                userRole);

        organizationOnboardingToken.setUsed(true);

        organizationOnboardingTokenRepository
                .save(organizationOnboardingToken);

        organization.setOnboardingCompleted(
                true);

        organizationRepository.save(
                organization);
    }
}