import api from "./api";

const extractData = (response) => response.data.data;

const handleError = (error) => {
  throw error.response?.data || error;
};

const invoiceService = {
  // =========================
  // CRUD Operations
  // =========================

  /**
   * Create Invoice
   * POST /invoices
   */
  async createInvoice(invoiceData) {
    try {
      const response = await api.post("/invoices", invoiceData);
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Update Invoice
   * PUT /invoices/{invoiceId}
   */
  async updateInvoice(invoiceId, invoiceData) {
    try {
      const response = await api.put(`/invoices/${invoiceId}`, invoiceData);
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Delete Invoice (Soft Delete)
   * DELETE /invoices/{invoiceId}
   */
  async deleteInvoice(invoiceId) {
    try {
      const response = await api.delete(`/invoices/${invoiceId}`);
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Get Invoice By Id
   * GET /invoices/{invoiceId}
   */
  async getInvoice(invoiceId) {
    try {
      const response = await api.get(`/invoices/${invoiceId}`);
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Get All Organization Invoices
   * GET /invoices
   */
  async getOrganizationInvoices() {
    try {
      const response = await api.get("/invoices");
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  // =========================
  // Workflow Operations
  // =========================

  /**
   * Submit Invoice
   * POST /invoices/{invoiceId}/submit
   */
  async submitInvoice(invoiceId) {
    try {
      const response = await api.post(`/invoices/${invoiceId}/submit`);
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Approve Invoice
   * PATCH /invoices/{invoiceId}/approve
   */
  async approveInvoice(invoiceId, approvalData) {
    try {
      const response = await api.patch(
        `/invoices/${invoiceId}/approve`,
        approvalData,
      );
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Reject Invoice
   * PATCH /invoices/{invoiceId}/reject
   */
  async rejectInvoice(invoiceId, rejectionData) {
    try {
      const response = await api.patch(
        `/invoices/${invoiceId}/reject`,
        rejectionData,
      );
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Mark Invoice As Paid
   * PATCH /invoices/{invoiceId}/mark-paid
   */
  async markAsPaid(invoiceId) {
    try {
      const response = await api.patch(`/invoices/${invoiceId}/mark-paid`);
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  // =========================
  // Query Operations
  // =========================

  /**
   * Pending Invoices Assigned To Logged-in User
   * GET /invoices/pending
   */
  async getMyPendingInvoices() {
    try {
      const response = await api.get("/invoices/pending");
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Draft Invoices
   * GET /invoices/drafts
   */
  async getDraftInvoices() {
    try {
      const response = await api.get("/invoices/drafts");
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Submitted Invoices
   * GET /invoices/submitted
   */
  async getSubmittedInvoices() {
    try {
      const response = await api.get("/invoices/submitted");
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Approved Invoices
   * GET /invoices/approved
   */
  async getApprovedInvoices() {
    try {
      const response = await api.get("/invoices/approved");
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Rejected Invoices
   * GET /invoices/rejected
   */
  async getRejectedInvoices() {
    try {
      const response = await api.get("/invoices/rejected");
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },

  /**
   * Paid Invoices
   * GET /invoices/paid
   */
  async getPaidInvoices() {
    try {
      const response = await api.get("/invoices/paid");
      return extractData(response);
    } catch (error) {
      handleError(error);
    }
  },
};

export default invoiceService;
