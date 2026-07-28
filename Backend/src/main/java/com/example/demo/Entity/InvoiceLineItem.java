package com.example.demo.Entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "invoice_line_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceLineItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long lineItemId;

    /*
     * ============================================================
     * Parent Invoice
     * ============================================================
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    private Invoice invoice;

    /*
     * ============================================================
     * Item Information
     * ============================================================
     */
    @Column(nullable = false, length = 100)
    private String itemCode;

    @Column(nullable = false, length = 255)
    private String itemName;

    @Column(length = 1000)
    private String description;

    @Column(length = 100)
    private String sku;

    /*
     * ============================================================
     * Quantity & Unit
     * ============================================================
     */
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal quantity;

    @Column(nullable = false, length = 20)
    private String unitOfMeasure;

    /*
     * ============================================================
     * Pricing
     * ============================================================
     */
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal unitPrice;

    @Builder.Default
    @Column(precision = 19, scale = 2)
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Builder.Default
    @Column(precision = 5, scale = 2)
    private BigDecimal taxRate = BigDecimal.ZERO;

    @Builder.Default
    @Column(precision = 19, scale = 2)
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal lineTotal;

    /*
     * ============================================================
     * Optional Procurement Information
     * ============================================================
     */
    @Column(length = 100)
    private String purchaseOrderLineNumber;

    @Column(length = 100)
    private String costCenter;

    @Column(length = 100)
    private String projectCode;

    @Column(length = 100)
    private String departmentCode;
}
