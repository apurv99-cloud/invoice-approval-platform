package com.example.demo.Configuration;

import com.example.demo.Authorization.ModuleName;
import com.example.demo.Authorization.PermissionAction;
import com.example.demo.Entity.Permission;
import com.example.demo.Entity.Role;
import com.example.demo.Entity.RolePermission;
import com.example.demo.Repository.PermissionRepository;
import com.example.demo.Repository.RolePermissionRepository;
import com.example.demo.Repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Order(4)
public class RolePermissionSeeder
        implements CommandLineRunner {

    private final RoleRepository roleRepository;

    private final PermissionRepository permissionRepository;

    private final RolePermissionRepository rolePermissionRepository;

    @Override
    public void run(String... args) {

        seedSuperAdmin();

        seedOrganizationAdmin();

        seedReviewer();

        seedFinance();

        seedDirector();

        seedCFO();

        System.out.println("Role Permissions Seeded Successfully.");
    }

    // =======================================================
    // SUPER ADMIN
    // =======================================================

    private void seedSuperAdmin() {

        Role role = getRole("ROLE_SUPER_ADMIN");

        for (ModuleName module : ModuleName.values()) {

            for (PermissionAction action : PermissionAction.values()) {

                permissionRepository
                        .findByModule_ModuleNameAndAction(
                                module.name(),
                                action
                        )
                        .ifPresent(permission ->
                                save(role, permission));
            }
        }
    }

    // =======================================================
    // ORGANIZATION ADMIN
    // =======================================================

    private void seedOrganizationAdmin() {

        Role role = getRole("ROLE_ORG_ADMIN");

        allow(role, ModuleName.USER, PermissionAction.VIEW);
        allow(role, ModuleName.USER, PermissionAction.CREATE);
        allow(role, ModuleName.USER, PermissionAction.UPDATE);
        allow(role, ModuleName.USER, PermissionAction.DELETE);

        allow(role, ModuleName.INVOICE, PermissionAction.VIEW);

        allow(role, ModuleName.ORGANIZATION, PermissionAction.VIEW);
    }

    // =======================================================
    // REVIEWER
    // =======================================================

    private void seedReviewer() {

        Role role = getRole("ROLE_REVIEWER");

        allow(role, ModuleName.INVOICE, PermissionAction.VIEW);
        allow(role, ModuleName.INVOICE, PermissionAction.APPROVE);
        allow(role, ModuleName.INVOICE, PermissionAction.REJECT);
    }

    // =======================================================
    // FINANCE
    // =======================================================

    private void seedFinance() {

        Role role = getRole("ROLE_FINANCE");

        allow(role, ModuleName.INVOICE, PermissionAction.VIEW);
        allow(role, ModuleName.INVOICE, PermissionAction.APPROVE);
        allow(role, ModuleName.PAYMENT, PermissionAction.VIEW);
        allow(role, ModuleName.PAYMENT, PermissionAction.CREATE);
    }

    // =======================================================
    // DIRECTOR
    // =======================================================

    private void seedDirector() {

        Role role = getRole("ROLE_DIRECTOR");

        allow(role, ModuleName.INVOICE, PermissionAction.VIEW);
        allow(role, ModuleName.INVOICE, PermissionAction.APPROVE);
    }

    // =======================================================
    // CFO
    // =======================================================

    private void seedCFO() {

        Role role = getRole("ROLE_CFO");

        allow(role, ModuleName.INVOICE, PermissionAction.VIEW);
        allow(role, ModuleName.INVOICE, PermissionAction.APPROVE);
    }

    // =======================================================
    // Helper Methods
    // =======================================================

    private void allow(
            Role role,
            ModuleName module,
            PermissionAction action
    ) {

        Permission permission =
                permissionRepository
                        .findByModule_ModuleNameAndAction(
                                module.name(),
                                action
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Permission not found"));

        save(role, permission);
    }

    private void save(
            Role role,
            Permission permission
    ) {

        boolean exists =
                rolePermissionRepository
                        .findByRole(role)
                        .stream()
                        .anyMatch(rp ->
                                rp.getPermission()
                                        .getPermissionId()
                                        .equals(permission.getPermissionId()));

        if (!exists) {

            rolePermissionRepository.save(

                    RolePermission.builder()
                            .role(role)
                            .permission(permission)
                            .build()

            );
        }
    }

    private Role getRole(
            String roleName
    ) {

        return roleRepository
                .findByRoleName(roleName)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Role not found"));
    }

}