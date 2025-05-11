# 🍰 Invoice Generator – Nani Enterprises

A simple web-based invoice generator for a bakery. Users can select bakery items, generate a detailed invoice, and download it as a PDF. The app is built using HTML, CSS, and JavaScript, and is served using a lightweight Java HTTP server.

---

## ✅ Features

- Dropdown to select bakery items with price
- Dynamic invoice table with item, quantity, price, and total
- Grand total calculation
- Generate final invoice with customer name and date
- Download invoice as a PDF
- Java-based static file server (no need for Apache or Nginx)

---

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Server:** Java (HttpServer)
- **PDF Generation:** jsPDF (via CDN)

---

## 📁 Project Structure

invoice-generator/
├── images/
│ └── logo.png
├── bakery-items.json
├── index.html
├── style.css
├── script.js
├── SimpleWebServer.java
└── README.md

yaml
Copy
Edit

---

## 📦 Prerequisites

- Java 8 or higher installed
- A browser (Chrome/Firefox)
- Text editor (VS Code/Notepad++) or Java IDE (IntelliJ/Eclipse)

---

## 🚀 How to Run the Project

### 1. Compile the Java Server

Open terminal/command prompt inside the project folder:

```bash
javac SimpleWebServer.java
2. Start the Server
bash
Copy
Edit
java SimpleWebServer
Output:

arduino
Copy
Edit
Server started at http://localhost:8080
3. Open the Web App
Visit: http://localhost:8080 in your browser.

🔗 External Library Used
jsPDF for PDF generation:
Add this to your index.html before the closing </body> tag:

html
Copy
Edit
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
📜 Sample Data File (bakery-items.json)
json
Copy
Edit
{
  "Chocolate Cake": { "price": 300 },
  "Vanilla Cake": { "price": 250 },
  "Strawberry Cake": { "price": 270 },
  "Black Forest Cake": { "price": 350 },
  "Red Velvet Cake": { "price": 400 },
  "Carrot Cake": { "price": 320 },
  "Cheesecake": { "price": 380 },
  "Lemon Cake": { "price": 260 },
  "Tiramisu": { "price": 450 },
  "Tres Leches Cake": { "price": 470 },
  "Pineapple Cake": { "price": 290 },
  "Coffee Cake": { "price": 240 },
  "Marble Cake": { "price": 280 },
  "Chocolate Brownie": { "price": 150 },
  "Walnut Brownie": { "price": 180 },
  "Fudge Brownie": { "price": 200 },
  "Blondie Brownie": { "price": 200 },
  "Chocolate Muffin": { "price": 120 },
  "Blueberry Muffin": { "price": 130 },
  "Banana Muffin": { "price": 110 },
  "Cinnamon Muffin": { "price": 120 },
  "Red Velvet Muffin": { "price": 140 },
  "Chocolate Croissant": { "price": 180 },
  "Almond Croissant": { "price": 200 },
  "Butter Croissant": { "price": 140 },
  "Raisin Danish": { "price": 180 },
  "Apple Danish": { "price": 170 },
  "Cheese Danish": { "price": 190 },
  "Cinnamon Roll": { "price": 210 },
  "Glazed Donut": { "price": 100 },
  "Chocolate Donut": { "price": 120 },
  "Strawberry Donut": { "price": 110 },
  "Boston Cream Donut": { "price": 130 },
  "Jelly Filled Donut": { "price": 120 },
  "Vanilla Cupcake": { "price": 140 },
  "Chocolate Cupcake": { "price": 160 },
  "Red Velvet Cupcake": { "price": 170 },
  "Oreo Cupcake": { "price": 180 },
  "Carrot Cupcake": { "price": 150 },
  "Chocolate Chip Cookie": { "price": 90 },
  "Oatmeal Cookie": { "price": 80 },
  "Peanut Butter Cookie": { "price": 100 },
  "Snickerdoodle Cookie": { "price": 95 },
  "Shortbread Cookie": { "price": 85 },
  "Macaron": { "price": 200 },
  "Eclair": { "price": 220 },
  "Fruit Tart": { "price": 250 },
  "Mini Cheesecake": { "price": 260 },
  "Chocolate Mousse": { "price": 280 },
  "Lemon Tart": { "price": 230 },
  "Strawberry Tart": { "price": 240 },
  "Apple Pie Slice": { "price": 220 },
  "Pecan Pie Slice": { "price": 230 },
  "Pumpkin Pie Slice": { "price": 210 },
  "Banana Bread Slice": { "price": 180 },
  "Zucchini Bread Slice": { "price": 170 },
  "Chocolate Loaf": { "price": 300 },
  "Vanilla Loaf": { "price": 270 }
}
