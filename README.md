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
  <img width="1600" height="749" alt="image" src="https://github.com/user-attachments/assets/041c7aa0-7c6b-4521-8979-869a672f6d2b" />

- Organization Management
  <img width="1600" height="808" alt="image" src="https://github.com/user-attachments/assets/61b9f438-9071-4023-98ca-2d0718a04e1c" />

- User Management
  <img width="1600" height="751" alt="image" src="https://github.com/user-attachments/assets/0cdbf022-af40-4faf-8b6c-83ea1d0200f5" />

- Vendor Dashboard
  <img width="1600" height="805" alt="image" src="https://github.com/user-attachments/assets/1d2eee21-399f-4f36-861f-5f659328e9a7" />
  Create Invoice By Vendor
  <img width="1600" height="810" alt="image" src="https://github.com/user-attachments/assets/cedee2cb-51d3-4342-bdd8-8364b984ff22" />


- Reviewer Dashboard
  <img width="1600" height="805" alt="image" src="https://github.com/user-attachments/assets/dd0615f1-c5fb-4436-911b-31f5869504e3" />
  <img width="1600" height="810" alt="image" src="https://github.com/user-attachments/assets/b79b5c61-790f-458e-8f9a-9a78614b3d18" />



- Finance Dashboard
  <img width="1600" height="810" alt="image" src="https://github.com/user-attachments/assets/4027ecff-eafe-4c22-8c00-7ca9ac4f6498" />
  <img width="1600" height="825" alt="image" src="https://github.com/user-attachments/assets/809903b6-f8d0-4840-81bd-b5c6acea27d1" />

- Payment Processing
  <img width="1600" height="810" alt="image" src="https://github.com/user-attachments/assets/3f9315dd-a6f0-4a47-a330-bec2124714b3" />
  After Payment Processed
  <img width="1600" height="807" alt="image" src="https://github.com/user-attachments/assets/1550f854-ce6a-415d-a7b2-1055749c9695" />


- Reports
  <img width="1600" height="810" alt="image" src="https://github.com/user-attachments/assets/b55e947e-0d3f-4cda-895a-1ad5071c01b2" />


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
