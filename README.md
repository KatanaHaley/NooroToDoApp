# Next.js To Do App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

---

## To Do App Overview

A full-stack Todo List application built with:
- **Frontend**: Next.js and Tailwind CSS
- **Backend**: Express.js, Prisma ORM, and MySQL

---

## Repositories

- **Frontend**: `todo-frontend` – Contains the Next.js application with Tailwind CSS styling.
- **Backend**: `todo-backend` – Contains the Express.js API with Prisma ORM for MySQL.

---

## Frontend Setup (Next.js)

### Clone the Repository
```bash
git clone https://github.com/yourusername/todo-frontend.git
cd todo-frontend
```

### Install Dependencies
```bash
yarn install
```

### Configure Environment Variables
- Create a `.env.local` file if needed for any custom environment variables.

### Run the Development Server
```bash
yarn dev
```
The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Backend Setup (Express.js & Prisma)

### Clone the Repository
```bash
git clone https://github.com/yourusername/todo-backend.git
cd todo-backend
```

### Install Dependencies
```bash
yarn install
```

### Configure Environment Variables
- Create a `.env` file in the root with your database connection details:
  ```env
  DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/yourdbname"
  PORT=4000
  ```
  Replace `USER`, `PASSWORD`, and `yourdbname` with your actual MySQL credentials.

### Database Initialization using Prisma
- **Generate the Prisma client:**
  ```bash
  npx prisma generate
  ```
- **Create and apply the initial migration:**
  ```bash
  npx prisma migrate dev --name init
  ```
  _Alternatively, if you don’t want to use migrations, you can run:_
  ```bash
  npx prisma db push
  ```
  This pushes your Prisma schema directly to the database.

** View the live data available in Prisma Studio at [http://localhost:5555](http://localhost:5555).
  ```npx prisma studio
  ```

### Run the Backend Server
```bash
yarn dev
```
The API will be available at [http://localhost:4000](http://localhost:4000).

---

## Usage

- **Frontend:** Use the UI at [http://localhost:3000](http://localhost:3000) to add, update, and delete tasks.
- **Backend:** The API endpoints (e.g., `/tasks`) handle CRUD operations and are used by the frontend. You can also test these endpoints using Postman.

---

## License

This project is licensed under the MIT License.

