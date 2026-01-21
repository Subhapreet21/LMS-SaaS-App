# LMS SaaS App - AI-Powered Learning Companion Platform

An innovative Learning Management System (LMS) SaaS application that leverages AI to create personalized, interactive learning companions. Users can create, customize, and interact with AI tutors across various subjects, tracking their learning journey through a unified dashboard.

## 🚀 Overview

This project is a modern Full Stack web application built with Next.js 15, designed to provide an engaging learning experience through AI "Companions". It features voice-enabled interactions (powered by Vapi.ai), user tracking, and a subscription-based model for premium features.

## ✨ Features

- **🤖 AI Companions**: Create and customize AI tutors with specific names, subjects, and topics.
- **🎙️ Voice & Text Interaction**: Real-time interactive sessions with companions using Vapi.ai SDK.
- **📊 My Journey Dashboard**: 
  - Track completed lessons and session history.
  - View stats on created companions.
  - Access bookmarked companions.
- **🔐 Secure Authentication**: RobuMicrosoft.QuickAction.MobileHotspotst user management via [Clerk](https://clerk.com/).
- **🗄️ Database & Real-time**: Powered by [Supabase](https://supabase.com/) for data storage and management.
- **💳 Subscription System**: Integration for multiple tiers (Free/Pro) limiting companion creation counts.
- **🎨 Modern UI**: Built with Tailwind CSS v4 and Radix UI for a responsive, accessible interface.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI/Voice Provider**: [Vapi.ai](https://vapi.ai/)
- **Forms**: React Hook Form + Zod
- **Monitoring**: Sentry

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Vapi AI (Voice)
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_web_token
```

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lms_saas_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and fill in the keys as shown above.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open the app**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

- `npm run dev`: Starts the development server using Turbopack.
- `npm run build`: Builds the application for production.
- `npm start`: Runs the built production application.
- `npm run lint`: Runs ESLint to check for code quality issues.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
