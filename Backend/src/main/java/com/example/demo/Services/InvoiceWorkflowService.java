package com.example.demo.Services;

import com.example.demo.DTO.Invoice.ApproveInvoiceRequest;
import com.example.demo.DTO.Invoice.InvoiceResponse;
import com.example.demo.DTO.Invoice.RejectInvoiceRequest;

public interface InvoiceWorkflowService {

    // ==========================================================
    // Workflow Operations
    // ==========================================================
    InvoiceResponse submitInvoice(Long invoiceId);

    InvoiceResponse approveInvoice(
            Long invoiceId,
            ApproveInvoiceRequest request
    );

    InvoiceResponse rejectInvoice(
            Long invoiceId,
            RejectInvoiceRequest request
    );

    // ==========================================================
    // Finance
    // ==========================================================
    InvoiceResponse markAsPaid(Long invoiceId);
}
