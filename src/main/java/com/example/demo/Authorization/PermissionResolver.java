package com.example.demo.Authorization;

import org.springframework.stereotype.Component;

@Component
public class PermissionResolver {

    public PermissionRequest resolvePermission(
            String method,
            String uri
    ) {

        // ==================================================
        // ORGANIZATION
        // ==================================================

        if (uri.startsWith("/api/organizations")) {

            return buildPermission(
                    ModuleName.ORGANIZATION,
                    method
            );
        }

        // ==================================================
        // USER
        // ==================================================

        if (uri.startsWith("/api/user")) {

            return buildPermission(
                    ModuleName.USER,
                    method
            );
        }

        // ==================================================
        // INVOICE
        // ==================================================

        if (uri.startsWith("/api/invoices")) {

            if (uri.contains("/approve")) {

                return create(
                        ModuleName.INVOICE,
                        PermissionAction.APPROVE
                );
            }

            if (uri.contains("/reject")) {

                return create(
                        ModuleName.INVOICE,
                        PermissionAction.REJECT
                );
            }

            return buildPermission(
                    ModuleName.INVOICE,
                    method
            );
        }

        // ==================================================
        // PAYMENT
        // ==================================================

        if (uri.startsWith("/api/payments")) {

            return buildPermission(
                    ModuleName.PAYMENT,
                    method
            );
        }

        // ==================================================
        // WORKFLOW
        // ==================================================

        if (uri.startsWith("/api/workflows")) {

            return buildPermission(
                    ModuleName.WORKFLOW,
                    method
            );
        }

        // ==================================================
        // NOTIFICATION
        // ==================================================

        if (uri.startsWith("/api/notifications")) {

            return buildPermission(
                    ModuleName.NOTIFICATION,
                    method
            );
        }

        // ==================================================
        // AUDIT
        // ==================================================

        if (uri.startsWith("/api/audit")) {

            return create(
                    ModuleName.AUDIT,
                    PermissionAction.VIEW
            );
        }

        return null;
    }

    private PermissionRequest buildPermission(
            ModuleName module,
            String method
    ) {

        if ("GET".equalsIgnoreCase(method)) {

            return create(
                    module,
                    PermissionAction.VIEW
            );
        }

        if ("POST".equalsIgnoreCase(method)) {

            return create(
                    module,
                    PermissionAction.CREATE
            );
        }

        if ("PUT".equalsIgnoreCase(method)
                || "PATCH".equalsIgnoreCase(method)) {

            return create(
                    module,
                    PermissionAction.UPDATE
            );
        }

        if ("DELETE".equalsIgnoreCase(method)) {

            return create(
                    module,
                    PermissionAction.DELETE
            );
        }

        return null;
    }

    private PermissionRequest create(
            ModuleName module,
            PermissionAction action
    ) {

        return PermissionRequest.builder()
                .module(module)
                .action(action)
                .build();
    }

}