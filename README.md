# 🏠 RentMyRoam

**RentMyRoam** is an Airbnb-inspired full-stack Node.js project that allows users to create, view, edit, and delete rental property listings with a clean, responsive UI using Bootstrap 5.

---

## 🚀 Features

- 📄 Create, Edit, and Delete Listings  
- 🖼️ Add custom image URLs to listings  
- 💰 Price formatting (INR)  
- 📍 Location & Country support  
- 📱 Fully Responsive with Bootstrap 5  
- 🎨 Clean UI and layout using EJS templates  
- 🌱 Sample data seeding support (via `init` folder)  

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, Bootstrap 5, EJS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Templating Engine:** EJS with ejs-mate  
- **Version Control:** Git & GitHub  

---

📁 Folder Structure
<pre> RentMyRoam/ ├── models/ # Mongoose schema for listings ├── views/ # EJS templates (UI files) │ ├── layouts/ # Page layouts │ ├── includes/ # Reusable UI components │ └── listings/ # All listing-related views ├── public/ # Static files (CSS, JS) ├── utils/ # Reusable error-handling helpers ├── init/ # Sample data and DB seed scripts ├── app.js # Main server file ├── schema.js # Joi validation schema ├── package.json └── .gitignore </pre>


---

## 🌱 init/ Folder – Sample Data Setup

The `init/` folder is used to populate your MongoDB database with sample listings. It contains:

- `data.js`: Contains an array of sample listings  
- `index.js`: Clears the database and inserts sample data  
- `devTest.js`: Temporary route-based sample insert (used during development)

You can run the seeding script like this:

```bash
node init/index.js
📷 Screenshots
(Add screenshots here soon to show homepage, listing card, form UI, etc.)

🧪 How to Run Locally
git clone https://github.com/bablukup/RentMyRoam.git
cd RentMyRoam
npm install
node app.js
Visit in browser: http://localhost:8080/listings

✨ Future Updates (Coming Soon)
✅ User Authentication (Login/Signup)

✅ Cloud image upload (Cloudinary)

✅ Pagination

✅ Booking system

Author
Bablu Kumar
📧 Email: bk596572@gmail.com
🔗 GitHub: github.com/bablukup

💡 Have suggestions? I'd love to hear your thoughts and learn from your feedback! Feel free to open issues or DM.
