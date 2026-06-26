package com.example.demo.Repository;

import com.example.demo.Authorization.PermissionAction;
import com.example.demo.Entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PermissionRepository
        extends JpaRepository<Permission, Long> {

    Optional<Permission>
    findByModule_ModuleNameAndAction(
            String moduleName,
            PermissionAction action
    );

}