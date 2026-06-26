package com.example.demo.Authorization;

public interface PermissionService {

    boolean hasPermission(
            String email,
            PermissionRequest permissionRequest
    );

}