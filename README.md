#   Enterprise Invoice Management System

A Full Stack Multi-Tenant SaaS-Based Invoice Management Platform built using **Spring Boot, PostgreSQL, JWT Authentication, React, Vite, and Role-Based Access Control (RBAC).**

The platform enables multiple organizations (tenants) to operate independently within the same application while maintaining complete data isolation, secure authentication, enterprise-grade onboarding, and configurable approval workflows.

---

#   Project Overview

This project simulates a real-world enterprise invoice processing system where:

* Super Admin manages organizations.
* Organizations onboard through secure invitation links.
* Organization Admins manage users inside their workspace.
* Role-based access controls determine permissions.
* Invoice approval workflows can be configured dynamically.
* Secure JWT authentication protects all resources.

---

#   Multi-Tenant Architecture

The application follows a:

### Shared Database + Shared Schema Multi-Tenant Architecture

Each organization acts as an independent tenant.

### Features

* Organization Isolation
* Tenant-Specific Users
* Tenant-Specific Roles
* Tenant-Specific Permissions
* Secure Access Control
* Organization-Based Data Ownership

---

#   Frontend Architecture

Built using:

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* Lucide React Icons

### Frontend Modules

```text
Landing Page
Authentication
Super Admin Dashboard
Organization Management
Organization Onboarding
Protected Routes
Role-Based Navigation
```

### Current UI Features

* SaaS Landing Page
* Enterprise Login System
* Organization Management Dashboard
* Organization Onboarding Form
* Responsive Mobile Navigation
* Protected Routes
* JWT Session Handling

---

#   Authentication & Authorization

Implemented using:

* Spring Security
* JWT Authentication
* Role-Based Access Control (RBAC)

### Roles

| Role        | Responsibility                    |
| ----------- | --------------------------------- |
| SUPER_ADMIN | Creates and manages organizations |
| ORG_ADMIN   | Manages users inside organization |
| REVIEWER    | Reviews invoices                  |
| FINANCE     | Finance approval                  |
| DIRECTOR    | Director level approval           |
| CFO         | Final approval authority          |

---

#   Organization Onboarding Flow

### Step 1

Super Admin logs in

### Step 2

Super Admin creates organization

### Step 3

System generates secure onboarding token

### Step 4

Invitation email sent to organization's contact person

### Step 5

Organization Admin completes onboarding

### Step 6

Organization workspace activated

### Step 7

Organization Admin manages users

---

#   Features Implemented

## Authentication

* JWT Login
* Current User API
* Protected Routes
* Session Persistence
* Role Validation

## Organization Management

* Create Organization
* Update Organization
* Activate Organization
* Deactivate Organization
* Get Organization Details
* List Organizations

## Organization Onboarding

* Email Based Onboarding
* Secure Token Generation
* Token Validation
* Onboarding Completion
* Organization Activation

## User Management

* Create Users
* Update Users
* Activate Users
* Deactivate Users
* Get Users
* Organization-Specific User Management

## Security

* JWT Authentication
* Spring Security Integration
* RBAC Authorization
* Protected APIs
* Organization Context Validation

---

#   Tech Stack

## Backend

* Java 21
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate

## Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* Lucide React

## Database

* PostgreSQL

## Authentication

* JWT

## Email Service

* Spring Mail Sender

## Build Tools

### Backend

* Maven

### Frontend

* Node.js
* npm

## API Testing

* Postman

---

#   Database Design

### Current Tables

```text
organizations
users
roles
users_roles
permissions
role_permissions
organization_onboarding_tokens
```

### Upcoming Tables

```text
invoices
invoice_approvals
workflow_master
workflow_rules
workflow_steps
payments
notifications
audit_logs
```

---

#   Application Flow

## Super Admin

```text
Login
   ↓
Dashboard
   ↓
Create Organization
   ↓
Send Onboarding Email
```

## Organization

```text
Receive Email
   ↓
Complete Onboarding
   ↓
Create Password
   ↓
Workspace Activated
```

## Organization Admin

```text
Login
   ↓
Manage Organization Users
   ↓
Create Reviewers
Create Finance Users
Create Directors
Create CFO Users
```

---

#   Security Highlights

* Stateless Authentication
* JWT-Based Authorization
* Role Validation
* Tenant Isolation
* Protected Endpoints
* Secure Password Encryption
* Organization Access Restrictions

---

#   Project Structure

```text
enterprise-invoice-management-system

├── backend
│   ├── controllers
│   ├── services
│   ├── repositories
│   ├── entities
│   ├── security
│   └── dto
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   ├── routes
│   ├── context
│   └── assets
│
└── database
```

---

#   Future Enhancements

## Invoice Module

* Invoice Submission
* Invoice Attachments
* Invoice Tracking
* Invoice History

## Workflow Engine

* Dynamic Workflow Rules
* Amount-Based Routing
* Multi-Level Approvals
* Escalation Management

## Analytics

* Organization Dashboard
* Invoice Analytics
* Approval Metrics
* KPI Tracking

## Notifications

* Email Notifications
* Approval Alerts
* Reminder System
* Activity Feed

## Audit & Monitoring

* Audit Logs
* User Activity Tracking
* Security Monitoring
* Organization Reports

---

#   System Architecture

```text
SUPER ADMIN
      │
      ▼
Create Organization
      │
      ▼
Onboarding Email
      │
      ▼
Organization Admin
      │
      ▼
Create Users
      │
      ▼
Reviewer → Finance → Director → CFO
      │
      ▼
Invoice Approval Workflow
```

---

#   Learning Outcomes

Through this project:

* Multi-Tenant SaaS Architecture
* Enterprise RBAC Design
* Spring Security
* JWT Authentication
* React Frontend Development
* Protected Routing
* Organization-Based Access Control
* Database Design & Normalization
* Secure API Development
* Enterprise Workflow Design

---

#   Author

### Apurv Sinha

B.Tech Computer Science & Applied Mathematics

Java Backend Developer | Spring Boot | PostgreSQL | React

GitHub: https://github.com/apurv99-cloud

---

⭐ If you found this project useful, consider giving it a star.
