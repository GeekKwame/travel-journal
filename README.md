# The Tourist's Planner - AI-Powered Travel Planner

The Tourist's Planner is a modern, full-stack travel application that combines the power of AI with a seamless booking experience. It serves both tourists, who can generate personalized itineraries and book trips, and administrators, who can curate and manage travel packages.

## 🌟 Features

### For Tourists
- **AI Trip Planner**: Generate personalized travel itineraries in seconds using Google's Gemini AI. Simply enter your destination, budget, and interests.
- **My Trips Dashboard**: View and manage all your generated and booked trips in one place.
- **Detailed Itineraries**: Access day-by-day plans, weather forecasts, and best times to visit.
- **Secure Booking**: Integrated payment processing for booking trips.

### For Admins
- **Dashboard**: Overview of user activity and trip statistics.
- **Trip Management**: Create, edit, and delete curated trips.
- **User Management**: View and manage user accounts.

## 🛠️ Tech Stack

- **Framework**: [React Router v7](https://reactrouter.com/) (formerly Remix/React Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Syncfusion Components
- **Database & Auth**: [Supabase](https://supabase.com/)
- **AI**: Google Gemini API (`gemini-2.0-flash`)
- **Payments**: Stripe (Integration ready)
- **Deployment**: Node.js adapter

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- A Supabase project
- Google Gemini API Key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/GeekKwame/travel-dashboard.git
   cd travel-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory (refer to `.env.example` if available) and add:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   UNSPLASH_ACCESS_KEY=your_unsplash_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   Open http://localhost:5173 to view it in the browser.

## 📂 Project Structure

- `app/routes/`: Agile route configuration.
  - `admin/`: Admin-specific routes (Dashboard, Create Trip).
  - `root/`: Public and tourist-facing routes (Home, Travel Details, My Trips).
  - `api/`: Server-side API endpoints (e.g., trip generation).
- `app/components/`: Reusable UI components.
- `app/lib/`: Utility functions and database clients.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

