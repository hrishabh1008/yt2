# Backend README

## Overview

This backend powers the Capstone Project YT2 application, providing RESTful APIs for user management, video processing, and data storage. It is designed for scalability, security, and ease of integration with the frontend.

---

## Features

- **User Authentication:** Secure JWT-based login and registration.
- **Video Processing:** Handles video uploads, metadata extraction, and processing.
- **API Endpoints:** RESTful APIs for CRUD operations on users, videos, and related resources.
- **Database Integration:** Persistent storage using MongoDB.
- **Error Handling:** Centralized error management and logging.
- **CORS Support:** Configured for secure cross-origin requests.
- **Environment Configuration:** Uses `.env` for sensitive settings.

---

## Tech Stack

- **Node.js** (runtime)
- **Express.js** (web framework)
- **MongoDB** (database)
- **Mongoose** (ODM)
- **JWT** (authentication)
- **Multer** (file uploads)
- **dotenv** (environment variables)

---

## File Structure

```
backend/
│
├── controllers/        # Route logic (user, video, auth)
├── models/             # Mongoose schemas (User.js, Video.js)
├── routes/             # API route definitions
├── middleware/         # Auth, error handling, CORS
├── utils/              # Helper functions
├── uploads/            # Uploaded video files
├── .env                # Environment variables
├── app.js              # Express app setup
├── server.js           # Entry point
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation
```

---

## Code Structure

- **controllers/**: Business logic for each resource.
- **models/**: Database schemas and models.
- **routes/**: API endpoints, grouped by resource.
- **middleware/**: Authentication, error handling, and other Express middleware.
- **utils/**: Utility functions (e.g., video processing).
- **uploads/**: Stores uploaded files.

---

## Getting Started

1. **Clone the repo:**
    ```bash
    git clone https://github.com/hrishabh1008/yt2.git
    cd yt2-backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure environment:**
    - Copy `.env.example` to `.env` and set your variables.

4. **Run the server:**
    ```bash
    npm start
    ```

---

## GitHub Repository

- [yt2-backend](https://github.com/hrishabh1008/yt2.git)

---

## Contributing

Pull requests are welcome. Please open an issue first to discuss changes.

---

## License

MIT
