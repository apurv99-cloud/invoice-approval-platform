package com.example.demo.DTO.Invoice;

import java.math.BigDecimal;

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
public class InvoiceLineItemResponse {

    private Long lineItemId;

    private String itemCode;

    private String itemName;

    private String description;

    private String sku;

    private BigDecimal quantity;

    private String unitOfMeasure;

    private BigDecimal unitPrice;

    private BigDecimal discountAmount;

    private BigDecimal taxRate;

    private BigDecimal taxAmount;

    private BigDecimal lineTotal;

    private String purchaseOrderLineNumber;

    private String costCenter;

    private String projectCode;

    private String departmentCode;
}
