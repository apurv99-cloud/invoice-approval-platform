package com.example.demo.Controller;


import com.example.demo.Services.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MailTest {
    private final EmailService emailService;

    @GetMapping("/mail-test")
    public String testMail() {

        emailService.sendOnboardingEmail(
                "yourpersonalmail@gmail.com",
                "Infosys",
                "123456");

        return "Mail Sent";
    }
}
