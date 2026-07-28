package com.example.demo.Services;

import java.util.List;

import com.example.demo.DTO.Invoice.CreateInvoiceRequest;
import com.example.demo.DTO.Invoice.InvoiceListResponse;
import com.example.demo.DTO.Invoice.InvoiceResponse;
import com.example.demo.DTO.Invoice.UpdateInvoiceRequest;

public interface InvoiceService {

    // ==========================================================
    // CRUD Operations
    // ==========================================================
    InvoiceResponse createInvoice(CreateInvoiceRequest request);

    InvoiceResponse updateInvoice(
            Long invoiceId,
            UpdateInvoiceRequest request
    );

    InvoiceResponse getInvoice(Long invoiceId);

    void deleteInvoice(Long invoiceId);

    // ==========================================================
    // Query Operations
    // ==========================================================
    List<InvoiceListResponse> getOrganizationInvoices();

    List<InvoiceListResponse> getDraftInvoices();

    List<InvoiceListResponse> getMySubmittedInvoices();

    List<InvoiceListResponse> getMyPendingInvoices();

    List<InvoiceListResponse> getApprovedInvoices();

    List<InvoiceListResponse> getRejectedInvoices();

    List<InvoiceListResponse> getPaidInvoices();
}
