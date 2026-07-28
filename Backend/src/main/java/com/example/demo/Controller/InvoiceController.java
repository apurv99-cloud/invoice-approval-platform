package com.example.demo.Controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ApiResponse;
import com.example.demo.DTO.Invoice.ApproveInvoiceRequest;
import com.example.demo.DTO.Invoice.CreateInvoiceRequest;
import com.example.demo.DTO.Invoice.InvoiceListResponse;
import com.example.demo.DTO.Invoice.InvoiceResponse;
import com.example.demo.DTO.Invoice.RejectInvoiceRequest;
import com.example.demo.DTO.Invoice.UpdateInvoiceRequest;
import com.example.demo.Services.InvoiceService;
import com.example.demo.Services.InvoiceWorkflowService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final InvoiceWorkflowService invoiceWorkflowService;

    // ==========================================================
    // Create Invoice
    // ==========================================================
    @PostMapping
    public ResponseEntity<ApiResponse<InvoiceResponse>> createInvoice(
            @Valid @RequestBody CreateInvoiceRequest request) {

        InvoiceResponse response = invoiceService.createInvoice(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<InvoiceResponse>builder()
                        .success(true)
                        .message("Invoice created successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build());
    }

    // ==========================================================
    // Update Invoice
    // ==========================================================
    @PutMapping("/{invoiceId}")
    public ResponseEntity<ApiResponse<InvoiceResponse>> updateInvoice(
            @PathVariable Long invoiceId,
            @Valid @RequestBody UpdateInvoiceRequest request) {

        InvoiceResponse response
                = invoiceService.updateInvoice(invoiceId, request);

        return ResponseEntity.ok(
                ApiResponse.<InvoiceResponse>builder()
                        .success(true)
                        .message("Invoice updated successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    // ==========================================================
    // Get Invoice
    // ==========================================================
    @GetMapping("/{invoiceId}")
    public ResponseEntity<ApiResponse<InvoiceResponse>> getInvoice(
            @PathVariable Long invoiceId) {

        InvoiceResponse response
                = invoiceService.getInvoice(invoiceId);

        return ResponseEntity.ok(
                ApiResponse.<InvoiceResponse>builder()
                        .success(true)
                        .message("Invoice fetched successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

    // ==========================================================
    // Delete Invoice
    // ==========================================================
    @DeleteMapping("/{invoiceId}")
    public ResponseEntity<ApiResponse<Void>> deleteInvoice(
            @PathVariable Long invoiceId) {

        invoiceService.deleteInvoice(invoiceId);

        return ResponseEntity.ok(
                ApiResponse.<Void>builder()
                        .success(true)
                        .message("Invoice deleted successfully")
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }
    // ==========================================================
// Submit Invoice
// ==========================================================

    @PostMapping("/{invoiceId}/submit")
    public ResponseEntity<ApiResponse<InvoiceResponse>> submitInvoice(
            @PathVariable Long invoiceId) {

        InvoiceResponse response
                = invoiceWorkflowService.submitInvoice(invoiceId);

        return ResponseEntity.ok(
                ApiResponse.<InvoiceResponse>builder()
                        .success(true)
                        .message("Invoice submitted successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

// ==========================================================
// Approve Invoice
// ==========================================================
    @PatchMapping("/{invoiceId}/approve")
    public ResponseEntity<ApiResponse<InvoiceResponse>> approveInvoice(
            @PathVariable Long invoiceId,
            @Valid @RequestBody ApproveInvoiceRequest request) {

        InvoiceResponse response
                = invoiceWorkflowService.approveInvoice(invoiceId, request);

        return ResponseEntity.ok(
                ApiResponse.<InvoiceResponse>builder()
                        .success(true)
                        .message("Invoice approved successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

// ==========================================================
// Reject Invoice
// ==========================================================
    @PatchMapping("/{invoiceId}/reject")
    public ResponseEntity<ApiResponse<InvoiceResponse>> rejectInvoice(
            @PathVariable Long invoiceId,
            @Valid @RequestBody RejectInvoiceRequest request) {

        InvoiceResponse response
                = invoiceWorkflowService.rejectInvoice(invoiceId, request);

        return ResponseEntity.ok(
                ApiResponse.<InvoiceResponse>builder()
                        .success(true)
                        .message("Invoice rejected successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

// ==========================================================
// Mark Invoice As Paid
// ==========================================================
    @PatchMapping("/{invoiceId}/mark-paid")
    public ResponseEntity<ApiResponse<InvoiceResponse>> markAsPaid(
            @PathVariable Long invoiceId) {

        InvoiceResponse response
                = invoiceWorkflowService.markAsPaid(invoiceId);

        return ResponseEntity.ok(
                ApiResponse.<InvoiceResponse>builder()
                        .success(true)
                        .message("Invoice marked as paid successfully")
                        .data(response)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }
// ==========================================================
// Get Organization Invoices
// ==========================================================

    @GetMapping
    public ResponseEntity<ApiResponse<List<InvoiceListResponse>>> getOrganizationInvoices() {

        List<InvoiceListResponse> invoices
                = invoiceService.getOrganizationInvoices();

        return ResponseEntity.ok(
                ApiResponse.<List<InvoiceListResponse>>builder()
                        .success(true)
                        .message("Organization invoices fetched successfully")
                        .data(invoices)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

// ==========================================================
// Get My Pending Invoices
// ==========================================================
    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<List<InvoiceListResponse>>> getMyPendingInvoices() {

        List<InvoiceListResponse> invoices
                = invoiceService.getMyPendingInvoices();

        return ResponseEntity.ok(
                ApiResponse.<List<InvoiceListResponse>>builder()
                        .success(true)
                        .message("Pending invoices fetched successfully")
                        .data(invoices)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

// ==========================================================
// Get Draft Invoices
// ==========================================================
    @GetMapping("/drafts")
    public ResponseEntity<ApiResponse<List<InvoiceListResponse>>> getDraftInvoices() {

        List<InvoiceListResponse> invoices
                = invoiceService.getDraftInvoices();

        return ResponseEntity.ok(
                ApiResponse.<List<InvoiceListResponse>>builder()
                        .success(true)
                        .message("Draft invoices fetched successfully")
                        .data(invoices)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

// ==========================================================
// Get My Submitted Invoices
// ==========================================================
    @GetMapping("/submitted")
    public ResponseEntity<ApiResponse<List<InvoiceListResponse>>> getMySubmittedInvoices() {

        List<InvoiceListResponse> invoices
                = invoiceService.getMySubmittedInvoices();

        return ResponseEntity.ok(
                ApiResponse.<List<InvoiceListResponse>>builder()
                        .success(true)
                        .message("Submitted invoices fetched successfully")
                        .data(invoices)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }
// ==========================================================
// Get Approved Invoices
// ==========================================================

    @GetMapping("/approved")
    public ResponseEntity<ApiResponse<List<InvoiceListResponse>>> getApprovedInvoices() {

        List<InvoiceListResponse> invoices
                = invoiceService.getApprovedInvoices();

        return ResponseEntity.ok(
                ApiResponse.<List<InvoiceListResponse>>builder()
                        .success(true)
                        .message("Approved invoices fetched successfully")
                        .data(invoices)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

// ==========================================================
// Get Rejected Invoices
// ==========================================================
    @GetMapping("/rejected")
    public ResponseEntity<ApiResponse<List<InvoiceListResponse>>> getRejectedInvoices() {

        List<InvoiceListResponse> invoices
                = invoiceService.getRejectedInvoices();

        return ResponseEntity.ok(
                ApiResponse.<List<InvoiceListResponse>>builder()
                        .success(true)
                        .message("Rejected invoices fetched successfully")
                        .data(invoices)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

// ==========================================================
// Get Paid Invoices
// ==========================================================
    @GetMapping("/paid")
    public ResponseEntity<ApiResponse<List<InvoiceListResponse>>> getPaidInvoices() {

        List<InvoiceListResponse> invoices
                = invoiceService.getPaidInvoices();

        return ResponseEntity.ok(
                ApiResponse.<List<InvoiceListResponse>>builder()
                        .success(true)
                        .message("Paid invoices fetched successfully")
                        .data(invoices)
                        .timestamp(LocalDateTime.now())
                        .build()
        );
    }

}
