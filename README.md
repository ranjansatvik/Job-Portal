## Job Portal

A full-stack MERN job portal connecting Job Seekers and Employers. Employers can post and manage job listings; job seekers can browse listings and submit applications with resume upload.

### Features

Role-based authentication for Job Seeker and Employer accounts, using JWT and bcrypt password hashing.

Employers can create, update, and manage job postings.

Job seekers can browse and search job listings and apply directly through the platform.

Resume and file uploads handled via Cloudinary.

Protected routes and middleware-based authorization for role-specific actions.

### Tech Stack

Frontend: React (Vite), React Router, Axios, React Hot Toast, React Icons

Backend: Node.js, Express

Database: MongoDB (Mongoose)

Auth and Security: JSON Web Tokens, bcrypt, cookie-parser, validator

File Storage: Cloudinary, express-fileupload

### Project Structure

backend/ Express API with config, controllers, database, middlewares, models (user, job, application schemas), and routes

frontend/ React application with components for Auth, Home, Job, Application, and Layout

### Running Locally

Backend: cd backend, npm install, npm run dev

Frontend: cd frontend, npm install, npm run dev

Environment variables are required for MongoDB connection, JWT secret, and Cloudinary credentials.
