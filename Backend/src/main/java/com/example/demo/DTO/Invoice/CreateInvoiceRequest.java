package com.example.demo.DTO.Invoice;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.example.demo.Entity.CurrencyCode;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
public class CreateInvoiceRequest {

    @NotBlank(message = "Invoice title is required")
    private String invoiceTitle;

    @NotBlank(message = "Invoice number is required")
    private String invoiceNumber;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Purchase Order Number is required")
    private String purchaseOrderNumber;

    private String contractNumber;

    private String goodsReceiptNumber;

    @NotNull(message = "Invoice date is required")
    private LocalDate invoiceDate;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    private LocalDate deliveryDate;

    @NotNull(message = "Currency is required")
    private CurrencyCode currency;

    @Builder.Default
    @DecimalMin(value = "0.00", message = "Discount cannot be negative")
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Builder.Default
    @DecimalMin(value = "0.00", message = "Tax cannot be negative")
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @Builder.Default
    @DecimalMin(value = "0.00", message = "Shipping charges cannot be negative")
    private BigDecimal shippingCharges = BigDecimal.ZERO;

    @Builder.Default
    @DecimalMin(value = "0.00", message = "Handling charges cannot be negative")
    private BigDecimal handlingCharges = BigDecimal.ZERO;

    @Valid
    @NotEmpty(message = "Invoice must contain at least one line item")
    private List<CreateInvoiceLineItemRequest> lineItems;
}
