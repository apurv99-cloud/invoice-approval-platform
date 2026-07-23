package com.example.demo.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Services.EmailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MailTest {
    private final EmailService emailService;

    @GetMapping("/mail-test")
    public String testMail() {

        emailService.sendOnboardingEmail(
                "sinhaapurv99@gmail.com",
                "Infosys",
                "123456");

        return "Mail Sent";
    }
}
