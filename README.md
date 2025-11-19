# Amazon E-Commerce Clone (Vanilla JavaScript)

A fully functional, responsive e-commerce application built from scratch using **Vanilla JavaScript**. This project was developed as part of an intensive 90-day deep dive into software architecture, asynchronous programming, and system design.

It demonstrates a transition from simple scripting to **professional-grade software engineering**, focusing on modularity, state management, and clean code principles without relying on frameworks like React.

## 🚀 Live Demo
https://javascript-amazon-learning-project.vercel.app/

## ✨ Key Features

### 🛒 Core E-Commerce Flow
* **Product Grid:** Dynamic rendering of products with a responsive layout.
* **Search Functionality:** Real-time filtering of products by name and keywords.
* **Smart Cart System:** * Add items with specific quantities.
    * Persist cart data using `localStorage` (shopping cart saved on refresh).
    * Update quantities or remove items dynamically.
* **Checkout Process:** * Calculates totals (items, shipping, estimated tax) in real-time.
    * Offers multiple delivery options that update the order total instantly.
* **Order Placement:** Simulates a backend API call to place an order and clears the cart upon success.

### 📦 Order Management
* **Order History:** Displays all past orders with unique IDs and totals.
* **"Buy It Again":** A quick-action feature that instantly re-adds a previously purchased item to the cart and redirects to checkout.
* **Tracking Page:** A dynamic tracking interface that:
    * Reads URL parameters to identify the specific order and product.
    * Calculates delivery status (Preparing, Shipped, Delivered) using date logic.

## 🛠️ Technical Architecture & Concepts

This project goes beyond basic HTML/JS by implementing advanced software design patterns:

### 1. Modular Architecture (ES6 Modules)
The codebase is split into logical modules to separate concerns:
* `data/`: Manages state (Cart, Products, Orders).
* `scripts/`: Handles the business logic and DOM manipulation.
* `utils/`: Contains reusable helper functions.

### 2. Single Responsibility Principle (SRP)
Rendering logic is strictly separated to avoid "God Functions."
* **Example:** In the Orders page, `createHeaderHtml` handles the order summary, while `createProductsHtml` handles the item list. The main `renderOrders` function acts only as an orchestrator.

### 3. Object-Oriented Programming (OOP)
* Implemented a `Product` class to standardize product data.
* Used **Inheritance** and **Polymorphism** to create a `Clothing` subclass that overrides methods (e.g., generating a size chart link only for clothing items).

### 4. Asynchronous Data Flow
* **Data Fetching:** Uses `async`/`await` and `fetch()` to load products from a backend.
* **Robust Error Handling:** A custom `fetchHandler` utility centralizes error management, using dependency injection to handle network failures gracefully across all pages.
* **Race Condition Management:** Ensures data is fully loaded before rendering the UI.

### 5. Functional Programming
* Avoided manual loops in favor of declarative methods like `.map()`, `.filter()`, and `.reduce()` for cleaner data transformation and state calculation.

## 🧪 Testing
* **Jasmine Framework:** Implemented unit and integration tests to ensure the cart logic (adding/removing items) and money calculations function correctly without regressions.

## 📂 Project Structure

```text
/
├── amazon.html              # Main Product Page
├── checkout.html           # Checkout & Payment
├── orders.html             # Order History
├── tracking.html           # Order Tracking
├── data/
│   ├── cart.js             # Cart state & logic
│   ├── products.js         # Product classes & OOP logic
│   ├── orders.js           # Order history state
│   └── delivery-options.js # Shipping logic
├── scripts/
│   ├── amazon.js           # Controller for Home page
│   ├── checkout.js         # Controller for Checkout
│   ├── orders.js           # Controller for Orders page
│   └── utils/              # Shared utilities (money, dates)
└── tests/                  # Jasmine test suites

👨‍💻Author
Ajay
