package com.example.demo.Configuration;

import com.example.demo.Entity.Role;
import com.example.demo.Entity.Users;
import com.example.demo.Entity.Users_Role;
import com.example.demo.Repository.RoleRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Order(5)
public class SuperAdminSeeder
        implements CommandLineRunner {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final UserRoleRepository userRoleRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        Role superAdminRole =
                roleRepository
                        .findByRoleName("ROLE_SUPER_ADMIN")
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "ROLE_SUPER_ADMIN not found"));

        Users superAdmin =
                createSuperAdminIfNotExists();

        assignRoleIfNotAssigned(
                superAdmin,
                superAdminRole
        );

        System.out.println(
                "Super Admin Seeded Successfully."
        );
    }

    // =======================================================
    // Create Super Admin
    // =======================================================

    private Users createSuperAdminIfNotExists() {

        return userRepository
                .findByEmail("superadmin@system.com")
                .orElseGet(() -> {

                    Users user =
                            Users.builder()

                                    .fullName(
                                            "System Super Admin")

                                    .email(
                                            "superadmin@system.com")

                                    .password(
                                            passwordEncoder.encode(
                                                    "Admin@123"))

                                    .active(true)

                                    .deleted(false)

                                    .build();

                    return userRepository.save(user);
                });
    }

    // =======================================================
    // Assign ROLE_SUPER_ADMIN
    // =======================================================

    private void assignRoleIfNotAssigned(
            Users user,
            Role role
    ) {

        boolean assigned =
                userRoleRepository
                        .findByUsers(user)
                        .stream()
                        .anyMatch(userRole ->
                                userRole
                                        .getRole()
                                        .getRoleId()
                                        .equals(role.getRoleId()));

        if (!assigned) {

            Users_Role userRole =
                    Users_Role.builder()

                            .users(user)

                            .role(role)

                            .build();

            userRoleRepository.save(userRole);
        }
    }


}