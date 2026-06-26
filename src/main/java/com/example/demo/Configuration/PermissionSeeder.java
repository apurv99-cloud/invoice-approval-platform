package com.example.demo.Configuration;

import com.example.demo.Authorization.ModuleName;
import com.example.demo.Authorization.PermissionAction;
import com.example.demo.Entity.Module;
import com.example.demo.Entity.Permission;
import com.example.demo.Repository.ModuleRepository;
import com.example.demo.Repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Order(3)
public class PermissionSeeder implements CommandLineRunner {

    private final ModuleRepository moduleRepository;

    private final PermissionRepository permissionRepository;

    @Override
    public void run(String... args) {

        // ================= USER =================

        seed(ModuleName.USER, PermissionAction.VIEW);
        seed(ModuleName.USER, PermissionAction.CREATE);
        seed(ModuleName.USER, PermissionAction.UPDATE);
        seed(ModuleName.USER, PermissionAction.DELETE);

        // ============== ORGANIZATION ==============

        seed(ModuleName.ORGANIZATION, PermissionAction.VIEW);
        seed(ModuleName.ORGANIZATION, PermissionAction.CREATE);
        seed(ModuleName.ORGANIZATION, PermissionAction.UPDATE);
        seed(ModuleName.ORGANIZATION, PermissionAction.DELETE);

        // ================= INVOICE =================

        seed(ModuleName.INVOICE, PermissionAction.VIEW);
        seed(ModuleName.INVOICE, PermissionAction.CREATE);
        seed(ModuleName.INVOICE, PermissionAction.UPDATE);
        seed(ModuleName.INVOICE, PermissionAction.DELETE);
        seed(ModuleName.INVOICE, PermissionAction.APPROVE);
        seed(ModuleName.INVOICE, PermissionAction.REJECT);

        // ================= WORKFLOW =================

        seed(ModuleName.WORKFLOW, PermissionAction.VIEW);
        seed(ModuleName.WORKFLOW, PermissionAction.CREATE);
        seed(ModuleName.WORKFLOW, PermissionAction.UPDATE);
        seed(ModuleName.WORKFLOW, PermissionAction.DELETE);

        // ================= PAYMENT =================

        seed(ModuleName.PAYMENT, PermissionAction.VIEW);
        seed(ModuleName.PAYMENT, PermissionAction.CREATE);
        seed(ModuleName.PAYMENT, PermissionAction.UPDATE);
        seed(ModuleName.PAYMENT, PermissionAction.DELETE);

        // ================= NOTIFICATION =================

        seed(ModuleName.NOTIFICATION, PermissionAction.VIEW);

        // ================= AUDIT =================

        seed(ModuleName.AUDIT, PermissionAction.VIEW);

        System.out.println("Permissions Seeded Successfully.");
    }

    private void seed(
            ModuleName moduleName,
            PermissionAction action
    ) {

        Module module = moduleRepository
                .findByModuleName(moduleName.name())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Module not found : " + moduleName));

        permissionRepository
                .findByModule_ModuleNameAndAction(
                        moduleName.name(),
                        action)
                .orElseGet(() ->

                        permissionRepository.save(

                                Permission.builder()
                                        .module(module)
                                        .action(action)
                                        .description(
                                                action.name() +
                                                        " permission for " +
                                                        moduleName.name())
                                        .active(true)
                                        .build()

                        ));
    }
}