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
public class UpdateInvoiceRequest {

    @NotBlank
    private String invoiceTitle;

    @NotBlank
    private String description;

    @NotBlank
    private String purchaseOrderNumber;

    private String contractNumber;

    private String goodsReceiptNumber;

    @NotNull
    private LocalDate invoiceDate;

    @NotNull
    private LocalDate dueDate;

    private LocalDate deliveryDate;

    @NotNull
    private CurrencyCode currency;

    @NotNull
    @DecimalMin("0.00")
    private BigDecimal subtotal;

    private BigDecimal discountAmount;

    private BigDecimal taxableAmount;

    private BigDecimal taxAmount;

    private BigDecimal shippingCharges;

    private BigDecimal handlingCharges;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal amount;

    @Valid
    @NotEmpty
    private List<CreateInvoiceLineItemRequest> lineItems;
}
