# Express Todo Backend

This project provides a Dockerized Express.js backend for a Todo application.

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed on your machine
- [Git](https://git-scm.com/) for cloning the repository

### Setup Instructions

1. **Clone the repository**
   ```sh
   git clone https://github.com/YogeshSinghChilwal/docker-express-fast_api.git
   ```

2. **Create a `.env` file**

   In the root directory, create a `.env` file with your secrets:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

3. **Build and run the backend using Docker Compose**
   ```sh
   docker compose up --build
   ```

   This will build the image and start the backend server on [http://localhost:4000](http://localhost:4000).

## Configuration

- The backend service is defined in [`docker-compose.yaml`](docker-compose.yaml).
- Environment variables are loaded from your `.env` file.
- The backend code is located in the `express-todo-backend` folder.

## Useful Commands

- **Stop the containers:**
  ```sh
  docker compose down
  ```
- **Rebuild the containers:**
  ```sh
  docker compose up --build
  ```
