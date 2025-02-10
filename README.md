# Contacts-CRM API

A **RESTful API** for managing contacts, tracking their transactions, and auditing changes. Built using **Node.js, Express, TypeORM, and PostgreSQL**.

---

## 🚀 Features

- ✅ Create, Read, Update, and Delete (CRUD) operations for contacts.
- ✅ Transfer balance between contacts.
- ✅ Soft delete contacts instead of permanent deletion.
- ✅ Retrieve audit history of contact changes.
- ✅ **Dockerized** for easy deployment.

---

## 📦 Installation & Setup

### **1️⃣ Clone this Repository**

### **2️⃣ Install Dependencies**

```sh
npm install
```

### **3️⃣ Set Up Environment Variables**

Create a `.env` file in the project root and add the following:

```ini
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=crm
PORT=3000
```

### **4️⃣ Run PostgreSQL Database (If Not Using Docker)**

If PostgreSQL isn't installed, you can run it using **Docker**:

```sh
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

Or manually start PostgreSQL and create the `crm` database:

```sh
psql -U postgres -c "CREATE DATABASE crm;"
```

### **5️⃣ Run Database Migrations**

```sh
npm run migration:run  # For local development
```

---

## 🚀 Running the Project Locally

### **Option 1: Using Docker (Recommended)**

```sh
docker-compose up --build
```

This will: 
✅ Start the **PostgreSQL database**\
✅ Run **migrations**\
✅ Start the **Express server**

---
### **Option 2: using npm**

```sh
npm run dev
```
---

## 📜 API Documentation

### **Postman Collection**

You can import the Postman collection to test the API endpoints.

## 📌 Available API Endpoints

| Method   | Endpoint              | Description                       |
| -------- | --------------------- | --------------------------------- |
| `POST`   | `/contacts`           | Create a new contact              |
| `GET`    | `/contacts`           | Get all contacts                  |
| `GET`    | `/contacts/:id`       | Get a contact by ID               |
| `PATCH`  | `/contacts/:id`       | Update contact details            |
| `DELETE` | `/contacts/:id`       | Soft delete a contact             |
| `POST`   | `/contacts/transfer`  | Transfer balance between contacts |
| `GET`    | `/contacts/:id/audit` | Get audit history of a contact    |

---

## 🔥 Running Tests

```sh
npm test
```

---
