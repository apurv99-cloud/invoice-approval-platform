package com.example.demo.Services.Impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.example.demo.Services.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final RestClient restClient;

    @Value("${brevo.api.key}")
    private String apiKey;

    @Value("${brevo.from.email}")
    private String fromEmail;

    @Value("${brevo.from.name}")
    private String fromName;

    @Override
    public void sendOnboardingEmail(
            String email,
            String organizationName,
            String token) {

        String onboardingLink
                = "https://invoice-approval-platform.vercel.app/complete-onboarding?token=" + token;

        Map<String, Object> body = Map.of(
                "sender", Map.of(
                        "name", fromName,
                        "email", fromEmail
                ),
                "to", List.of(
                        Map.of("email", email)
                ),
                "subject", "Organization Onboarding",
                "textContent",
                "Hello,\n\n"
                + "Your organization "
                + organizationName
                + " has been registered.\n\n"
                + "Complete onboarding using the link below:\n\n"
                + onboardingLink
        );

        try {

            restClient.post()
                    .uri("https://api.brevo.com/v3/smtp/email")
                    .header("api-key", apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .toBodilessEntity();

            System.out.println("Mail sent successfully using Brevo.");

        } catch (Exception ex) {

            ex.printStackTrace();
            throw new RuntimeException("Unable to send email using Brevo.", ex);

        }
    }
}
