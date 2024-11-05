# Job Portal

This project is a **Job Portal** application developed using the MERN stack (MongoDB, Express, React, Node.js). The platform enables users to search and apply for jobs, while employers can post and manage job listings.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization
- Job posting and management for employers
- Job search and application for job seekers
- Input validation and error handling
- Secure password storage with bcrypt
- JSON Web Token (JWT) for secure access

## Technologies Used
- **MongoDB** - Database for storing job listings and user information
- **Express** - Backend framework for building REST APIs
- **React** - Frontend library for creating the user interface
- **Node.js** - JavaScript runtime for backend server

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/ravindu1015/job_portal.git
    ```
2. Navigate into the project directory:
    ```bash
    cd job_portal
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

4. Set up MongoDB and update the environment variables as specified in `.env`.

5. Start the development server:
    ```bash
    npm run server
    ```

## Environment Variables
Create a `.env` file in the root directory and include the following environment variables:

```plaintext
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Scripts
- `npm start` - Start the production server
- `npm run server` - Start the development server using nodemon

## Contributing
Feel free to contribute to the project! Fork the repository and create a pull request.

## License
This project is licensed under the ISC License.
