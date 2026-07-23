package com.example.demo.Services.Impl;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.demo.Services.EmailService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl
        implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendOnboardingEmail(
            String email,
            String organizationName,
            String token) {

        String onboardingLink
                = // "http://localhost:5173/complete-onboarding?token=" + token;
                "https://invoice-approval-platform.vercel.app/complete-onboarding?token=" + token;

        SimpleMailMessage message
                = new SimpleMailMessage();

        message.setFrom(
                "sinhaapurv@gmail.com");
        message.setTo(email);

        message.setSubject(
                "Organization Onboarding");

        message.setText(
                "Hello,\n\n"
                + "Your organization "
                + organizationName
                + " has been registered.\n\n"
                + "Complete onboarding:\n"
                + onboardingLink);

        mailSender.send(message);
    }
}
