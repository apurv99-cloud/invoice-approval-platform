package com.example.demo.Services.Impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.Invoice.ApproveInvoiceRequest;
import com.example.demo.DTO.Invoice.InvoiceResponse;
import com.example.demo.DTO.Invoice.RejectInvoiceRequest;
import com.example.demo.Entity.ApprovalStatus;
import com.example.demo.Entity.Invoice;
import com.example.demo.Entity.InvoiceApproval;
import com.example.demo.Entity.InvoiceStatus;
import com.example.demo.Entity.Organization;
import com.example.demo.Entity.Users;
import com.example.demo.Entity.WorkflowMaster;
import com.example.demo.Entity.WorkflowRule;
import com.example.demo.Entity.WorkflowStep;
import com.example.demo.Repository.InvoiceApprovalRepository;
import com.example.demo.Repository.InvoiceRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.UserRoleRepository;
import com.example.demo.Repository.WorkflowRuleRepository;
import com.example.demo.Repository.WorkflowStepRepository;
import com.example.demo.Services.InvoiceWorkflowService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class InvoiceWorkflowServiceImpl implements InvoiceWorkflowService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceApprovalRepository invoiceApprovalRepository;
    private final WorkflowRuleRepository workflowRuleRepository;
    private final WorkflowStepRepository workflowStepRepository;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    // ==========================================================
    // Helper Methods
    // ==========================================================
    private Users getCurrentUser() {

        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(email)
                .orElseThrow(()
                        -> new EntityNotFoundException("Authenticated user not found."));
    }

    private InvoiceResponse mapToResponse(Invoice invoice) {

        return InvoiceResponse.builder()
                .invoiceId(invoice.getInvoiceId())
                .invoiceNumber(invoice.getInvoiceNumber())
                .invoiceTitle(invoice.getInvoiceTitle())
                .description(invoice.getDescription())
                .amount(invoice.getAmount())
                .invoiceDate(invoice.getInvoiceDate())
                .dueDate(invoice.getDueDate())
                .status(invoice.getStatus())
                .vendorName(invoice.getVendor().getFullName())
                .organizationName(invoice.getOrganization().getOrganizationName())
                .workflowName(
                        invoice.getWorkflow() != null
                        ? invoice.getWorkflow().getWorkflowName()
                        : null
                )
                .createdAt(invoice.getCreatedAt())
                .build();
    }

    // Paste these methods here:
    // - submitInvoice()
    @Override
    @Transactional
    public InvoiceResponse submitInvoice(Long invoiceId) {
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
        if (!invoice.getVendor().getUserId().equals(currentUser.getUserId())) {
            throw new IllegalStateException(
                    "Only the invoice owner can submit this invoice."
            );
        }
        if (!invoice.getOrganization().getOrganizationId()
                .equals(organization.getOrganizationId())) {
            throw new IllegalStateException(
                    "Access denied. Invoice belongs to another organization."
            );
        }
        if (invoice.getStatus() != InvoiceStatus.DRAFT) {
            throw new IllegalStateException(
                    "Only draft invoices can be submitted."
            );
        }
        if (invoice.getDueDate().isBefore(invoice.getInvoiceDate())) {
            throw new IllegalArgumentException(
                    "Due date cannot be before invoice date."
            );
        }
        // ==========================================================
        // Resolve Workflow Rule
        // ==========================================================
        WorkflowRule workflowRule = workflowRuleRepository
                .findByWorkflow_OrganizationAndMinAmountLessThanEqualAndMaxAmountGreaterThanEqual(
                        organization,
                        invoice.getAmount(),
                        invoice.getAmount()
                )
                .orElseThrow(()
                        -> new EntityNotFoundException(
                        "No workflow configured for this invoice amount."
                ));
        WorkflowMaster workflow = workflowRule.getWorkflow();
        if (!Boolean.TRUE.equals(workflow.getActive())) {
            throw new IllegalStateException(
                    "Selected workflow is inactive."
            );
        }
        // ==========================================================
        // Find First Workflow Step
        // ==========================================================
        WorkflowStep firstStep = workflowStepRepository
                .findByWorkflowAndStepOrder(workflow, 1)
                .orElseThrow(()
                        -> new EntityNotFoundException(
                        "First workflow step not found."
                ));
        // ==========================================================
        // Resolve First Approver
        // ==========================================================
        Users approver = userRoleRepository
                .findFirstByRoleAndUsers_Organization(
                        firstStep.getRole(),
                        organization
                )
                .orElseThrow(()
                        -> new EntityNotFoundException(
                        "No approver found for the first workflow step."
                ))
                .getUsers();
        // ==========================================================
        // Update Invoice
        // ==========================================================
        invoice.setWorkflow(workflow);
        invoice.setStatus(InvoiceStatus.IN_REVIEW);
        invoiceRepository.save(invoice);
        // ==========================================================
        // Create Initial Approval Record
        // ==========================================================
        InvoiceApproval approval = InvoiceApproval.builder()
                .invoice(invoice)
                .workflowStep(firstStep)
                .approver(approver)
                .status(ApprovalStatus.PENDING)
                .comments(null)
                .build();
        invoiceApprovalRepository.save(approval);
        // ==========================================================
        // Return Response
        // ==========================================================
        return mapToResponse(invoice);
    }

    // - approveInvoice()
    @Override
    @Transactional
    public InvoiceResponse approveInvoice(
            Long invoiceId,
            ApproveInvoiceRequest request
    ) {
        // ==========================================================
        // Current User
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
        if (invoice.getStatus() == InvoiceStatus.APPROVED) {
            throw new IllegalStateException(
                    "Invoice has already been approved."
            );
        }
        if (invoice.getStatus() == InvoiceStatus.REJECTED) {
            throw new IllegalStateException(
                    "Invoice has already been rejected."
            );
        }
        // ==========================================================
        // Fetch Current Approval
        // ==========================================================
        InvoiceApproval currentApproval = invoiceApprovalRepository
                .findByInvoiceAndApproverAndStatus(
                        invoice,
                        currentUser,
                        ApprovalStatus.PENDING
                )
                .orElseThrow(()
                        -> new EntityNotFoundException(
                        "Pending approval not found."
                ));
        // ==========================================================
        // Approve Current Step
        // ==========================================================
        currentApproval.setStatus(ApprovalStatus.APPROVED);
        currentApproval.setComments(request.getComments());
        currentApproval.setActionAt(LocalDateTime.now());
        invoiceApprovalRepository.save(currentApproval);
        // ==========================================================
        // Determine Next Workflow Step
        // ==========================================================
        WorkflowStep currentStep = currentApproval.getWorkflowStep();
        Optional<WorkflowStep> nextStepOptional
                = workflowStepRepository.findByWorkflowAndStepOrder(
                        invoice.getWorkflow(),
                        currentStep.getStepOrder() + 1
                );
        // ==========================================================
        // Final Approval
        // ==========================================================
        if (nextStepOptional.isEmpty()) {
            invoice.setStatus(InvoiceStatus.APPROVED);
            invoiceRepository.save(invoice);
            return mapToResponse(invoice);
        }
        // ==========================================================
        // Assign Next Approver
        // ==========================================================
        WorkflowStep nextStep = nextStepOptional.get();
        Users nextApprover = userRoleRepository
                .findFirstByRoleAndUsers_Organization(
                        nextStep.getRole(),
                        organization
                )
                .orElseThrow(()
                        -> new EntityNotFoundException(
                        "Next approver not found."
                ))
                .getUsers();
        InvoiceApproval nextApproval = InvoiceApproval.builder()
                .invoice(invoice)
                .workflowStep(nextStep)
                .approver(nextApprover)
                .status(ApprovalStatus.PENDING)
                .build();
        invoiceApprovalRepository.save(nextApproval);
        // ==========================================================
        // Keep Invoice In Review
        // ==========================================================
        invoice.setStatus(InvoiceStatus.IN_REVIEW);
        invoiceRepository.save(invoice);
        // ==========================================================
        // Return Response
        // ==========================================================
        return mapToResponse(invoice);
    }

    // - rejectInvoice()
    @Override
    @Transactional
    public InvoiceResponse rejectInvoice(
            Long invoiceId,
            RejectInvoiceRequest request
    ) {
        // ==========================================================
        // Current User
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
        if (invoice.getStatus() == InvoiceStatus.APPROVED) {
            throw new IllegalStateException(
                    "Invoice has already been approved."
            );
        }
        if (invoice.getStatus() == InvoiceStatus.REJECTED) {
            throw new IllegalStateException(
                    "Invoice has already been rejected."
            );
        }
        // ==========================================================
        // Fetch Current Pending Approval
        // ==========================================================
        InvoiceApproval currentApproval = invoiceApprovalRepository
                .findByInvoiceAndApproverAndStatus(
                        invoice,
                        currentUser,
                        ApprovalStatus.PENDING
                )
                .orElseThrow(()
                        -> new EntityNotFoundException(
                        "Pending approval not found."
                ));
        // ==========================================================
        // Reject Current Approval
        // ==========================================================
        currentApproval.setStatus(ApprovalStatus.REJECTED);
        currentApproval.setComments(request.getComments());
        currentApproval.setActionAt(LocalDateTime.now());
        invoiceApprovalRepository.save(currentApproval);
        // ==========================================================
        // Reject Invoice
        // ==========================================================
        invoice.setStatus(InvoiceStatus.REJECTED);
        invoiceRepository.save(invoice);
        // ==========================================================
        // Return Response
        // ==========================================================
        return mapToResponse(invoice);
    }

    // - markAsPaid()
    @Override
    @Transactional
    public InvoiceResponse markAsPaid(Long invoiceId) {
        // ==========================================================
        // Current User
        // ==========================================================
        Users currentUser = getCurrentUser();
        Organization organization = currentUser.getOrganization();
        // ==========================================================
        // Fetch Invoice
        // ==========================================================
        Invoice invoice = invoiceRepository
                .findById(invoiceId)
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
        // Status Validation
        // ==========================================================
        if (invoice.getStatus() != InvoiceStatus.APPROVED) {
            throw new IllegalStateException(
                    "Only approved invoices can be marked as paid."
            );
        }
        if (invoice.getStatus() == InvoiceStatus.PAID) {
            throw new IllegalStateException(
                    "Invoice has already been marked as paid."
            );
        }
        // ==========================================================
        // Mark Invoice as Paid
        // ==========================================================
        invoice.setStatus(InvoiceStatus.PAID);
        invoiceRepository.save(invoice);
        // ==========================================================
        // Return Response
        // ==========================================================
        return mapToResponse(invoice);
    }
}
