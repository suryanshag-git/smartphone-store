# Slate — Smartphone Store on Mutual Fund Credit

> **Purchase flagship smartphones using mutual fund-backed EMI financing plans with 0% portfolio liquidation.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=flat-square&logo=supabase)](https://supabase.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)](https://vercel.com/)

---

## 📖 Overview

**Slate** is a modern fintech web application that allows users to buy flagship smartphones on low-cost monthly EMI plans backed by their mutual fund portfolio.

Instead of selling mutual funds or breaking SIPs, users pledge their mutual fund units as collateral. 100% of their investment portfolio remains untouched and continues to earn market returns while they pay easy monthly installments.

### 🎨 Design Highlights
- **Pearl Palette**: Warm pearl canvas (`#FAF8F5`), pure white cards, and subtle borders.
- **Playfair Display**: Elegant editorial typography for headers and pricing.
- **Theme Switcher**: Instant Pearl Light & Dark mode toggle.
- **Decluttered UI**: Clean layout showing only what buyers need to see.

---

## ⚡ Quick Start

```bash
# 1. Clone & install dependencies
git clone <repository-url>
cd smartphone-store
npm install

# 2. Seed database (SQLite dev.db)
npx prisma db push
npx prisma db seed

# 3. Start development server
npm run dev
```

Open **`http://localhost:3000`** in your browser.

---

## 🗺 Simplified System Overview

```mermaid
graph LR
    User[Buyer / Browser] --> Frontend[Slate Next.js App]
    Frontend --> APIs[REST API Tier]
    APIs --> DB[(Database: Supabase / SQLite)]
    DB -->|Real-Time WebSockets| User
```

---

## 🔄 Simplified Order & Tracking Flow

```mermaid
sequenceDiagram
    participant User as Buyer
    participant Slate as Slate App
    participant DB as Supabase / DB

    User->>Slate: Pick Smartphone & EMI Plan (3-60 Mo)
    User->>Slate: Enter Address & Verify MF Folio
    Slate->>DB: Save Order (Status: MF_PLEDGED)
    DB-->>User: Real-Time Status Updates (APPROVED -> DISPATCHED)
```

---

## 🛠 Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) | Server-side rendering, REST route handlers, Turbopack |
| **Language** | TypeScript | Type safety across API routes and components |
| **Styling** | Tailwind CSS | Pearl design system & theme variables |
| **Fonts** | Playfair Display & Plus Jakarta Sans | Editorial serif headers & clean sans-serif body |
| **Database** | Supabase PostgreSQL & SQLite | Dual database support via Prisma ORM |
| **Realtime** | `@supabase/supabase-js` | Live WebSockets order status tracking |

---

## 🗄 Database Schema Overview

```mermaid
erDiagram
    Product ||--|{ ProductVariant : "has variants"
    Product ||--|{ EMIPlan : "has plans"
    Product ||--|{ Order : "purchased in"

    Product {
        string name
        string brand
        int basePrice
        string specs
    }

    ProductVariant {
        string color
        string storage
        int price
        string image
    }

    EMIPlan {
        int tenureMonths
        float annualInterestRate
        boolean isZeroPercent
    }

    Order {
        string orderNumber
        int totalAmount
        int emiMonthlyAmount
        string status
    }
```

---

## 🔌 API Endpoints Summary

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/products` | `GET` | Catalog filter (brand, budget slider, 0% interest, sorting) |
| `/api/products/[slug]` | `GET` | Single product details, color variants, and EMI plans |
| `/api/emi/calculate` | `POST` | Calculates monthly installments, cashback, and MF growth |
| `/api/mf-portfolio` | `GET` | Queries user mutual fund holdings & credit limit |
| `/api/orders` | `POST` | Places new order & registers mutual fund pledge |
| `/api/orders/[id]` | `GET` | Fetches order fulfillment status for tracking |

---

## 🌐 Vercel Deployment Guide

Deploying **Slate** to Vercel takes less than 2 minutes:

### 1. Push Code to GitHub
Make sure your latest code is committed and pushed to GitHub:
```bash
git add .
git commit -m "feat: prepare for vercel deployment"
git push origin main
```

### 2. Import Project in Vercel
1. Log in to [Vercel Dashboard](https://vercel.com/new) and click **Add New...** -> **Project**.
2. Connect your GitHub account and import your repository.
3. Vercel automatically detects **Next.js** framework settings.

### 3. Add Environment Variables
Under the **Environment Variables** section, add your production variables:

| Variable Name | Description | Example Value |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Cloud Project URL | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anonymous Key | `eyJhbGciOiJIUzI1...` |
| `DATABASE_URL` | Supabase PostgreSQL Connection String | `postgres://postgres:pass@db.xxx.supabase.co:6543/postgres` |

### 4. Deploy!
Click **Deploy**. Vercel will build your Next.js application and generate your live production URL (e.g. `https://slate-smartphone-store.vercel.app`).

---

## 📄 License

Distributed under the **MIT License**.
