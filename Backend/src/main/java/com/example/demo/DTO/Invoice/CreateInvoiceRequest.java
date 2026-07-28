package com.example.demo.DTO.Invoice;

import com.example.demo.Entity.CurrencyCode;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateInvoiceRequest {

    @NotBlank(message = "Invoice Title is required")
    private String invoiceTitle;

    @NotBlank(message = "Invoice Number is required")
    private String invoiceNumber;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Purchase Order Number is required")
    private String purchaseOrderNumber;

    private String contractNumber;

    private String goodsReceiptNumber;

    @NotNull(message = "Invoice Date is required")
    private LocalDate invoiceDate;

    @NotNull(message = "Due Date is required")
    private LocalDate dueDate;

    private LocalDate deliveryDate;

    @NotNull(message = "Currency is required")
    private CurrencyCode currency;

    @NotNull
    @DecimalMin(value = "0.00")
    private BigDecimal subtotal;

    @Builder.Default
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Builder.Default
    private BigDecimal taxableAmount = BigDecimal.ZERO;

    @Builder.Default
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @Builder.Default
    private BigDecimal shippingCharges = BigDecimal.ZERO;

    @Builder.Default
    private BigDecimal handlingCharges = BigDecimal.ZERO;

    @NotNull
    @DecimalMin(value = "0.01")
    private BigDecimal amount;

    @Valid
    @NotEmpty(message = "Invoice must contain at least one line item")
    private List<CreateInvoiceLineItemRequest> lineItems;
}
