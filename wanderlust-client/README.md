# 🌍 WANDERLUST

### Discover Stays. Explore Places. Create Memories.

**WANDERLUST** is a full-stack travel accommodation platform inspired by modern vacation-rental marketplaces. It enables travelers to discover places to stay, explore property locations, share reviews, and manage accommodation listings through a user-friendly web interface.

Built with **Node.js, Express.js, MongoDB, and EJS**, the project demonstrates full-stack web development, database integration, authentication, and location-based browsing.

---

## ✨ Key Features

- **🔐 User Authentication & Authorization** — Register, log in, and access protected features with session-based authentication.
- **🏡 Accommodation Listing Management** — Create, browse, edit, and delete property listings with ownership-based permissions.
- **⭐ Reviews & Ratings** — Share feedback about accommodations and manage reviews with authorization checks.
- **🖼️ Image Uploads** — Upload and display property images using Cloudinary for image storage and delivery.
- **🗺️ Location-Based Discovery** — Explore property locations using interactive maps and geolocation services.

---

## 🛠️ Technologies Used

### Frontend

- **EJS** — Dynamic server-rendered templates
- **HTML5 & CSS3** — Page structure and styling
- **JavaScript** — Client-side interactivity
- **Bootstrap** — Responsive UI components and layouts

### Backend

- **Node.js** — JavaScript runtime
- **Express.js** — Web application framework
- **Mongoose** — MongoDB object modeling
- **Passport.js** — User authentication

### Database & Services

- **MongoDB Atlas** — Cloud database hosting
- **Cloudinary** — Image storage and management
- **Leaflet & OpenStreetMap** — Interactive maps and location visualization
- **Nominatim** — Geocoding and location lookup

---

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- npm
- A MongoDB database (local or MongoDB Atlas)
- A Cloudinary account for image uploads

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/arijitbarua-dev/WANDERLUST.git
```

**2. Navigate to the project directory**

```bash
cd WANDERLUST
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure environment variables**

Create a `.env` file in the project root and add the values required by the application:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

If your local configuration requires a map access token, add the corresponding variable as well. Never commit real credentials or API secrets to GitHub.

**5. Start the application**

```bash
npm start
```

If no `start` script is defined in `package.json`, use the configured entry point, for example:

```bash
node app.js
```

Open [http://localhost:8080](http://localhost:8080) in your browser if port 8080 is configured by the application.

---

## 📂 Project Structure

```text
WANDERLUST/
├── controllers/    # Application logic
├── models/         # Database models
├── routes/         # Application routes
├── views/          # EJS templates
├── public/         # Static assets
├── utils/          # Helper utilities
├── app.js          # Application entry point
├── cloudConfig.js  # Cloudinary configuration
├── middleware.js   # Custom middleware
├── schema.js       # Validation schemas
└── package.json    # Dependencies and scripts
```

---

## 🎯 Project Goal

WANDERLUST aims to simplify accommodation discovery by bringing property listings, user reviews, image galleries, and location information together in one convenient platform.

---

## 👨‍💻 Developer

**Arijit Barua Turza**

- GitHub: [@arijitbarua-dev](https://github.com/arijitbarua-dev)
- Repository: [WANDERLUST](https://github.com/arijitbarua-dev/WANDERLUST)

---

<p align="center">
  <strong>🌍 WANDERLUST — Your Next Adventure Starts Here.</strong>
</p>