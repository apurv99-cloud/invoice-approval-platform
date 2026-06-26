package com.example.demo.Configuration;

import com.example.demo.Entity.Role;
import com.example.demo.Repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Order(2)
public class RoleSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {

        seedRole("ROLE_SUPER_ADMIN");

        seedRole("ROLE_ORG_ADMIN");

        seedRole("ROLE_REVIEWER");

        seedRole("ROLE_FINANCE");

        seedRole("ROLE_DIRECTOR");

        seedRole("ROLE_CFO");

        System.out.println(
                "Roles Seeded Successfully."
        );
    }

    private void seedRole(
            String roleName
    ) {

        roleRepository
                .findByRoleName(roleName)
                .orElseGet(() ->

                        roleRepository.save(

                                Role.builder()
                                        .roleName(roleName)
                                        .active(true)
                                        .deleted(false)
                                        .build()

                        ));
    }

}