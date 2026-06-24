package com.example.demo.Repository;

import com.example.demo.Entity.OrganizationOnboardingToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrganizationOnboardingTokenRepository extends JpaRepository<OrganizationOnboardingToken, Long> {

    Optional<OrganizationOnboardingToken> findByToken(String token);
}
