package com.example.demo.Entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Invocies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long invoiceId;

    /*
     * ============================================================
     * Basic Invoice Information
     * ============================================================
     */
    @Column(nullable = false, unique = true, length = 100)
    private String invoiceNumber;

    @Column(nullable = false, length = 255)
    private String invoiceTitle;

    @Column(length = 1000)
    private String description;

    @Column(length = 100)
    private String purchaseOrderNumber;

    @Column(length = 100)
    private String contractNumber;

    @Column(length = 100)
    private String goodsReceiptNumber;

    /*
     * ============================================================
     * Dates
     * ============================================================
     */
    @Column(nullable = false)
    private LocalDate invoiceDate;

    @Column(nullable = false)
    private LocalDate dueDate;

    private LocalDate deliveryDate;

    /*
     * ============================================================
     * Financial Information
     * ============================================================
     */
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal subtotal;

    @Column(precision = 19, scale = 2)
    @Builder.Default
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Column(precision = 19, scale = 2)
    @Builder.Default
    private BigDecimal taxableAmount = BigDecimal.ZERO;

    @Column(precision = 19, scale = 2)
    @Builder.Default
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @Column(precision = 19, scale = 2)
    @Builder.Default
    private BigDecimal shippingCharges = BigDecimal.ZERO;

    @Column(precision = 19, scale = 2)
    @Builder.Default
    private BigDecimal handlingCharges = BigDecimal.ZERO;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    /*
     * ============================================================
     * Currency
     * ============================================================
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CurrencyCode currency;

    /*
     * ============================================================
     * Approval Status
     * ============================================================
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InvoiceStatus status;

    /*
     * ============================================================
     * Relationships
     * ============================================================
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Users vendor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workflow_id")
    private WorkflowMaster workflow;

    /*
     * ============================================================
     * Invoice Line Items
     * ============================================================
     */
    @OneToMany(
            mappedBy = "invoice",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @Builder.Default
    private List<InvoiceLineItem> lineItems = new ArrayList<>();

    /*
     * ============================================================
     * Attachments
     * ============================================================
     */
    private String invoicePdfUrl;

    private String supportingDocumentUrl;

    /*
     * ============================================================
     * Audit
     * ============================================================
     */
    @Builder.Default
    private Boolean deleted = false;

    @Builder.Default
    private Boolean active = true;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
