# RateMySupplements
![Collaborative](https://img.shields.io/badge/Collaboration-Jason%20Deng%20%26%20Farzana%20Sattar-blue?style=for-the-badge)
Application inspired by RateMyProfessor, this app allows you to rate & view supplements in one centralized platform.


# Built With
![React Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Tailwind Badge](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT Badge](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Typescript Badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

# Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
- [Java 21+](https://adoptium.net/) installed
- [Node.js](https://nodejs.org/) (v18 or higher) and npm installed

# Installation

## Backend

1. Navigate to the backend directory and configure environment variables:
```bash
   cd Backend
   cp .env.example .env
```
   Edit `.env` with your AWS credentials. It requires AWS access key and AWS secret key, a IAM role with full permission to AWS S3 bucket is required.

2. Build and run with Docker Compose:
```bash
   docker compose up --build
```
   Backend runs on `http://localhost:8080`

   This runs a containerized version of Spring Boot and a PostgreSQL instance (built from the official PostgreSQL image).

## Frontend

1. Navigate to frontend directory and install dependencies:
```bash
   cd Frontend
   npm install
```

2. Run the development server:
```bash
   npm run dev
```
   Frontend runs on `http://localhost:5173`

## Contributors
Jason Deng  
Farzana Sattar 
