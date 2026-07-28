package com.example.demo.DTO.Invoice;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.demo.Entity.CurrencyCode;
import com.example.demo.Entity.InvoiceStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceListResponse {

    private Long invoiceId;

    private String invoiceNumber;

    private String invoiceTitle;

    private String purchaseOrderNumber;

    private BigDecimal amount;

    private CurrencyCode currency;

    private InvoiceStatus status;

    private String vendorName;

    private String currentApprover;

    private LocalDate invoiceDate;

    private LocalDate dueDate;

    private LocalDateTime createdAt;
}
