# Flipkart-Inspired Full-Stack E-Commerce Platform

A feature-rich, full-stack E-Commerce application inspired by **Flipkart**. Built with a **Django REST Framework** backend and a responsive **React + TypeScript + Vite + Tailwind CSS** frontend.

---

## 🚀 Features

### 🛒 Customer Experience
- **Interactive Homepage & Hero Banners**: Dynamic promo banners, deal tickers, and quick category highlights.
- **Product Catalog & Search**: Advanced filtering by category, price range, brand, and customer ratings, alongside real-time search and sorting (Price Low-to-High, High-to-Low, Rating, Newest).
- **Product Detail View**: Multi-image preview gallery, dynamic price discount calculation, technical specifications breakdown, stock status, and customer reviews.
- **Cart & Wishlist Management**: Seamless cart updating with real-time MRP, discount, delivery fee calculation, guest cart support, and single-click wishlist toggling.
- **Multi-Step Checkout & Orders**: Streamlined checkout process with multi-address management, payment mode selection (UPI, Cards, NetBanking, COD), order summary review, confirmation, and order history tracking.

### 🔐 Auth & State Management
- **Authentication**: JWT (JSON Web Token) authentication using `djangorestframework-simplejwt` with login, register, and token refresh.
- **Persistent State**: Seamless local cart and user context synchronization.

### 🛠️ Developer Tooling & Seeding
- **Automated Database Seeder**: Built-in Django command (`python manage.py seed_db`) to populate realistic categories, products, images, and reviews.

---

## 🛠️ Tech Stack

### **Backend**
- **Framework**: [Django 5.0](https://www.djangoproject.com/) & [Django REST Framework](https://www.django-rest-framework.org/)
- **Authentication**: JWT (`djangorestframework-simplejwt`)
- **Database**: SQLite (Development)
- **CORS & Utility**: `django-cors-headers`, `python-dotenv`, `Pillow`

### **Frontend**
- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)

---

## 📁 Project Structure

```text
FullStack Project/
├── backend/
│   ├── api/
│   │   ├── management/commands/
│   │   │   └── seed_db.py       # Custom DB seed script
│   │   ├── admin.py             # Django admin configuration
│   │   ├── models.py            # Models: Category, Product, Cart, Order, Wishlist, Review
│   │   ├── serializers.py       # DRF Serializers
│   │   ├── urls.py              # API Endpoint Routes
│   │   └── views.py             # API Controllers & Business Logic
│   ├── ecom_project/            # Django Core Project Settings & Config
│   ├── manage.py                # Django CLI entrypoint
│   ├── requirements.txt         # Python Dependencies
│   ├── .env.example             # Backend Environment Template
│   └── db.sqlite3               # SQLite Database
│
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI Components (Navbar, ProductCard, Modals, etc.)
│   │   ├── context/             # React Context (AuthContext, CartContext)
│   │   ├── pages/               # Page Views (Home, Catalog, ProductDetail, Cart, Checkout, etc.)
│   │   ├── services/            # API Integration Services (Axios configuration)
│   │   ├── types/               # TypeScript Interfaces & Types
│   │   ├── App.tsx              # Main Application Component & Router
│   │   └── main.tsx             # React Application Entrypoint
│   ├── package.json             # Frontend Dependencies & Scripts
│   ├── tailwind.config.js       # Tailwind CSS Configuration
│   ├── vite.config.ts           # Vite Configuration
│   └── tsconfig.json            # TypeScript Configuration
│
└── README.md                    # Project Documentation
```

---

## ⚙️ Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- **Python**: `3.10+`
- **Node.js**: `v18+` & **npm**

---

### 1️⃣ Backend Setup (Django REST Framework)

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**:
   - **Windows (PowerShell)**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - **Linux/macOS**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up Environment Variables**:
   Create a `.env` file in the `backend/` directory (or copy from `.env.example`):
   ```env
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=127.0.0.1,localhost
   CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
   ```

5. **Apply Database Migrations**:
   ```bash
   python manage.py migrate
   ```

6. **Seed Initial Catalog Data**:
   Populate the database with sample categories, products, ratings, and reviews:
   ```bash
   python manage.py seed_db
   ```

7. **Create a Superuser** (Optional - to access Django Admin at `http://127.0.0.1:8000/admin/`):
   ```bash
   python manage.py createsuperuser
   ```

8. **Start the Django Development Server**:
   ```bash
   python manage.py runserver
   ```
   The backend API will be live at `http://127.0.0.1:8000/`.

---

### 2️⃣ Frontend Setup (React + Vite + TypeScript)

1. **Open a new terminal and navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite Development Server**:
   ```bash
   npm run dev
   ```
   The frontend application will be running at `http://localhost:5173/`.

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| **GET** | `/api/categories/` | List all categories & subcategories | ❌ |
| **GET** | `/api/products/` | List/Filter/Search products | ❌ |
| **GET** | `/api/products/{id}/` | Retrieve product details | ❌ |
| **POST** | `/api/products/{id}/reviews/` | Add a review to a product | ❌ |
| **GET/POST/DELETE**| `/api/cart/` | Manage shopping cart items | ❌ / Optional |
| **POST** | `/api/checkout/` | Place a new order | ❌ / Optional |
| **GET** | `/api/orders/` | List user order history | 🔒 |
| **GET** | `/api/orders/{order_id}/` | Get order details | ❌ / Optional |
| **GET/POST/DELETE**| `/api/wishlist/` | Manage user wishlist | 🔒 |
| **POST** | `/api/auth/register/` | Register a new user | ❌ |
| **POST** | `/api/auth/login/` | Obtain JWT token pair | ❌ |
| **POST** | `/api/auth/token/refresh/` | Refresh JWT token | ❌ |
| **GET** | `/api/auth/profile/` | Fetch user profile info | 🔒 |

---

## 🧪 Frontend Scripts

- **`npm run dev`**: Starts Vite dev server with Hot Module Replacement (HMR).
- **`npm run build`**: Compiles TypeScript and builds production assets into `dist/`.
- **`npm run preview`**: Locally previews the production build.
- **`npm run lint`**: Runs ESLint for static code analysis.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
