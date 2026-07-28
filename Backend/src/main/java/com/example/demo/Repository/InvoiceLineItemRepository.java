package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Invoice;
import com.example.demo.Entity.InvoiceLineItem;

public interface InvoiceLineItemRepository
        extends JpaRepository<InvoiceLineItem, Long> {

    List<InvoiceLineItem> findByInvoice(Invoice invoice);

    void deleteByInvoice(Invoice invoice);

}
