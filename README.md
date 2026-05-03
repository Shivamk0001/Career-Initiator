# Career Initiator Platform

Production-ready full-stack student guidance platform.

## Stack
- Frontend: Next.js App Router + Tailwind CSS + Framer Motion
- Backend: Node.js + Express
- Database: MongoDB Atlas (Mongoose)
- Auth: JWT + bcrypt

## Project Structure
- `client` - public website + user dashboard + admin panel UI
- `server` - REST APIs + auth + role-based access + content CRUD

## Setup
1. Copy `server/.env.example` to `server/.env` and fill values.
2. Copy `client/.env.local.example` to `client/.env.local`.
3. Install dependencies:
   - `cd server && npm install`
   - `cd ../client && npm install`
4. Run backend:
   - `cd server && npm run dev`
5. Run frontend:
   - `cd client && npm run dev`

## Key Routes
- Frontend: `/`, `/colleges`, `/courses`, `/exams`, `/careers`, `/latest-updates`, `/login`, `/signup`, `/dashboard`, `/admin`, `/about`, `/contact`
- API: `/api/auth`, `/api/users`, `/api/admin`, `/api/{colleges|courses|exams|careers|blogs}`

## Deployment
- Frontend: Vercel (set `NEXT_PUBLIC_API_URL`)
- Backend: Render/Railway (set env vars from `.env.example`)
- Database: MongoDB Atlas
