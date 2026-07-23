# Enterprise Invoice Approval System

![Java](https://img.shields.io/badge/Java-21-red)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-green)
![React](https://img.shields.io/badge/React-19-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED)
![License](https://img.shields.io/badge/License-MIT-green)

<img width="1902" height="965" alt="Landing Page" src="https://github.com/user-attachments/assets/5754e5a5-0ca9-4302-8351-7839bd334e0f" />

---

# Enterprise Invoice Approval Platform

A full-stack **Enterprise Invoice Approval Platform** built using **Spring Boot**, **React**, **PostgreSQL**, **Spring Security**, and **Docker**.

The platform enables organizations to securely manage invoice submissions, multi-level approval workflows, payment processing, and role-based access control (RBAC) in a multi-tenant environment.

The application follows enterprise software architecture principles, making it suitable for real-world business workflows and scalable deployments.

---

# Project Highlights

- Enterprise Role-Based Access Control (RBAC)
- JWT Authentication & Spring Security
- Multi-Tenant Organization Management
- Invoice Approval Workflow
- Payment Processing
- Organization Onboarding
- Dockerized Full Stack Deployment
- PostgreSQL Normalized Database Design
- Responsive React Dashboard
- Email Integration
- RESTful APIs
- Layered Spring Boot Architecture

---

# Features

## Authentication & Authorization

- JWT Authentication
- Spring Security
- Secure REST APIs
- Role-Based Authorization
- BCrypt Password Encryption
- Protected Routes
- Multi-Tenant Authentication

---

## Organization Management

- Super Admin Dashboard
- Create Organizations
- Activate / Deactivate Organizations
- Organization Onboarding
- Organization-wise User Management

---

## User Management

- Create Users
- Update Users
- Activate / Deactivate Users
- User Profile Management
- Organization Specific Users

---

## Invoice Management

- Submit Invoice
- Invoice Status Tracking
- Invoice History
- Invoice Details
- Approval Workflow

---

## Reviewer Module

- Review Submitted Invoices
- Approve Invoice
- Reject Invoice
- Approval Timeline

---

## Finance Module

- Finance Dashboard
- Approved Invoices
- Process Payments
- Payment History
- Reports Dashboard

---

# User Roles

- Super Admin
- Organization Admin
- Vendor
- Reviewer
- Finance

---

# Invoice Workflow

```text
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

# Technology Stack

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT Authentication
- Maven
- PostgreSQL

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- Lucide React

## Database

- PostgreSQL

## DevOps

- Docker
- Docker Compose
- Multi-stage Docker Build
- Docker Networking
- Docker Volumes

## Tools

- IntelliJ IDEA
- VS Code
- Git
- GitHub
- Postman

---

# System Architecture

```text
                 React Frontend
                        │
                        ▼
                  REST APIs
                        │
                        ▼
                Spring Boot Backend
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
   Service Layer              Spring Security
          │
          ▼
   Repository Layer
          │
          ▼
      PostgreSQL
```

---
#  Entity Relationship Diagram (ERD)

The database follows a normalized relational design to support multi-tenant organizations, role-based access control, invoice approval workflows, and payment processing.

<img width="1303" height="896" alt="image" src="https://github.com/user-attachments/assets/f4b6d1af-71f7-4256-8754-a987602d58f1" />

---


# Docker Architecture

```text
                 Docker Compose
                       │
      ┌────────────────┼────────────────┐
      │                │                │
      ▼                ▼                ▼
 React Frontend   Spring Boot      PostgreSQL
     :3000           :8080             :5432
                          │
                          ▼
                     pgAdmin
                      :5050
```

# 🐳 Docker Deployment

The entire application is fully containerized using **Docker** and **Docker Compose**. The complete stack, including the frontend, backend, PostgreSQL database, and pgAdmin, can be started with a single command.

---

## Docker Services

| Service | Description | Port |
|----------|-------------|------|
| React Frontend | User Interface | 3000 |
| Spring Boot Backend | REST APIs | 8080 |
| PostgreSQL | Database | 5432 |
| pgAdmin | Database Management | 5050 |

---

## Run Using Docker

Clone the repository

```bash
git clone https://github.com/apurv99-cloud/invoice-approval-platform.git

cd invoice-approval-platform
```

Start the complete application

```bash
docker compose up --build
```

Run in detached mode

```bash
docker compose up -d
```

Stop the application

```bash
docker compose down
```

Rebuild containers

```bash
docker compose up --build
```

View logs

```bash
docker compose logs -f
```

View running containers

```bash
docker ps
```

---

#  Local Development

## Backend

```bash
cd Backend

mvn clean install

mvn spring-boot:run
```

---

## Frontend

```bash
cd Frontend

npm install

npm run dev
```

---

# ⚙ Environment Variables

## Backend (.env)

```properties
POSTGRES_DB=TF
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password

SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/TF
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your_password

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password

JWT_SECRET=your_secret_key

PGADMIN_DEFAULT_EMAIL=admin@gmail.com
PGADMIN_DEFAULT_PASSWORD=admin123
```

---

## Frontend (.env)

```properties
VITE_API_BASE_URL=http://localhost:8080/api
```


---

#  Database Highlights

- Fully Normalized Database Design (3NF)
- Multi-Tenant Architecture
- Organization Management
- Users & Roles
- Permissions
- Invoice Management
- Invoice Approval Workflow
- Payment Processing
- Notification Module
- Audit Ready Structure
- Soft Delete Support
- Foreign Key Constraints
- Enterprise Relationship Mapping

---

#  Security Features

- JWT Authentication
- Spring Security
- BCrypt Password Encryption
- Stateless Authentication
- Role-Based Access Control (RBAC)
- Organization Isolation
- Protected REST APIs
- CORS Configuration
- Secure Password Storage
- Authentication Filters
- Authorization Filters

---

#  Enterprise Features

- Multi-Tenant Organizations
- Layered Architecture
- RESTful APIs
- DTO-Based Communication
- Exception Handling
- Validation
- Email Notifications
- Payment Processing
- Organization Onboarding
- Modular Design
- Dockerized Deployment
- Production Ready Folder Structure

#  Application Screenshots

The following screenshots demonstrate the core modules and workflows of the Enterprise Invoice Approval Platform.

---

#  Landing Page

Modern and responsive landing page with authentication options for organizations and users.

<img width="1902" height="965" alt="Landing Page" src="https://github.com/user-attachments/assets/4efc05fa-7bb1-4ed8-98d1-f53f4a7b9752" />

---

#  Super Admin Dashboard

The Super Admin manages organizations, users, and monitors the overall platform.

<img width="1917" height="973" alt="Super Admin Dashboard" src="https://github.com/user-attachments/assets/9078dd11-916d-4df8-b7f2-323659f0b17e" />

---

#  Organization Onboarding

Secure onboarding process for newly created organizations.

<img width="1917" height="966" alt="Organization Onboarding" src="https://github.com/user-attachments/assets/222923f4-ca73-496b-9b46-aaee73d9c2ef" />

---

#  Organization Management

Create, activate, deactivate, and manage organizations from the Super Admin dashboard.

<img width="1917" height="978" alt="Organization Management" src="https://github.com/user-attachments/assets/cda3a6e6-99ce-44be-bc2c-38f124044783" />

---

#  User Management

Manage organization users, assign roles, activate/deactivate accounts, and update user information.

### User List

<img width="1896" height="967" alt="User List" src="https://github.com/user-attachments/assets/82258739-2a5f-4d6b-bc0d-ec49a7e76ed5" />

### Create / Update User

<img width="1915" height="970" alt="Create User" src="https://github.com/user-attachments/assets/b7bebdb3-54a2-4c0f-ba26-1f0eb174d461" />

---

#  Vendor Dashboard

The Vendor dashboard enables vendors to create and monitor invoices.

<img width="1917" height="972" alt="Vendor Dashboard" src="https://github.com/user-attachments/assets/b60c7e6b-8e13-4606-ae71-5fc0e3eb536e" />

---

## Create Invoice

<img width="1912" height="968" alt="Create Invoice" src="https://github.com/user-attachments/assets/4b6950d0-114a-4ba4-ba59-da513925f037" />

---

## Invoice History

<img width="1912" height="973" alt="Invoice History" src="https://github.com/user-attachments/assets/73ddb822-02ba-46b7-bf85-9486a2e047ad" />

---

#  Reviewer Dashboard

The Reviewer verifies submitted invoices and either approves or rejects them.

### Reviewer Dashboard

<img width="1600" height="805" alt="Reviewer Dashboard" src="https://github.com/user-attachments/assets/dd0615f1-c5fb-4436-911b-31f5869504e3" />

### Invoice Review

<img width="1600" height="810" alt="Invoice Review" src="https://github.com/user-attachments/assets/b79b5c61-790f-458e-8f9a-9a78614b3d18" />

---

#  Finance Dashboard

Finance users process approved invoices and manage payments.

### Finance Dashboard

<img width="1917" height="962" alt="Finance Dashboard" src="https://github.com/user-attachments/assets/9f8589ab-eeca-4615-90ef-77c5395d0c86" />

### Approved Invoices

<img width="1912" height="970" alt="Approved Invoices" src="https://github.com/user-attachments/assets/aa7dccae-a9c7-401c-a5a3-1a08a338c732" />

---

#  Payment Processing

Process payments for approved invoices.

### Payment Screen

<img width="1600" height="810" alt="Payment Processing" src="https://github.com/user-attachments/assets/3f9315dd-a6f0-4a47-a330-bec2124714b3" />

### Payment Completed

<img width="1905" height="961" alt="Payment Completed" src="https://github.com/user-attachments/assets/efaf4d38-fadb-40bc-b263-c38dd5a1cef4" />

---

# 📊 Reports & Analytics

Generate business reports and monitor invoice/payment statistics.

### Reports Dashboard

<img width="1917" height="975" alt="Reports Dashboard" src="https://github.com/user-attachments/assets/b176df31-c291-4410-b3e0-d3e71fe1c377" />

### Analytics

<img width="1917" height="967" alt="Analytics Dashboard" src="https://github.com/user-attachments/assets/2167a59c-f2da-4c25-b0d8-4eeebc8cd048" />

---

#  Key Workflows Covered

- Organization Onboarding
- User & Role Management
- Invoice Submission
- Invoice Review & Approval
- Payment Processing
- Reports & Analytics
- Multi-Tenant Organization Management
- JWT Authentication & Authorization
- Dockerized Full-Stack Deployment

---
# 🎓 Learning Outcomes

This project provided hands-on experience in building an enterprise-grade full-stack application and strengthened my understanding of modern software development practices.

### Backend

- Spring Boot Application Development
- Spring Security
- JWT Authentication & Authorization
- REST API Design
- Spring Data JPA & Hibernate
- Layered Architecture
- Exception Handling
- DTO-Based Communication
- Bean Validation
- Email Integration

---

### Frontend

- React Component Architecture
- React Router
- Context API
- Axios API Integration
- Tailwind CSS
- Responsive Dashboard Design
- Protected Routes
- Reusable Components

---

### Database

- PostgreSQL
- Database Normalization (3NF)
- Entity Relationships
- Foreign Keys
- Multi-Tenant Database Design
- Query Optimization

---

### DevOps

- Docker
- Docker Compose
- Multi-Container Applications
- Multi-Stage Docker Builds
- Container Networking
- Environment Variable Management

---

### Software Engineering

- Enterprise Application Architecture
- Role-Based Access Control (RBAC)
- Multi-Tenant Systems
- Invoice Approval Workflow Design
- Payment Processing Workflow
- Clean Code Principles
- Git & GitHub Workflow

---

#  Future Enhancements

The platform can be further enhanced with the following enterprise features:

- AI-Based Invoice Validation
- AI-Powered Fraud Detection
- OCR-Based Invoice Data Extraction
- Email & SMS Notifications
- Real-Time Notifications using WebSockets
- Audit Logging
- Invoice Attachments
- Payment Gateway Integration
- Advanced Analytics Dashboard
- Workflow Builder
- Kubernetes Deployment
- Microservices Architecture
- CI/CD Pipeline with GitHub Actions
- AWS Cloud Deployment
- Redis Caching
- Elasticsearch for Search
- Monitoring using Prometheus & Grafana

---

#  Contributing

Contributions are welcome!

If you would like to improve this project:

1. Fork the repository.
2. Create a new feature branch.

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push to your branch.

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request.

---

#  Author

## Apurv Sinha

**Full Stack Java Developer**

### Connect with me

- **GitHub**  
  https://github.com/apurv99-cloud

- **LinkedIn**  
  https://www.linkedin.com/in/apurva-sinha-b1b259306/

- **Portfolio**  
  https://portfolo-eta-six.vercel.app/

---

# 📄 License

This project is licensed under the **MIT License**.

See the **LICENSE** file for more information.

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates me to continue building more enterprise-grade applications.

---

## Thank You!

Thank you for visiting this repository.

Feel free to explore the code, raise issues, suggest improvements, or contribute to the project.

Happy Coding! 🚀

