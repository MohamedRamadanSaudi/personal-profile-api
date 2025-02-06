# Personal Profile API

Welcome to the **Personal Profile API**! This repository provides a backend service for managing personal profile data, built using Node.js and designed with scalability and security in mind.

## Features

- **Comprehensive CRUD Operations**: Full support for creating, reading, updating, and deleting user data.
- **Modular Architecture**: Well-organized code for maintainability and scalability.
- **Integration with Cloudinary**: For seamless media management.
- **Authentication & Authorization**: Secure user sessions using JWT.
- **Type-safe Database Access**: Using Prisma ORM with MongoDB for data persistence.

## Models Overview

_This project includes the following models_:

- **Admin**: For managing administrator credentials and authentication.
- **Volunteering**: Captures details of volunteer experiences.
- **Certificates**: Stores user certifications with optional media.
- **Reviews**: Collects user feedback and testimonials.
- **Experiences**: Maintains work experiences, including job positions and company details.
- **Projects**: Contains user projects with associated categories.
- **Categories**: Organizes different projects.
- **ProjectsCategories**: Relational model between projects and categories.

## Technologies Used

- **NestJS**: Framework for building efficient server-side applications.
- **TypeScript**: For robust and type-safe code.
- **Prisma**: Modern ORM for type-safe database access.
- **MongoDB**: NoSQL database for data storage.
- **Cloudinary**: Media asset management.
- **JSON Web Token (JWT)**: Secure authentication for user sessions.

## Installation

To get started with this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MohamedRamadanSaudi/personal-profile-api.git
   cd personal-profile-api
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   DATABASE_URL="your_mongodb_connection_string"
   JWT_SECRET="your_jwt_secret"
   ADMIN_PASSWORD= "any_password_you_need"
   CLOUDINARY_CLOUD_NAME="your_CLOUDINARY_CLOUD_NAME"
   CLOUDINARY_API_KEY="your_CLOUDINARY_API_KEY"
   CLOUDINARY_API_SECRET="your_CLOUDINARY_API_SECRET"
   ```
4. **Run the server**:
   ```bash
   npx prisma db push
   npm start
   ```
   The server will be running at `http://localhost:3000`.

## Usage

### Endpoints

_You can import the collection of endpoints in postman or swagger_

## Contact

For questions or support, please reach out to [Mohamed Ramadan](mailto:MohamedRamadanSaudi@gmail.com).
