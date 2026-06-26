package com.example.demo.Authorization;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class PermissionAuthorizationFilter
        extends OncePerRequestFilter {

    private final PermissionResolver permissionResolver;

    private final PermissionService permissionService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String uri = request.getRequestURI();

        // Public APIs
        if (uri.startsWith("/api/auth")
                || uri.equals("/api/organizations/complete-onboarding")) {

            filterChain.doFilter(request, response);
            return;
        }

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()) {

            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Unauthorized");

            return;
        }

        PermissionRequest permissionRequest =
                permissionResolver.resolvePermission(
                        request.getMethod(),
                        uri
                );

        // Agar kisi API ki permission mapping nahi bani hai,
        // to request allow kar do.
        if (permissionRequest == null) {

            filterChain.doFilter(request, response);
            return;
        }

        String email = authentication.getName();

        boolean allowed =
                permissionService.hasPermission(
                        email,
                        permissionRequest
                );

        if (!allowed) {

            response.sendError(
                    HttpServletResponse.SC_FORBIDDEN,
                    "Access Denied");

            return;
        }

        filterChain.doFilter(request, response);
    }
}