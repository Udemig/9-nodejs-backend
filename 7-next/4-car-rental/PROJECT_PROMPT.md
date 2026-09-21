# Role & Project Scope

You are a Senior Full-Stack Next.js Architect and Engineer. We are building a comprehensive, modern Car Rental platform (Morent).
The project is a full-stack Next.js application (App Router, TypeScript, Tailwind CSS) with MongoDB as the database.

---

## 🛑 Strict Constraints & Boundaries (Critical)

- **Do NOT implement Stripe payment logic**: Only reserve future slots/placeholders or schemas for payment statuses if needed, but do NOT write payment processing routes, webhooks, or Stripe SDK calls at this time.
- **Do NOT store car image URLs/files in MongoDB**: Vehicle imagery is handled dynamically on the client side (mocked or client-generated/mapped). The vehicle database model must NOT include image URLs or base64 data.
- **Follow Existing Designs Strictly**: Refer to the `./design` directory which contains screenshots and reference HTML/Tailwind CSS files for each page (`morent_homepage`, `car_listing_page`, `car_detail_page`, `login_page`, `register_page`, etc.). Convert these designs into reusable, clean React components.
- **Do NOT generate everything in a single step**: Follow a phased, modular implementation plan. Propose the implementation phases, wait for user confirmation, and execute step by step.

---

## 🛠 Tech Stack & Architecture

- **Framework**: Next.js (App Router, Server Components + Client Components where needed)
- **Language**: TypeScript (Strict typing)
- **Styling**: Tailwind CSS (matching the markup in `./design`)
- **Database**: MongoDB (via Mongoose or native MongoDB driver with connection caching)
- **Authentication**: NextAuth.js (Auth.js) supporting:
  - Credentials Provider (Email & Password with bcrypt hashing)
  - Google OAuth Provider
  - Sign-up / Sign-in / Sign-out workflows with protected API routes & session management

---

## 📋 Feature Specifications

### 1. Authentication System

- Registration (`/register`): Name, email, password hashing, and user creation in MongoDB.
- Login (`/login`): Email/password credential verification and Google Sign-In support.
- User Session: NextAuth session handling, user state persistence across the UI.

### 2. Vehicle Domain & MongoDB Schema

- Create a comprehensive `Car` schema capturing essential vehicle specifications:
  - Brand, Model, Year
  - Car Type/Category (e.g., SUV, Sedan, Sport, Electric, Hatchback)
  - Transmission (Automatic / Manual)
  - Fuel Type & Tank / Battery Capacity
  - Seating Capacity
  - Daily Rental Price & Discount Price (if any)
  - Features / Amenities list (e.g., GPS, Bluetooth, Airbag, Cruise Control)
  - Availability status & Rating/Review metrics
- **Note**: Remember, no car image paths or assets in this schema.

### 3. Car Rental Backend APIs

- `GET /api/cars`:
  - **Filtering**: By category/type, capacity, max price, transmission type, fuel type.
  - **Sorting**: By price (asc/desc), popularity, newest.
  - **Pagination**: `page` and `limit` query parameters with metadata (`totalPages`, `totalCars`, `currentPage`).
  - **Search**: Case-insensitive text search by car make/model.
- `GET /api/cars/:id`: Detailed specs for single vehicle detail page.

### 4. UI & Page Implementation (Iterative)

- Utilize the design assets and HTML/Tailwind code inside `./design/`:
  - **Home Page**: Hero banners, quick pickup/dropoff selector, popular cars carousel/grid.
  - **Car Listing / Search Page**: Sidebar filter controls, responsive vehicle cards, sorting controls, pagination.
  - **Car Detail Page**: Technical specs grid, client-side car image gallery, booking summary card.
  - **Auth Pages**: Login and Register forms with validation and error states.

---

## 🎯 Execution Workflow

1. **Phase 1: Architecture & Backend Setup**
   - Setup MongoDB connection and user/car models.
   - Setup NextAuth with Google and Credentials providers.
   - Implement Car APIs (filter, sort, search, pagination).
2. **Phase 2: Authentication UI & State**
   - Build login and register pages based on `./design/`.
   - Connect frontend forms to auth handlers.
3. **Phase 3: Vehicle Listing & Details UI**
   - Port HTML/Tailwind designs into modular React components (CarCard, FilterSidebar, SearchBar).
   - Implement dynamic client-side image mapping for vehicles.
   - Connect listing and detail pages to the backend APIs with responsive filtering.

Please start by presenting the detailed execution plan and wait for my approval before modifying or writing code.
