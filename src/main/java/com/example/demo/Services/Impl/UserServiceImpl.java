package com.example.demo.Services.Impl;

import com.example.demo.DTO.Organization.CreateOrgAdminRequest;
import com.example.demo.DTO.User.CreateUserRequest;
import com.example.demo.DTO.User.UpdateUserRequest;
import com.example.demo.DTO.User.UserResponse;
import com.example.demo.Entity.Organization;
import com.example.demo.Entity.Role;
import com.example.demo.Entity.Users;
import com.example.demo.Entity.Users_Role;
import com.example.demo.Repository.OrganizationRepository;
import com.example.demo.Repository.RoleRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.UserRoleRepository;
import com.example.demo.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRoleRepository userRoleRepository;
    private final RoleRepository roleRepository;

    @Override
    public UserResponse createUser(CreateUserRequest request) {

//        if (userRepository.existsByEmail(request.getEmail())) {
//            throw new RuntimeException("Email already exists");
//        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Organization organization =
                organizationRepository.findById(request.getOrganizationId())
                        .orElseThrow(() ->
                                new RuntimeException("Organization not found"));

        Users users = Users.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .organization(organization)
                .active(true)
                .deleted(false)
                .build();

        Users savedUser = userRepository.save(users);

        return mapToResponse(savedUser);
    }

    @Override
    public UserResponse updateUser(
            Long userId,
            UpdateUserRequest request
    ) {

        Users user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Update User Details
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());

        userRepository.save(user);

        // Update Role (if provided)
        if (request.getRoleName() != null &&
                !request.getRoleName().isBlank()) {

            Users_Role userRole = userRoleRepository
                    .findByUsers(user)
                    .stream()
                    .findFirst()
                    .orElseThrow(() ->
                            new RuntimeException("Role not assigned"));

            Role role = roleRepository
                    .findByRoleName(request.getRoleName())
                    .orElseThrow(() ->
                            new RuntimeException("Role not found"));

            userRole.setRole(role);

            userRoleRepository.save(userRole);
        }

        return mapToResponse(user);
    }

    @Override
    public UserResponse getUser(Long userId) {

        Users user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return mapToResponse(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {

        return userRepository.findByDeletedFalse()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<UserResponse> getUsersByOrganization(Long organizationId) {

        Organization organization =
                organizationRepository.findById(organizationId)
                        .orElseThrow(() ->
                                new RuntimeException("Organization not found"));

        return userRepository.findByOrganization(organization)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void activateUser(Long userId) {

        Users users = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        users.setActive(true);

        userRepository.save(users);
    }

    @Override
    public void deactivateUser(Long userId) {

        Users users = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        users.setActive(false);

        userRepository.save(users);
    }

//    private UserResponse mapToResponse(Users users) {
//
//        UserResponse response = new UserResponse();
//
//        response.setUserId(users.getUser_id());
//        response.setFullName(users.getFullName());
//        response.setEmail(users.getEmail());
//
//        response.setOrganizationId(
//                users.getOrganization().getOrganizationId());
//
//        response.setOrganizationName(
//                users.getOrganization().getOrganizationName());
//
//        response.setActive(users.getActive());
//
//        response.setCreatedAt(users.getCreatedAt());
//
//        return response;
//    }

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

        Optional<Users_Role> userRole =
                userRoleRepository
                        .findFirstByUsers(users);

        userRole.ifPresent(role ->
                response.setRoleName(
                        role.getRole()
                                .getRoleName()));

        return response;
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

        if (userRepository.existsByEmail(
                request.getEmail())) {

            throw new RuntimeException(
                    "Email already exists");
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

        response.setUserId(
                savedUser.getUser_id());

        response.setFullName(
                savedUser.getFullName());

        response.setEmail(
                savedUser.getEmail());

        response.setOrganizationId(
                organization.getOrganizationId());

        response.setOrganizationName(
                organization.getOrganizationName());

        response.setActive(true);

        response.setCreatedAt(
                savedUser.getCreatedAt());

        return response;
    }
}