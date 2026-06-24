package com.example.demo.Entity;

import com.example.demo.Entity.Organization;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "organization_onboarding_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganizationOnboardingToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tokenId;

    private String token;

    private String email;

    private Boolean used;

    private LocalDateTime expiryTime;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;
}