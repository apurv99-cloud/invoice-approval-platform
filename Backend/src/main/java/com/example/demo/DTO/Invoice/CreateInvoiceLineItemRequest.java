package com.example.demo.DTO.Invoice;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
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
public class CreateInvoiceLineItemRequest {

    @NotBlank(message = "Item Code is required")
    private String itemCode;

    @NotBlank(message = "Item Name is required")
    private String itemName;

    private String description;

    private String sku;

    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.01", message = "Quantity must be greater than zero")
    private BigDecimal quantity;

    @NotBlank(message = "Unit of Measure is required")
    private String unitOfMeasure;

    @NotNull(message = "Unit Price is required")
    @DecimalMin(value = "0.00", message = "Unit Price cannot be negative")
    private BigDecimal unitPrice;

    @Builder.Default
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Builder.Default
    private BigDecimal taxRate = BigDecimal.ZERO;

    @Builder.Default
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @NotNull(message = "Line Total is required")
    @DecimalMin(value = "0.00", message = "Line Total cannot be negative")
    private BigDecimal lineTotal;

    private String purchaseOrderLineNumber;

    private String costCenter;

    private String projectCode;

    private String departmentCode;
}
