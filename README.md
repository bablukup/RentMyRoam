# RentMyRoam

**RentMyRoam** is an Airbnb-inspired full-stack Node.js project that allows users to create, view, edit, and delete rental property listings with authentication, image uploads, and pagination. It comes with a clean, responsive UI using Bootstrap 5.

---

## 🚀 Features

- 📄 Create, Edit, and Delete Listings  
- 🖼️ Cloud image upload with **Cloudinary**  
- 🔑 **User Authentication (Login/Signup)** with secure sessions  
- 📜 Pagination support for browsing large numbers of listings  
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
- **Image Hosting:** Cloudinary  
- **Authentication:** Express-session & Passport.js  
- **Version Control:** Git & GitHub  

---

## 📁 Folder Structure

```
RentMyRoam/
├── app.js                 # Main server file
├── schema.js              # Joi validation schema
├── cloudconfig.js         # Cloudinary configuration
├── package.json
├── package-lock.json
├── .env                   # Environment variables
├── .gitignore
│
├── utils/                 # Reusable helpers
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/                 # EJS templates (UI files)
│   ├── includes/          # Reusable UI components
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   │
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── listings/          # All listing-related views
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   │
│   └── user/              # Authentication views
│       ├── login.ejs
│       ├── SignUp.ejs
│       └── error.ejs
│
├── models/                # Mongoose schemas (Listings, Users)
│
├── public/                # Static assets (CSS, JS)
│
└── init/                  # Sample data and DB seed scripts
    ├── data.js
    ├── index.js
    └── devTest.js
```

---

## 🌱 init/ Folder – Sample Data Setup

The `init/` folder is used to populate your MongoDB database with sample listings. It contains:

- `data.js`: Contains an array of sample listings  
- `index.js`: Clears the database and inserts sample data  
- `devTest.js`: Temporary route-based sample insert (used during development)

You can run the seeding script like this:

```
node init/index.js
```

---

## ⚙️ Environment Variables Setup (.env)

Before running the app, create a `.env` file in the root directory and add the following:

```
# MongoDB connection
MONGO_URL=mongodb://127.0.0.1:27017/rentmyroam

# Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret

# Session secret
SECRET=your_secret_key
```

Replace the values with your own MongoDB URI and Cloudinary credentials.

---

## 📷 Screenshots

(Add screenshots here soon to show homepage, listing card, form UI, etc.)

---

## 🧪 How to Run Locally

```
git clone https://github.com/bablukup/RentMyRoam.git
cd RentMyRoam
npm install
node app.js
```

Visit in browser:  
👉 [http://localhost:8080/listings](http://localhost:8080/listings)

---

## ✨ Roadmap / Upcoming Features

- ✅ User Authentication (Login/Signup)
- ✅ Cloud image upload (Cloudinary)
- ✅ Pagination
- ⬜ Booking system (coming soon)

---

## 👨‍💻 Author

Bablu Kumar  
📧 Email: [bk596572@gmail.com](mailto:bk596572@gmail.com)  
🔗 GitHub: [bablukup](https://github.com/bablukup)  

💡 Have suggestions? I'd love to hear your thoughts and learn from your feedback!  
Feel free to open issues or DM.

---
