package com.example.demo.Services.Impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.DTO.Invoice.CreateInvoiceRequest;
import com.example.demo.DTO.Invoice.InvoiceLineItemResponse;
import com.example.demo.DTO.Invoice.InvoiceListResponse;
import com.example.demo.DTO.Invoice.InvoiceResponse;
import com.example.demo.DTO.Invoice.UpdateInvoiceRequest;
import com.example.demo.Entity.ApprovalStatus;
import com.example.demo.Entity.Invoice;
import com.example.demo.Entity.InvoiceApproval;
import com.example.demo.Entity.InvoiceLineItem;
import com.example.demo.Entity.InvoiceStatus;
import com.example.demo.Entity.Organization;
import com.example.demo.Entity.Users;
import com.example.demo.Entity.WorkflowMaster;
import com.example.demo.Repository.InvoiceApprovalRepository;
import com.example.demo.Repository.InvoiceRepository;
import com.example.demo.Repository.OrganizationRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.UserRoleRepository;
import com.example.demo.Repository.WorkflowMasterRepository;
import com.example.demo.Repository.WorkflowRuleRepository;
import com.example.demo.Repository.WorkflowStepRepository;
import com.example.demo.Services.InvoiceService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceApprovalRepository invoiceApprovalRepository;
    private final WorkflowMasterRepository workflowMasterRepository;
    private final WorkflowRuleRepository workflowRuleRepository;
    private final WorkflowStepRepository workflowStepRepository;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final OrganizationRepository organizationRepository;

    // ==========================================================
    // Helper Methods
    // ==========================================================
    @Transactional(readOnly = true)
    private Users getCurrentUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(()
                        -> new EntityNotFoundException("Authenticated user not found."));
    }

    @Transactional(readOnly = true)
    private Organization getCurrentOrganization() {
        return getCurrentUser().getOrganization();
    }

    private String generateInvoiceNumber() {
        long count = invoiceRepository.count() + 1;
        return String.format("INV-%06d", count);
    }

    // ==========================================================
    // DTO Mappers
    // ==========================================================
    private InvoiceLineItemResponse mapToLineItemResponse(InvoiceLineItem lineItem) {

        return InvoiceLineItemResponse.builder()
                .lineItemId(lineItem.getLineItemId())
                .description(lineItem.getDescription())
                .quantity(lineItem.getQuantity())
                .unitPrice(lineItem.getUnitPrice())
                .lineTotal(lineItem.getLineTotal())
                .build();
    }

    private InvoiceResponse mapToResponse(Invoice invoice) {

        return InvoiceResponse.builder()
                .invoiceId(invoice.getInvoiceId())
                .invoiceNumber(invoice.getInvoiceNumber())
                .invoiceTitle(invoice.getInvoiceTitle())
                .description(invoice.getDescription())
                .purchaseOrderNumber(invoice.getPurchaseOrderNumber())
                .contractNumber(invoice.getContractNumber())
                .goodsReceiptNumber(invoice.getGoodsReceiptNumber())
                .invoiceDate(invoice.getInvoiceDate())
                .dueDate(invoice.getDueDate())
                .deliveryDate(invoice.getDeliveryDate())
                .currency(invoice.getCurrency())
                .subtotal(invoice.getSubtotal())
                .discountAmount(invoice.getDiscountAmount())
                .taxableAmount(invoice.getTaxableAmount())
                .taxAmount(invoice.getTaxAmount())
                .shippingCharges(invoice.getShippingCharges())
                .handlingCharges(invoice.getHandlingCharges())
                .amount(invoice.getAmount())
                .status(invoice.getStatus())
                .vendorName(invoice.getVendor().getFullName())
                .organizationName(invoice.getOrganization().getOrganizationName())
                .workflowName(
                        Optional.ofNullable(invoice.getWorkflow())
                                .map(WorkflowMaster::getWorkflowName)
                                .orElse(null)
                )
                .lineItems(
                        invoice.getLineItems()
                                .stream()
                                .map(this::mapToLineItemResponse)
                                .toList()
                )
                .createdAt(invoice.getCreatedAt())
                .updatedAt(invoice.getUpdatedAt())
                .build();
    }

    private InvoiceListResponse mapToListResponse(Invoice invoice) {

        Users currentUser = getCurrentUser();

        String currentApprover = invoiceApprovalRepository
                .findByInvoiceAndApproverAndStatus(
                        invoice,
                        currentUser,
                        ApprovalStatus.PENDING
                )
                .map(approval -> approval.getApprover().getFullName())
                .orElse(null);

        return InvoiceListResponse.builder()
                .invoiceId(invoice.getInvoiceId())
                .invoiceNumber(invoice.getInvoiceNumber())
                .invoiceTitle(invoice.getInvoiceTitle())
                .currency(invoice.getCurrency())
                .amount(invoice.getAmount())
                .status(invoice.getStatus())
                .vendorName(invoice.getVendor().getFullName())
                .currentApprover(currentApprover)
                .invoiceDate(invoice.getInvoiceDate())
                .dueDate(invoice.getDueDate())
                .createdAt(invoice.getCreatedAt())
                .build();
    }

    @Override
    @Transactional
    public InvoiceResponse createInvoice(CreateInvoiceRequest request) {

        Users currentUser = getCurrentUser();
        Organization organization = currentUser.getOrganization();

        // ==========================================================
        // Validations
        // ==========================================================
        if (request.getInvoiceDate() == null || request.getDueDate() == null) {
            throw new IllegalArgumentException(
                    "Invoice date and due date are required."
            );
        }

        if (request.getDueDate().isBefore(request.getInvoiceDate())) {
            throw new IllegalArgumentException(
                    "Due date cannot be before invoice date."
            );
        }

        if (request.getLineItems() == null || request.getLineItems().isEmpty()) {
            throw new IllegalArgumentException(
                    "Invoice must contain at least one line item."
            );
        }

        // ==========================================================
        // Calculate Financials
        // ==========================================================
        BigDecimal subtotal = request.getLineItems()
                .stream()
                .map(item
                        -> item.getUnitPrice().multiply(
                        item.getQuantity()
                )
                )
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal discount = Optional.ofNullable(request.getDiscountAmount())
                .orElse(BigDecimal.ZERO);

        BigDecimal tax = Optional.ofNullable(request.getTaxAmount())
                .orElse(BigDecimal.ZERO);

        BigDecimal shipping = Optional.ofNullable(request.getShippingCharges())
                .orElse(BigDecimal.ZERO);

        BigDecimal handling = Optional.ofNullable(request.getHandlingCharges())
                .orElse(BigDecimal.ZERO);

        BigDecimal taxableAmount = subtotal.subtract(discount);

        if (taxableAmount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException(
                    "Discount cannot exceed subtotal."
            );
        }

        BigDecimal amount = taxableAmount
                .add(tax)
                .add(shipping)
                .add(handling);

        // ==========================================================
        // Create Invoice
        // ==========================================================
        Invoice invoice = Invoice.builder()
                .invoiceNumber(generateInvoiceNumber())
                .invoiceTitle(request.getInvoiceTitle())
                .description(request.getDescription())
                .purchaseOrderNumber(request.getPurchaseOrderNumber())
                .contractNumber(request.getContractNumber())
                .goodsReceiptNumber(request.getGoodsReceiptNumber())
                .invoiceDate(request.getInvoiceDate())
                .dueDate(request.getDueDate())
                .deliveryDate(request.getDeliveryDate())
                .currency(request.getCurrency())
                .subtotal(subtotal)
                .discountAmount(discount)
                .taxableAmount(taxableAmount)
                .taxAmount(tax)
                .shippingCharges(shipping)
                .handlingCharges(handling)
                .amount(amount)
                .status(InvoiceStatus.DRAFT)
                .vendor(currentUser)
                .organization(organization)
                .workflow(null)
                .deleted(false)
                .active(true)
                .build();

        // ==========================================================
        // Line Items
        // ==========================================================
        request.getLineItems().forEach(itemRequest -> {

            InvoiceLineItem lineItem = InvoiceLineItem.builder()
                    .description(itemRequest.getDescription())
                    .quantity(itemRequest.getQuantity())
                    .unitPrice(itemRequest.getUnitPrice())
                    .lineTotal(
                            itemRequest.getUnitPrice().multiply(
                                    itemRequest.getQuantity()
                            )
                    )
                    .invoice(invoice)
                    .build();

            invoice.getLineItems().add(lineItem);
        });

        invoiceRepository.save(invoice);

        return mapToResponse(invoice);
    }

    @Override
    @Transactional
    public InvoiceResponse updateInvoice(
            Long invoiceId,
            UpdateInvoiceRequest request
    ) {

        // ==========================================================
        // Current User & Organization
        // ==========================================================
        Users currentUser = getCurrentUser();
        Organization organization = currentUser.getOrganization();

        // ==========================================================
        // Fetch Invoice
        // ==========================================================
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(()
                        -> new EntityNotFoundException("Invoice not found."));

        // ==========================================================
        // Validations
        // ==========================================================
        if (!invoice.getOrganization().getOrganizationId()
                .equals(organization.getOrganizationId())) {

            throw new IllegalStateException(
                    "Access denied. Invoice belongs to another organization."
            );
        }

        if (!invoice.getVendor().getUserId()
                .equals(currentUser.getUserId())) {

            throw new IllegalStateException(
                    "Only the invoice owner can update this invoice."
            );
        }

        if (invoice.getStatus() != InvoiceStatus.DRAFT) {

            throw new IllegalStateException(
                    "Only draft invoices can be updated."
            );
        }

        if (request.getInvoiceDate() == null || request.getDueDate() == null) {

            throw new IllegalArgumentException(
                    "Invoice date and due date are required."
            );
        }

        if (request.getDueDate().isBefore(request.getInvoiceDate())) {

            throw new IllegalArgumentException(
                    "Due date cannot be before invoice date."
            );
        }

        if (request.getLineItems() == null || request.getLineItems().isEmpty()) {

            throw new IllegalArgumentException(
                    "Invoice must contain at least one line item."
            );
        }

        // ==========================================================
        // Calculate Financials
        // ==========================================================
        BigDecimal subtotal = request.getLineItems()
                .stream()
                .map(item
                        -> item.getUnitPrice().multiply(item.getQuantity())
                )
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal discount = Optional.ofNullable(request.getDiscountAmount())
                .orElse(BigDecimal.ZERO);

        BigDecimal tax = Optional.ofNullable(request.getTaxAmount())
                .orElse(BigDecimal.ZERO);

        BigDecimal shipping = Optional.ofNullable(request.getShippingCharges())
                .orElse(BigDecimal.ZERO);

        BigDecimal handling = Optional.ofNullable(request.getHandlingCharges())
                .orElse(BigDecimal.ZERO);

        BigDecimal taxableAmount = subtotal.subtract(discount);

        if (taxableAmount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException(
                    "Discount cannot exceed subtotal."
            );
        }

        BigDecimal amount = taxableAmount
                .add(tax)
                .add(shipping)
                .add(handling);

        // ==========================================================
        // Update Invoice
        // ==========================================================
        invoice.setInvoiceTitle(request.getInvoiceTitle());
        invoice.setDescription(request.getDescription());

        invoice.setPurchaseOrderNumber(request.getPurchaseOrderNumber());
        invoice.setContractNumber(request.getContractNumber());
        invoice.setGoodsReceiptNumber(request.getGoodsReceiptNumber());

        invoice.setInvoiceDate(request.getInvoiceDate());
        invoice.setDueDate(request.getDueDate());
        invoice.setDeliveryDate(request.getDeliveryDate());

        invoice.setCurrency(request.getCurrency());

        invoice.setSubtotal(subtotal);
        invoice.setDiscountAmount(discount);
        invoice.setTaxableAmount(taxableAmount);
        invoice.setTaxAmount(tax);
        invoice.setShippingCharges(shipping);
        invoice.setHandlingCharges(handling);
        invoice.setAmount(amount);

        // ==========================================================
        // Replace Line Items
        // ==========================================================
        invoice.getLineItems().clear();

        request.getLineItems().forEach(itemRequest -> {

            InvoiceLineItem lineItem = InvoiceLineItem.builder()
                    .description(itemRequest.getDescription())
                    .quantity(itemRequest.getQuantity())
                    .unitPrice(itemRequest.getUnitPrice())
                    .lineTotal(
                            itemRequest.getUnitPrice()
                                    .multiply(itemRequest.getQuantity())
                    )
                    .invoice(invoice)
                    .build();

            invoice.getLineItems().add(lineItem);
        });

        invoiceRepository.save(invoice);

        // ==========================================================
        // Return Response
        // ==========================================================
        return mapToResponse(invoice);
    }

    @Override
    @Transactional(readOnly = true)
    public InvoiceResponse getInvoice(Long invoiceId) {

        // ==========================================================
        // Current User
        // ==========================================================
        Users currentUser = getCurrentUser();

        // ==========================================================
        // Fetch Invoice
        // ==========================================================
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(()
                        -> new EntityNotFoundException("Invoice not found."));

        // ==========================================================
        // Organization Validation
        // ==========================================================
        if (!invoice.getOrganization().getOrganizationId()
                .equals(currentUser.getOrganization().getOrganizationId())) {

            throw new IllegalStateException(
                    "Access denied. Invoice belongs to another organization."
            );
        }

        // ==========================================================
        // Return Response
        // ==========================================================
        return mapToResponse(invoice);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceListResponse> getOrganizationInvoices() {

        // ==========================================================
        // Current Organization
        // ==========================================================
        Organization organization = getCurrentOrganization();

        // ==========================================================
        // Fetch Organization Invoices
        // ==========================================================
        return invoiceRepository
                .findByOrganizationAndDeletedFalse(organization)
                .stream()
                .map(this::mapToListResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceListResponse> getMyPendingInvoices() {

        // ==========================================================
        // Current User
        // ==========================================================
        Users currentUser = getCurrentUser();

        // ==========================================================
        // Fetch Pending Approvals
        // ==========================================================
        return invoiceApprovalRepository
                .findByApproverIdAndStatus(
                        currentUser.getUserId(),
                        ApprovalStatus.PENDING
                )
                .stream()
                .map(InvoiceApproval::getInvoice)
                .map(this::mapToListResponse)
                .toList();
    }

    @Override
    @Transactional
    public void deleteInvoice(Long invoiceId) {

        // ==========================================================
        // Current User & Organization
        // ==========================================================
        Users currentUser = getCurrentUser();
        Organization organization = currentUser.getOrganization();

        // ==========================================================
        // Fetch Invoice
        // ==========================================================
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(()
                        -> new EntityNotFoundException("Invoice not found."));

        // ==========================================================
        // Organization Validation
        // ==========================================================
        if (!invoice.getOrganization().getOrganizationId()
                .equals(organization.getOrganizationId())) {

            throw new IllegalStateException(
                    "Access denied. Invoice belongs to another organization."
            );
        }

        // ==========================================================
        // Owner Validation
        // ==========================================================
        if (!invoice.getVendor().getUserId()
                .equals(currentUser.getUserId())) {

            throw new IllegalStateException(
                    "Only the invoice owner can delete this invoice."
            );
        }

        // ==========================================================
        // Business Validations
        // ==========================================================
        if (Boolean.TRUE.equals(invoice.getDeleted())) {

            throw new IllegalStateException(
                    "Invoice has already been deleted."
            );
        }

        if (invoice.getStatus() != InvoiceStatus.DRAFT) {

            throw new IllegalStateException(
                    "Only draft invoices can be deleted."
            );
        }

        // ==========================================================
        // Soft Delete
        // ==========================================================
        invoice.setDeleted(true);
        invoice.setActive(false);

        invoiceRepository.save(invoice);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceListResponse> getDraftInvoices() {

        Users currentUser = getCurrentUser();

        return invoiceRepository
                .findByVendorAndStatusAndDeletedFalse(
                        currentUser,
                        InvoiceStatus.DRAFT
                )
                .stream()
                .map(this::mapToListResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceListResponse> getMySubmittedInvoices() {

        Users currentUser = getCurrentUser();

        return invoiceRepository
                .findByVendorAndStatusAndDeletedFalse(
                        currentUser,
                        InvoiceStatus.IN_REVIEW
                )
                .stream()
                .map(this::mapToListResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceListResponse> getApprovedInvoices() {

        Organization organization = getCurrentOrganization();

        return invoiceRepository
                .findByOrganizationAndStatusAndDeletedFalse(
                        organization,
                        InvoiceStatus.APPROVED
                )
                .stream()
                .map(this::mapToListResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceListResponse> getRejectedInvoices() {

        Organization organization = getCurrentOrganization();

        return invoiceRepository
                .findByOrganizationAndStatusAndDeletedFalse(
                        organization,
                        InvoiceStatus.REJECTED
                )
                .stream()
                .map(this::mapToListResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceListResponse> getPaidInvoices() {

        Organization organization = getCurrentOrganization();

        return invoiceRepository
                .findByOrganizationAndStatusAndDeletedFalse(
                        organization,
                        InvoiceStatus.PAID
                )
                .stream()
                .map(this::mapToListResponse)
                .toList();
    }

}
