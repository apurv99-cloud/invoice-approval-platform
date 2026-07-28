package com.example.demo.DTO.Invoice;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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
public class InvoiceResponse {

    private Long invoiceId;

    private String invoiceNumber;

    private String invoiceTitle;

    private String description;

    private String purchaseOrderNumber;

    private String contractNumber;

    private String goodsReceiptNumber;

    private LocalDate invoiceDate;

    private LocalDate dueDate;

    private LocalDate deliveryDate;

    private CurrencyCode currency;

    private BigDecimal subtotal;

    private BigDecimal discountAmount;

    private BigDecimal taxableAmount;

    private BigDecimal taxAmount;

    private BigDecimal shippingCharges;

    private BigDecimal handlingCharges;

    private BigDecimal amount;

    private InvoiceStatus status;

    private String vendorName;

    private String organizationName;

    private String workflowName;

    private List<InvoiceLineItemResponse> lineItems;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
