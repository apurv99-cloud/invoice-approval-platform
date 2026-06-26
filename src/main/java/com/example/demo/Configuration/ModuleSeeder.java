package com.example.demo.Configuration;

import com.example.demo.Entity.Module;
import com.example.demo.Repository.ModuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Order(1)
public class ModuleSeeder implements CommandLineRunner {

    private final ModuleRepository moduleRepository;

    @Override
    public void run(String... args) {

        seedModule(
                "USER",
                "User Management Module"
        );

        seedModule(
                "ORGANIZATION",
                "Organization Management Module"
        );

        seedModule(
                "INVOICE",
                "Invoice Management Module"
        );

        seedModule(
                "WORKFLOW",
                "Workflow Management Module"
        );

        seedModule(
                "PAYMENT",
                "Payment Management Module"
        );

        seedModule(
                "NOTIFICATION",
                "Notification Management Module"
        );

        seedModule(
                "AUDIT",
                "Audit Log Module"
        );

        System.out.println(
                "Modules Seeded Successfully."
        );
    }

    private void seedModule(
            String moduleName,
            String description
    ) {

        moduleRepository
                .findByModuleName(moduleName)
                .orElseGet(() ->

                        moduleRepository.save(

                                Module.builder()
                                        .moduleName(moduleName)
                                        .description(description)
                                        .active(true)
                                        .build()

                        ));
    }

}