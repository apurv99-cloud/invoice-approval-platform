# Enterprise Invoice Approval System

A full-stack enterprise-grade Invoice Approval System built with **Spring Boot**, **React**, **PostgreSQL**, and **Spring Security**. The application streamlines invoice submission, approval workflows, payment processing, and role-based access management for organizations.

---

## Features

### Authentication & Authorization

- JWT Authentication
- Spring Security
- Role-Based Access Control (RBAC)
- Secure REST APIs
- Multi-tenant Organization Support

---

### Organization Management

- Super Admin Dashboard
- Create Organizations
- Activate / Deactivate Organizations
- Organization-wise User Management

---

### User Management

- Create Users
- Update Users
- Activate / Deactivate Users
- Organization-specific Users
- User Profiles

---

### Invoice Management

- Submit Invoices
- Invoice Details
- Invoice Status Tracking
- Approval Workflow
- Invoice History

---

### Reviewer Module

- Review Submitted Invoices
- Approve Invoices
- Reject Invoices
- Approval Timeline

---

### Finance Module

- Finance Dashboard
- Approved Invoices
- Process Payments
- Payment History
- Reports Dashboard
- Finance Profile

---

## User Roles

- Super Admin
- Organization Admin
- Reviewer
- Finance
- Vendor

---

## Workflow

```
Vendor
    │
    ▼
Submit Invoice
    │
    ▼
Reviewer
 ┌──────────────┐
 │ Approve      │
 │ Reject       │
 └──────────────┘
    │
    ▼
Finance
    │
Process Payment
    │
    ▼
Invoice Status → PAID
```

---

## Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- Maven
- PostgreSQL

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- Lucide Icons

### Database

- PostgreSQL

### Tools

- Git
- GitHub
- Postman
- IntelliJ IDEA
- VS Code

---

## Architecture

```
React Frontend
        │
        ▼
REST APIs
        │
        ▼
Spring Boot
        │
        ▼
Service Layer
        │
        ▼
Repository Layer
        │
        ▼
PostgreSQL
```

---

## Project Structure

### Backend

```
src
├── config
├── controller
├── dto
├── entity
├── enums
├── exception
├── repository
├── security
├── service
└── util
```

### Frontend

```
src
├── Components
├── Context
├── Hooks
├── Layouts
├── Pages
├── Routes
├── Services
└── Utils
```

---

## Database Highlights

- Normalized Database Design
- Multi-tenant Organizations
- Users & Roles
- Permissions
- Invoices
- Invoice Approval Workflow
- Payments
- Notifications
- Audit Ready Structure

---

## Security Features

- JWT Authentication
- BCrypt Password Encryption
- Protected Routes
- Role-Based Authorization
- Organization Isolation

---

## Future Enhancements

- Email Notifications
- Audit Logs
- File Uploads
- Invoice Attachments
- Payment Gateway Integration
- Analytics Dashboard
- AI-based Invoice Validation
- Docker Deployment
- Kubernetes Deployment
- Microservices Architecture

---

## Installation

### Backend

```bash
git clone https://github.com/apurv99-cloud/invoice-approval-platform.git

cd backend

mvn spring-boot:run
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Backend

```
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=

JWT_SECRET=
```

Frontend

```
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## Screenshots

> Add screenshots of:

- Landing Page
- Login
- Super Admin Dashboard
- Organization Management
- User Management
- Reviewer Dashboard
- Finance Dashboard
- Payment Processing
- Reports

---

## Learning Outcomes

- Enterprise Application Architecture
- REST API Development
- Spring Security & JWT
- Role-Based Access Control
- React Component Architecture
- PostgreSQL Database Design
- Multi-Tenant Systems
- Full-Stack Integration

---

## Author

**Apurv Sinha**

GitHub: https://github.com/apurv99-cloud

LinkedIn: https://www.linkedin.com/in/apurva-sinha-b1b259306/

Portfolio: https://portfolo-eta-six.vercel.app/

---
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
