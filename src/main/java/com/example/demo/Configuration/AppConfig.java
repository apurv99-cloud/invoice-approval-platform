package com.example.demo.Configuration;

import com.example.demo.Entity.Role;
import com.example.demo.Entity.Users;
import com.example.demo.Entity.Users_Role;
import com.example.demo.Repository.RoleRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Configuration

public class AppConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Component
    @RequiredArgsConstructor
    public static class DataSeeder implements CommandLineRunner {

        private final RoleRepository roleRepository;
        private final UserRepository userRepository;
        private final UserRoleRepository userRoleRepository;
        private final PasswordEncoder passwordEncoder;

        @Override
        public void run(String... args) {

            // ===== Seed Roles =====
            Role superAdminRole = createRoleIfNotExists("ROLE_SUPER_ADMIN");
            createRoleIfNotExists("ROLE_ORG_ADMIN");
            createRoleIfNotExists("ROLE_REVIEWER");
            createRoleIfNotExists("ROLE_FINANCE");
            createRoleIfNotExists("ROLE_DIRECTOR");
            createRoleIfNotExists("ROLE_CFO");

            // ===== Seed Super Admin =====
            Users superAdmin = userRepository
                    .findByEmail("superadmin@system.com")
                    .orElseGet(() -> {

                        Users user = Users.builder()
                                .fullName("System Super Admin")
                                .email("superadmin@system.com")
                                .password(
                                        passwordEncoder.encode("Admin@123")
                                )
                                .active(true)
                                .deleted(false)
                                .build();

                        return userRepository.save(user);
                    });

            // ===== Assign ROLE_SUPER_ADMIN =====
            boolean alreadyAssigned =
                    userRoleRepository.findByUsers(superAdmin)
                            .stream()
                            .anyMatch(userRole ->
                                    userRole.getRole()
                                            .getRoleName()
                                            .equals("ROLE_SUPER_ADMIN"));

            if (!alreadyAssigned) {

                Users_Role userRole = Users_Role.builder()
                        .users(superAdmin)
                        .role(superAdminRole)
                        .build();

                userRoleRepository.save(userRole);
            }

            System.out.println("Roles and Super Admin seeded successfully.");
        }

        private Role createRoleIfNotExists(String roleName) {

            return roleRepository
                    .findByRoleName(roleName)
                    .orElseGet(() -> {

                        Role role = Role.builder()
                                .roleName(roleName)
                                .active(true)
                                .deleted(false)
                                .build();

                        return roleRepository.save(role);
                    });
        }
    }
}

