# 🏛️ Permits Platform

**Streamlining permit applications and approvals for modern government services**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)](https://supabase.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🌐 Live Demo

[**View Live Demo**](https://your-demo-url.vercel.app) _(Coming Soon)_

---

## 📑 Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## 📖 Introduction

**Permits Platform** is a modern, full-stack web application designed to digitize and streamline the permit application process for government services. The platform eliminates the traditional paper-based bureaucracy by providing an intuitive digital solution for both citizens and government officers.

### The Problem We Solve

Traditional permit applications involve:

- ❌ Manual paperwork and long queues
- ❌ Unclear application status
- ❌ Delayed processing times
- ❌ Inefficient communication between applicants and officers
- ❌ Lost or misplaced documents

### Our Solution

Permits Platform provides:

- ✅ 24/7 online permit applications
- ✅ Real-time application tracking
- ✅ Automated workflow management
- ✅ Secure document storage and management
- ✅ Integrated payment processing
- ✅ Transparent review and approval process

---

## ✨ Key Features

### For Applicants

- 🔐 **Secure Authentication** - User registration and login with role-based access control
- 📋 **Application Dashboard** - View application history and track status in real-time
- 📝 **Multi-Step Application Forms** - Intuitive wizard-style forms for various permit types
- 📎 **Document Upload** - Secure upload and management of supporting documents
- 💳 **Integrated Payments** - Pay for approved permits directly through the platform
- 🔔 **Real-time Notifications** - Get instant updates on application status changes
- 📊 **Application Timeline** - Visual tracking of application progress

### For Officers

- 🎯 **Officer Dashboard** - Centralized view of pending applications and workload
- 🔍 **Application Review** - Detailed review interface with document preview
- ✅ **Approval Workflow** - Approve or reject applications with comments
- 📈 **Statistics & Analytics** - Track processing metrics and performance
- 🔎 **Advanced Filtering** - Sort and filter applications by status, type, and date
- 💬 **Communication Tools** - Add comments and request additional information

### General Features

- 🎨 **Modern UI/UX** - Clean, responsive design with Tailwind CSS and Shadcn UI
- 🚀 **Fast Performance** - Optimized with Next.js App Router and React Server Components
- 🔒 **Data Security** - Secure data storage with PostgreSQL and Supabase
- 📱 **Mobile Responsive** - Works seamlessly on all devices

---

## 🛠️ Technology Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn UI](https://ui.shadcn.com/)** - Beautiful, accessible component library
- **React Hooks & Context** - State management

### Backend

- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless API endpoints
- **[Prisma ORM](https://www.prisma.io/)** - Type-safe database client
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database
- **[Supabase](https://supabase.com/)** - Database hosting and authentication

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** or **pnpm** - Package manager
- **PostgreSQL** (or a Supabase account) - [Supabase](https://supabase.com/)
- **Git** - Version control

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/njoroofficial/Permits-Check-Platform.git
cd permits-platform
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/permits_db?schema=public"
DIRECT_URL="postgresql://user:password@localhost:5432/permits_db?schema=public"

# Supabase (if using Supabase)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-project-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-generate-with-openssl"

# Application Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: File Upload (if using external storage)
NEXT_PUBLIC_UPLOAD_MAX_SIZE="10485760" # 10MB in bytes
```

**Generate NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

### Database Setup

1. **Generate Prisma Client**

```bash
npx prisma generate
```

2. **Run database migrations**

```bash
npx prisma migrate dev
```

3. **Seed the database (optional)**

```bash
npx prisma db seed
```

This will create sample users, permit types, and applications for testing.

### Running the Application

1. **Start the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

2. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

3. **Test Accounts (if database was seeded)**

**Applicant Account:**

- Email: `applicant@example.com`
- Password: `password123`

**Officer Account:**

- Email: `officer@example.com`
- Password: `password123`

---

## 📁 Project Structure

```
permits-platform/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes (login, signup)
│   │   ├── login/
│   │   └── signup/
│   ├── (authenticated)/          # Protected routes
│   │   ├── dashboard/            # Applicant dashboard
│   │   ├── officer-dashboard/    # Officer dashboard
│   │   ├── applications/         # Application management
│   │   ├── apply/                # Application submission
│   │   └── payment/              # Payment processing
│   ├── actions/                  # Server actions
│   │   ├── application.ts        # Application CRUD operations
│   │   └── auth.ts               # Authentication logic
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── application/              # Application-related components
│   ├── auth/                     # Authentication forms
│   ├── dashboard/                # Dashboard widgets
│   ├── officer/                  # Officer-specific components
│   ├── payment/                  # Payment components
│   └── ui/                       # Shadcn UI components
│
├── lib/                          # Utility functions and configurations
│   ├── dal.ts                    # Data Access Layer
│   ├── data.ts                   # Data fetching utilities
│   ├── db.ts                     # Prisma client instance
│   ├── utils.ts                  # Helper functions
│   └── supabase/                 # Supabase client configuration
│       ├── client.ts             # Client-side Supabase
│       └── server.ts             # Server-side Supabase
│
├── prisma/                       # Database schema and migrations
│   ├── schema.prisma             # Prisma schema definition
│   ├── seed.ts                   # Database seeding script
│   └── migrations/               # Migration files
│
├── types/                        # TypeScript type definitions
│   ├── application.ts
│   ├── user.ts
│   ├── payment.ts
│   └── permit.ts
│
├── public/                       # Static assets
│   └── assets/                   # Images, logos, etc.
│
├── .env.local                    # Environment variables (not in git)
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── package.json                  # Dependencies and scripts
```

### Key Directories Explained

- **`/app`** - Contains all routes and pages using Next.js App Router. Organized by route groups for authentication and protected routes.
- **`/components`** - Reusable React components organized by feature (application, auth, dashboard, etc.).
- **`/lib`** - Core utilities including database client, data access layer, and helper functions.
- **`/prisma`** - Database schema, migrations, and seeding scripts for PostgreSQL.
- **`/types`** - TypeScript type definitions for type safety across the application.

---

## 💡 Usage

### For Applicants

1. **Sign Up** - Create an account using your email
2. **Login** - Access your dashboard
3. **Apply for Permit** - Select permit type and fill out the application form
4. **Upload Documents** - Attach required supporting documents
5. **Submit Application** - Review and submit your application
6. **Track Status** - Monitor your application progress in real-time
7. **Make Payment** - Pay for approved permits through the integrated payment system

### For Officers

1. **Login** - Access the officer dashboard with officer credentials
2. **Review Applications** - View pending applications and their details
3. **Review Documents** - Examine uploaded documents
4. **Approve/Reject** - Make decisions on applications with comments
5. **Monitor Workload** - Track processing statistics and performance metrics

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[Next.js Team](https://nextjs.org/)** - For the amazing React framework
- **[Vercel](https://vercel.com/)** - For hosting and deployment platform
- **[Shadcn](https://ui.shadcn.com/)** - For the beautiful UI component library
- **[Prisma](https://www.prisma.io/)** - For the excellent ORM
- **[Supabase](https://supabase.com/)** - For database hosting and authentication services
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework

---

## 📞 Contact & Support

- **Repository:** [GitHub](https://github.com/njoroofficial/Permits-Check-Platform)
- **Issues:** [Report a Bug](https://github.com/njoroofficial/Permits-Check-Platform/issues)
- **Discussions:** [Join the Discussion](https://github.com/njoroofficial/Permits-Check-Platform/discussions)

---

**Built with ❤️ for better government services**
