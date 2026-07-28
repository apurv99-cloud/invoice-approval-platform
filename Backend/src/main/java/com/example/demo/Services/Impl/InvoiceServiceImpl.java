package com.example.demo.Services.Impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.Invoice.ApproveInvoiceRequest;
import com.example.demo.DTO.Invoice.CreateInvoiceRequest;
import com.example.demo.DTO.Invoice.InvoiceListResponse;
import com.example.demo.DTO.Invoice.InvoiceResponse;
import com.example.demo.DTO.Invoice.RejectInvoiceRequest;
import com.example.demo.DTO.Invoice.UpdateInvoiceRequest;
import com.example.demo.Entity.ApprovalStatus;
import com.example.demo.Entity.Invoice;
import com.example.demo.Entity.InvoiceApproval;
import com.example.demo.Entity.InvoiceStatus;
import com.example.demo.Entity.Organization;
import com.example.demo.Entity.Role;
import com.example.demo.Entity.Users;
import com.example.demo.Entity.WorkflowMaster;
import com.example.demo.Entity.WorkflowRule;
import com.example.demo.Entity.WorkflowStep;
import com.example.demo.Repository.InvoiceApprovalRepository;
import com.example.demo.Repository.InvoiceRepository;
import com.example.demo.Repository.OrganizationRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.UserRoleRepository;
import com.example.demo.Repository.WorkflowMasterRepository;
import com.example.demo.Repository.WorkflowRuleRepository;
import com.example.demo.Repository.WorkflowStepRepository;
import com.example.demo.Services.InvoiceService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl
        implements InvoiceService {

    private final InvoiceRepository invoiceRepository;

    private final InvoiceApprovalRepository invoiceApprovalRepository;

    private final WorkflowMasterRepository workflowMasterRepository;

    private final WorkflowRuleRepository workflowRuleRepository;

    private final WorkflowStepRepository workflowStepRepository;

    private final UserRepository userRepository;

    private final UserRoleRepository userRoleRepository;

    private final OrganizationRepository organizationRepository;

    private Users getCurrentUser() {

        String email
                = SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(()
                        -> new RuntimeException(
                        "User not found"));
    }

    private Organization getCurrentOrganization() {

        Users currentUser
                = getCurrentUser();

        return currentUser.getOrganization();
    }

    private String generateInvoiceNumber() {

        long count
                = invoiceRepository.count() + 1;

        return String.format(
                "INV-%06d",
                count
        );
    }

    private InvoiceResponse mapToResponse(
            Invoice invoice
    ) {

        return InvoiceResponse.builder()
                .invoiceId(invoice.getInvoiceId())
                .invoiceNumber(invoice.getInvoiceNumber())
                //                .invoiceTitle(invoice.getInvoiceTitle())
                .description(invoice.getDescription())
                .amount(invoice.getAmount())
                .invoiceDate(invoice.getInvoiceDate())
                .dueDate(invoice.getDueDate())
                .status(invoice.getStatus())
                .vendorName(invoice.getVendor().getFullName())
                .organizationName(invoice.getOrganization().getOrganizationName())
                .workflowName(invoice.getWorkflow() != null ? invoice.getWorkflow().getWorkflowName() : null)
                .createdAt(invoice.getCreatedAt())
                .build();
    }

    private InvoiceListResponse mapToListResponse(
            Invoice invoice
    ) {

        InvoiceApproval currentApproval
                = invoiceApprovalRepository
                        .findByApproverAndStatus(
                                getCurrentUser(),
                                ApprovalStatus.PENDING
                        )
                        .stream()
                        .filter(a
                                -> a.getInvoice()
                                .getInvoiceId()
                                .equals(invoice.getInvoiceId()))
                        .findFirst()
                        .orElse(null);

        return InvoiceListResponse.builder()
                .invoiceId(invoice.getInvoiceId())
                .invoiceNumber(invoice.getInvoiceNumber())
                .invoiceTitle(invoice.getInvoiceTitle())
                .amount(invoice.getAmount())
                .status(invoice.getStatus())
                .vendorName(invoice.getVendor().getFullName())
                .currentApprover(
                        currentApproval != null
                                ? currentApproval
                                        .getApprover()
                                        .getFullName()
                                : null)
                .createdAt(invoice.getCreatedAt())
                .build();
    }

    @Override
    @Transactional
    public InvoiceResponse createInvoice(
            CreateInvoiceRequest request
    ) {

        // Current User
        Users vendor = getCurrentUser();

        // Organization
        Organization organization
                = vendor.getOrganization();

        // Due Date Validation
        if (request.getDueDate()
                .isBefore(request.getInvoiceDate())) {

            throw new RuntimeException(
                    "Due Date cannot be before Invoice Date");
        }

        // Create Draft Invoice
        Invoice invoice
                = Invoice.builder()
                        .invoiceNumber(
                                generateInvoiceNumber())
                        .invoiceTitle(
                                request.getInvoiceTitle())
                        .description(
                                request.getDescription())
                        .amount(
                                request.getAmount())
                        .invoiceDate(
                                request.getInvoiceDate())
                        .dueDate(
                                request.getDueDate())
                        .status(
                                InvoiceStatus.DRAFT)
                        .vendor(
                                vendor)
                        .organization(
                                organization)
                        .workflow(null)
                        .deleted(false)
                        .build();

        Invoice savedInvoice
                = invoiceRepository.save(invoice);

        return mapToResponse(savedInvoice);
    }

    @Override
    @Transactional
    public InvoiceResponse submitInvoice(
            Long invoiceId
    ) {

        // Current Vendor
        Users vendor
                = getCurrentUser();

        // Find Invoice
        Invoice invoice
                = invoiceRepository
                        .findById(invoiceId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                "Invoice not found"));

        // Only owner can submit
        if (!invoice.getVendor()
                .getUserId()
                .equals(vendor.getUserId())) {

            throw new RuntimeException(
                    "Only invoice owner can submit invoice");
        }

        // Same Organization Validation
        if (!invoice.getOrganization()
                .getOrganizationId()
                .equals(vendor.getOrganization()
                        .getOrganizationId())) {

            throw new RuntimeException(
                    "Access Denied");
        }

        // Only Draft can be submitted
        if (invoice.getStatus()
                != InvoiceStatus.DRAFT) {

            throw new RuntimeException(
                    "Only Draft invoices can be submitted");
        }

        // Due Date Validation
        if (invoice.getDueDate()
                .isBefore(invoice.getInvoiceDate())) {

            throw new RuntimeException(
                    "Due Date cannot be before Invoice Date");
        }

        // Find Workflow Rule
        WorkflowRule workflowRule
                = workflowRuleRepository
                        .findByWorkflow_OrganizationAndMinAmountLessThanEqualAndMaxAmountGreaterThanEqual(
                                vendor.getOrganization(),
                                invoice.getAmount(),
                                invoice.getAmount()
                        )
                        .orElseThrow(()
                                -> new RuntimeException(
                                "No Workflow Rule Found"));

        // Get Workflow
        WorkflowMaster workflow
                = workflowRule.getWorkflow();

        if (!Boolean.TRUE.equals(
                workflow.getActive())) {

            throw new RuntimeException(
                    "Workflow is inactive");
        }

        // First Workflow Step
        WorkflowStep firstStep
                = workflowStepRepository
                        .findByWorkflowAndStepOrder(
                                workflow,
                                1
                        )
                        .orElseThrow(()
                                -> new RuntimeException(
                                "First Workflow Step not found"));

        // First Approver Role
        Role approverRole
                = firstStep.getRole();

        // Find Approver
        Users approver
                = userRoleRepository
                        .findFirstByRoleAndUsers_Organization(
                                approverRole,
                                vendor.getOrganization()
                        )
                        .orElseThrow(()
                                -> new RuntimeException(
                                "Approver not found"))
                        .getUsers();

        // Assign Workflow
        invoice.setWorkflow(workflow);

        // Move to Review
        invoice.setStatus(
                InvoiceStatus.IN_REVIEW);

        invoiceRepository.save(invoice);

        // Create First Approval
        InvoiceApproval approval
                = InvoiceApproval.builder()
                        .invoice(invoice)
                        .workflowStep(firstStep)
                        .approver(approver)
                        .status(
                                ApprovalStatus.PENDING)
                        .comments(null)
                        .build();

        InvoiceApproval savedApproval = invoiceApprovalRepository.save(approval);
        // Ensure approval persisted before returning (flush to DB)
        invoiceApprovalRepository.flush();

        Invoice updatedInvoice
                = invoiceRepository.save(invoice);

        return mapToResponse(updatedInvoice);
    }

    @Override
    @Transactional
    public InvoiceResponse updateInvoice(
            Long invoiceId,
            UpdateInvoiceRequest request
    ) {

        Users currentUser
                = getCurrentUser();

        Invoice invoice
                = invoiceRepository
                        .findById(invoiceId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                "Invoice not found"));

        // Organization Validation
        if (!invoice.getOrganization()
                .getOrganizationId()
                .equals(currentUser.getOrganization()
                        .getOrganizationId())) {

            throw new RuntimeException(
                    "Access Denied");
        }

        // Vendor Validation
        if (!invoice.getVendor()
                .getUserId()
                .equals(currentUser.getUserId())) {

            throw new RuntimeException(
                    "Only invoice owner can update");
        }

        // Status Validation
        if (invoice.getStatus() != InvoiceStatus.DRAFT) {

            throw new RuntimeException(
                    "Only Draft invoices can be updated");
        }

        // Update Fields
        invoice.setInvoiceTitle(
                request.getInvoiceTitle());

        invoice.setDescription(
                request.getDescription());

        invoice.setAmount(
                request.getAmount());

        invoice.setInvoiceDate(
                request.getInvoiceDate());

        invoice.setDueDate(
                request.getDueDate());

        Invoice updatedInvoice
                = invoiceRepository.save(invoice);

        return mapToResponse(updatedInvoice);
    }

    @Override
    @Transactional()
    public InvoiceResponse getInvoice(
            Long invoiceId
    ) {

        Users currentUser = getCurrentUser();

        Invoice invoice
                = invoiceRepository
                        .findById(invoiceId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                "Invoice not found"));

        // Organization Validation
        if (!invoice.getOrganization()
                .getOrganizationId()
                .equals(
                        currentUser
                                .getOrganization()
                                .getOrganizationId())) {

            throw new RuntimeException(
                    "Access Denied");
        }

        return mapToResponse(invoice);
    }

    @Override
    @Transactional()
    public List<InvoiceListResponse> getOrganizationInvoices() {

        Organization organization
                = getCurrentOrganization();

        return invoiceRepository
                .findByOrganizationAndDeletedFalse(
                        organization
                )
                .stream()
                .map(this::mapToListResponse)
                .toList();
    }

    @Override
    @Transactional()
    public List<InvoiceListResponse> getMyPendingInvoices() {

        Users currentUser
                = getCurrentUser();

        List<InvoiceApproval> approvals
                = invoiceApprovalRepository
                        .findByApproverIdAndStatus(
                                currentUser.getUserId(),
                                ApprovalStatus.PENDING);

        return approvals
                .stream()
                .map(InvoiceApproval::getInvoice)
                .map(this::mapToListResponse)
                .toList();
    }

    @Override
    @Transactional
    public com.example.demo.DTO.Invoice.InvoiceResponse approveInvoice(
            Long invoiceId,
            ApproveInvoiceRequest request
    ) {

        // Current User
        Users currentUser = getCurrentUser();

        // Invoice
        Invoice invoice
                = invoiceRepository
                        .findById(invoiceId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                "Invoice not found"));
        if (invoice.getStatus() == InvoiceStatus.APPROVED) {
            throw new RuntimeException("Invoice already approved");
        }

        if (invoice.getStatus() == InvoiceStatus.REJECTED) {
            throw new RuntimeException("Invoice already rejected");
        }

        // Organization Validation
        if (!invoice.getOrganization()
                .getOrganizationId()
                .equals(currentUser
                        .getOrganization()
                        .getOrganizationId())) {

            throw new RuntimeException(
                    "Access Denied");
        }

        // Current Pending Approval
        InvoiceApproval currentApproval
                = invoiceApprovalRepository
                        .findByInvoiceAndApproverAndStatus(
                                invoice,
                                currentUser,
                                ApprovalStatus.PENDING
                        )
                        .orElseThrow(()
                                -> new RuntimeException(
                                "Approval not found"));

        // Mark Approved
        currentApproval.setStatus(
                ApprovalStatus.APPROVED);
        currentApproval.setActionAt(LocalDateTime.now());

        currentApproval.setComments(
                request.getComments());

        invoiceApprovalRepository.save(
                currentApproval);

        // Current Step
        WorkflowStep currentStep
                = currentApproval.getWorkflowStep();

        Integer nextOrder
                = currentStep.getStepOrder() + 1;

        // Next Workflow Step
        Optional<WorkflowStep> nextStepOptional
                = workflowStepRepository
                        .findByWorkflowAndStepOrder(
                                invoice.getWorkflow(),
                                nextOrder);

        // Last Step
        if (nextStepOptional.isEmpty()) {

            invoice.setStatus(
                    InvoiceStatus.APPROVED);

            invoiceRepository.save(invoice);

            return mapToResponse(invoice);
        }

        WorkflowStep nextStep
                = nextStepOptional.get();

        Role nextRole
                = nextStep.getRole();

        Users nextApprover
                = userRoleRepository
                        .findFirstByRoleAndUsers_Organization(
                                nextRole,
                                invoice.getOrganization()
                        )
                        .orElseThrow(()
                                -> new RuntimeException(
                                "Next Approver not found"))
                        .getUsers();

        InvoiceApproval nextApproval
                = InvoiceApproval.builder()
                        .invoice(invoice)
                        .workflowStep(nextStep)
                        .approver(nextApprover)
                        .status(
                                ApprovalStatus.PENDING)
                        .build();

        invoiceApprovalRepository.save(
                nextApproval);

        invoice.setStatus(
                InvoiceStatus.IN_REVIEW);

        invoiceRepository.save(invoice);

        return mapToResponse(invoice);
    }

    @Override
    @Transactional
    public com.example.demo.DTO.Invoice.InvoiceResponse rejectInvoice(
            Long invoiceId,
            RejectInvoiceRequest request
    ) {

        // Current User
        Users currentUser
                = getCurrentUser();

        // Find Invoice
        Invoice invoice
                = invoiceRepository
                        .findById(invoiceId)
                        .orElseThrow(()
                                -> new RuntimeException(
                                "Invoice not found"));

        // Organization Validation
        if (!invoice.getOrganization()
                .getOrganizationId()
                .equals(
                        currentUser
                                .getOrganization()
                                .getOrganizationId())) {

            throw new RuntimeException(
                    "Access Denied");
        }

        // Already Completed Validation
        if (invoice.getStatus() == InvoiceStatus.APPROVED) {

            throw new RuntimeException(
                    "Invoice already approved");
        }

        if (invoice.getStatus() == InvoiceStatus.REJECTED) {

            throw new RuntimeException(
                    "Invoice already rejected");
        }

        // Find Current Pending Approval
        InvoiceApproval currentApproval
                = invoiceApprovalRepository
                        .findByInvoiceAndApproverAndStatus(
                                invoice,
                                currentUser,
                                ApprovalStatus.PENDING
                        )
                        .orElseThrow(()
                                -> new RuntimeException(
                                "Pending approval not found"));

        // Reject Current Approval
        currentApproval.setStatus(
                ApprovalStatus.REJECTED);

        currentApproval.setComments(
                request.getComments());

        // Optional (if you added actionAt)
        // currentApproval.setActionAt(LocalDateTime.now());
        invoiceApprovalRepository.save(
                currentApproval);

        // Reject Invoice
        invoice.setStatus(
                InvoiceStatus.REJECTED);

        invoiceRepository.save(
                invoice);

        return mapToResponse(invoice);
    }
}
