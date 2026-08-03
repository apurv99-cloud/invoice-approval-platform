package com.example.demo.Exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.demo.DTO.ApiResponse;

@ControllerAdvice
public class GlobalExceptionHandler {
    //

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleException(Exception ex) {
        ex.printStackTrace();   // <-- This works without any setup
        ApiResponse<Object> resp = ApiResponse.builder()
                .success(false)
                .message(ex.getMessage())
                .data(null)
                .timestamp(LocalDateTime.now())
                .build(); // 

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resp);
    }
}
