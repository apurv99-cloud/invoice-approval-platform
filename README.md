# Enterprise Invoice Approval System
<img width="1342" height="946" alt="image" src="https://github.com/user-attachments/assets/1ea112dd-b012-4d2e-b91c-c3d634903fb0" />


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

> Screenshots of:

- Landing Page
  <img width="1342" height="946" alt="image" src="https://github.com/user-attachments/assets/b461293d-e57d-4d85-b52c-494c36b9dbde" />

- Super Admin Dashboard
- <img width="1917" height="973" alt="image" src="https://github.com/user-attachments/assets/9078dd11-916d-4df8-b7f2-323659f0b17e" />

- Organization Onboarding form
- <img width="1917" height="966" alt="image" src="https://github.com/user-attachments/assets/222923f4-ca73-496b-9b46-aaee73d9c2ef" />

- Organization Management
  <img width="1917" height="978" alt="image" src="https://github.com/user-attachments/assets/cda3a6e6-99ce-44be-bc2c-38f124044783" />


- User Management
- <img width="1896" height="967" alt="image" src="https://github.com/user-attachments/assets/82258739-2a5f-4d6b-bc0d-ec49a7e76ed5" />
- <img width="1915" height="970" alt="image" src="https://github.com/user-attachments/assets/b7bebdb3-54a2-4c0f-ba26-1f0eb174d461" />


- Vendor Dashboard
  <img width="1917" height="972" alt="image" src="https://github.com/user-attachments/assets/b60c7e6b-8e13-4606-ae71-5fc0e3eb536e" />

  Create Invoice By Vendor
  <img width="1912" height="968" alt="image" src="https://github.com/user-attachments/assets/4b6950d0-114a-4ba4-ba59-da513925f037" />

  Listed Invoices
  <img width="1912" height="973" alt="image" src="https://github.com/user-attachments/assets/73ddb822-02ba-46b7-bf85-9486a2e047ad" />




- Reviewer Dashboard
  <img width="1600" height="805" alt="image" src="https://github.com/user-attachments/assets/dd0615f1-c5fb-4436-911b-31f5869504e3" />
  <img width="1600" height="810" alt="image" src="https://github.com/user-attachments/assets/b79b5c61-790f-458e-8f9a-9a78614b3d18" />



- Finance Dashboard
  <img width="1917" height="962" alt="image" src="https://github.com/user-attachments/assets/9f8589ab-eeca-4615-90ef-77c5395d0c86" />
  <img width="1912" height="970" alt="image" src="https://github.com/user-attachments/assets/aa7dccae-a9c7-401c-a5a3-1a08a338c732" />
  

- Payment Processing
  <img width="1600" height="810" alt="image" src="https://github.com/user-attachments/assets/3f9315dd-a6f0-4a47-a330-bec2124714b3" />
  After Payment Processed
  <img width="1905" height="961" alt="image" src="https://github.com/user-attachments/assets/efaf4d38-fadb-40bc-b263-c38dd5a1cef4" />



- Reports
- <img width="1917" height="975" alt="image" src="https://github.com/user-attachments/assets/b176df31-c291-4410-b3e0-d3e71fe1c377" />
- <img width="1917" height="967" alt="image" src="https://github.com/user-attachments/assets/2167a59c-f2da-4c25-b0d8-4eeebc8cd048" />



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
