# Canstar Power Tech - Industrial Generator & Engineering Platform

[![Node.js](https://img.shields.io/badge/Node.js-22+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC.svg)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black.svg)](https://vercel.com/)
[![Database](https://img.shields.io/badge/Database-Worldwide%20Real--Time%20Sync-emerald.svg)](/)

> **Official Authorized Dealer of TEKSAN GENERATOR (Turkey) in Bangladesh**  
> Complete full-stack web platform with real-time worldwide database synchronization, interactive admin CMS, live chat desk, quotation engine, and 1-click Vercel & GitHub deployment pipeline.

---

## ⚡ দ্রুত শুরু করার উপায় (Quick Start locally)

### ১. কম্পিউটারে যা লাগবে (Prerequisites)
- [Node.js 18+](https://nodejs.org/) ইনস্টল করা থাকতে হবে।
- [Git](https://git-scm.com/) ইনস্টল করা থাকতে হবে।

### ২. লোকাল মেশিনে রান করার ধাপ:
```bash
# ১. ডিপেন্ডেন্সি ইনস্টল করুন
npm install

# ২. ডেভেলপমেন্ট সার্ভার চালু করুন
npm run dev
```
ব্রাউজারে ভিজিট করুন: `http://localhost:3000`

---

## 🐙 ধাপ ১: কোড GitHub-এ আপলোড করার নিয়ম (Push to GitHub)

### পদ্ধতি ১: টার্মিনাল / Git Bash দিয়ে

১. [GitHub.com](https://github.com/)-এ যান এবং একটি **New Repository** তৈরি করুন (যেমন: `canstar-power-tech`)।  
২. আপনার প্রজেক্ট ফোল্ডারে টার্মিনাল খুলে নিচের কমান্ডগুলো রান করুন:

```bash
# গিট ইনিশিয়ালাইজ করুন
git init

# সব ফাইল যুক্ত করুন
git add .

# কমিট করুন
git commit -m "feat: complete canstar power tech with vercel and github support"

# মেইন ব্রাঞ্চ সেট করুন
git branch -M main

# আপনার গিটহাব রিপোজিটরির লিঙ্ক যুক্ত করুন (YOUR_USERNAME পরিবর্তন করুন)
git remote add origin https://github.com/YOUR_USERNAME/canstar-power-tech.git

# কোড গিটহাবে পুশ করুন
git push -u origin main
```

---

## ▲ ধাপ ২: Vercel-এ ১-ক্লিকে ডেপ্লয় করার নিয়ম (Deploy to Vercel)

এই প্রজেক্টে ইতিমধ্যে `vercel.json` এবং Serverless API রাউটিং কনফিগার করা আছে। Vercel-এ ডিপ্লয় করার জন্য:

### পদ্ধতি ১: Vercel ওয়েবসাইটের মাধ্যমে (সবচেয়ে সহজ ও জনপ্রিয়)

1. [Vercel.com](https://vercel.com/)-এ লগইন করুন (GitHub অ্যাকাউন্ট দিয়ে লগইন করুন)।
2. ড্যাশবোর্ডে গিয়ে **"Add New..."** → **"Project"** বাটনে ক্লিক করুন।
3. আপনার গিটহাব রিপোজিটরি (`canstar-power-tech`) সিলেক্ট করে **"Import"**-এ ক্লিক করুন।
4. **Project Settings** অটোমেটিক ডিটেক্ট হবে (`vercel.json` থাকার কারণে কোনো সেটিংস পরিবর্তন করতে হবে না):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **"Deploy"** বাটনে ক্লিক করুন!  
   👉 মাত্র ১-২ মিনিটের মধ্যে আপনার ওয়েবসাইট লাইভ হয়ে যাবে এবং একটি ফ্রি `https://your-project.vercel.app` ডোমেইন পাবেন।

### পদ্ধতি ২: Vercel CLI দিয়ে সরাসরি টার্মিনাল থেকে

```bash
# Vercel CLI ইনস্টল করুন (যদি না থাকে)
npm install -g vercel

# ডেপ্লয় রান করুন
vercel

# প্রোডাকশন ডেপ্লয়মেন্ট
vercel --prod
```

---

## 🌍 Worldwide Real-Time Database Synchronization (লাইভ ডাটাবেস সিঙ্ক)

This platform features a **Real-Time Global Database Synchronization Engine**:
- **Instant Global Propagation**: Any change made in the Admin Panel (products, specifications, contact details, hero banners, client list) is saved atomically to the central database and immediately broadcasted worldwide via **Server-Sent Events (SSE)**.
- **Zero-Refresh Updates**: Visitors anywhere in the world (Dhaka, London, New York, Tokyo) see the updated content instantly without needing to reload the webpage.
- **Dual-Layer Reliability**: Combines sub-second Server-Sent Events (SSE) push with an intelligent 5-second polling fallback for intermittent or restrictive network environments.
- **Vercel Serverless Ready**: In Vercel serverless mode, filesystem and in-memory caches ensure API endpoints (`/api/content`, `/api/health`, `/api/quotes`, `/api/chat/messages`) work seamlessly.

---

## 🔐 অ্যাডমিন প্যানেল লগইন (Admin Credentials)

- **অ্যাডমিন ইউআরএল**: `http://localhost:3000/admin` (অথবা আপনার Vercel লাইভ লিঙ্কের শেষে `/admin`, যেমন `https://your-site.vercel.app/admin`)
- **ইমেইল**: `admin@canstarpowertech.com`
- **পাসওয়ার্ড**: `Admin@2244@`

### অ্যাডমিন প্যানেলের সুবিধাসমূহ:
- 📝 **রিয়েল-টাইম কন্টেন্ট ম্যানেজার**: হোমপেজ ব্যানার, টাইটেল, যোগাযোগ নম্বর, এমডি ও সিইও বক্তব্য সরাসরি এডিট করুন।
- ⚡ **জেনারেটর ক্যাটালগ**: 10 kVA থেকে 3500 kVA জেনারেটরের স্পেসিফিকেশন, ইমেজ, ইঞ্জিন ব্র্যান্ড (Perkins, Cummins, Hyundai) পরিচালনা করুন।
- 🏢 **প্রকল্প ও ক্লায়েন্ট পোর্টফোলিও**: বাংলাদেশের বিভিন্ন ইন্ডাস্ট্রিতে চলমান ও সমাপ্ত প্রজেক্ট যুক্ত করুন।
- 📨 **কোটেশন রিকোয়েস্ট (RFQ)**: ক্রেতাদের পাঠানো কোটেশন আবেদন সরাসরি অ্যাডমিনে দেখুন।
- 💬 **লাইভ চ্যাট ডেস্ক**: ভিজিটরদের সাথে সরাসরি চ্যাট করুন।
- 📊 **মার্কেটিং ও পিক্সেল**: Facebook Meta Pixel, CAPI, Pathao Courier এপিআই ইন্টিগ্রেশন।

---

## ☁️ বিকল্প হোস্টিং অপশন (Alternative Hosting Options)

### Option 1: Render.com (Full-stack Node Server)
1. Go to [Render Dashboard](https://dashboard.render.com/) → **New + Web Service**.
2. Connect your GitHub repository.
3. Build Command: `npm run build`, Start Command: `npm start`.
4. Deploy!

### Option 2: Railway.app
1. Go to [Railway.app](https://railway.app/) → **New Project** → **Deploy from GitHub repo**.
2. Railway auto-detects `Dockerfile` or `package.json`.
3. Deploy!

### Option 3: VPS / Ubuntu Server (PM2)
```bash
npm run build
npm install -g pm2
pm2 start dist/server.cjs --name "canstar-power-tech"
pm2 save
pm2 startup
```

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion animations
- **Backend**: Node.js, Express, tsx, esbuild
- **Serverless API**: Vercel Serverless Function `/api/index.ts`
- **Database Engine**: Persistent JSON File Store (`data/database.json`) with in-memory caching
- **Real-Time Protocol**: Server-Sent Events (SSE) `/api/sync/stream` with dynamic fallback polling `/api/sync/check`
- **Build System**: Vite 6 for client bundling + esbuild for standalone Node CJS bundle (`dist/server.cjs`)

---

## 📄 License
Commercial license for Canstar Power Tech Bangladesh. All rights reserved.
