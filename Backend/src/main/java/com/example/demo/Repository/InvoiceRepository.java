package com.example.demo.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Invoice;
import com.example.demo.Entity.InvoiceStatus;
import com.example.demo.Entity.Organization;
import com.example.demo.Entity.Users;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {

    // ==========================================================
    // Vendor Queries
    // ==========================================================
    List<Invoice> findByVendor(Users vendor);

    List<Invoice> findByVendorAndDeletedFalse(
            Users vendor
    );

    List<Invoice> findByVendorAndStatusAndDeletedFalse(
            Users vendor,
            InvoiceStatus status
    );

    // ==========================================================
    // Organization Queries
    // ==========================================================
    List<Invoice> findByOrganizationAndDeletedFalse(
            Organization organization
    );

    List<Invoice> findByOrganizationAndStatusAndDeletedFalse(
            Organization organization,
            InvoiceStatus status
    );

    // ==========================================================
    // Invoice Lookup
    // ==========================================================
    Optional<Invoice> findByInvoiceIdAndDeletedFalse(
            Long invoiceId
    );

    // ==========================================================
    // Utility
    // ==========================================================
    long count();
}
