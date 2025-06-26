# 📝 Notebook App with Express.js, PostgreSQL & Sequelize

A simple note-taking web application built with **Express.js**, **EJS**, and **PostgreSQL** using the **Sequelize ORM**. The app supports **multilingual interfaces** (🇫🇷 / 🇺🇸), and allows users to create, edit, and delete notes stored in a PostgreSQL database.

Demonstration video:
![demonstration_video](./doc/media/demonstration_video.gif)

---

## 🚀 Features

- 🗃️ Create, edit, and delete notes
- 🖥️ Server-side rendered views using EJS
- 🌐 Multilingual support: French (fr-FR) and English (en-US)
- 📦 Dockerized PostgreSQL database
- 🔄 Language selection with persistent cookies
- 🔧 Sequelize ORM integration

---

## 🛠️ Technologies Used

| Layer          | Technology                  |
|----------------|-----------------------------|
| Backend        | [Express.js](https://expressjs.com/) |
| View Engine    | [EJS](https://ejs.co/)       |
| ORM            | [Sequelize](https://sequelize.org/) |
| Database       | [PostgreSQL](https://www.postgresql.org/) |
| Translations   | [i18n-node](https://github.com/mashpie/i18n-node) |
| Containerization | [Docker Compose](https://docs.docker.com/compose/) |
| Unit Testing   | [Jest](https://jestjs.io/), [Supertest](https://www.npmjs.com/package/supertest)      |

---

## 📦 Project Structure

```
.
├── src/
│   ├── app.js             # Main Express app
│   ├── models/            # Sequelize models
│   ├── views/             # EJS templates
│   ├── locales/           # i18n translation files
│   └── i18n.js            # i18n setup
├── Dockerfile             # Node.js container setup
├── docker-compose.yml     # App + PostgreSQL services
└── package.json
```

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/T0my-commits/Notebook-Express-Demo
cd notebook_expressjs
```

### 2. Create `.env` file (if using manually configured DB)

If not using Docker, you'll need to create a `.env` file with your DB credentials:

```env
DB_NAME=notebook
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
```

### 3. (Optionnal) Start unit tests

If you want to run unit tests, do:

```bash
docker compose -f docker-compose.test.yml up --build --abort-on-container-exit --remove-orphans
```

### 4. Start the project with Docker Compose

```bash
docker compose up --build --remove-orphans
```

This will:

- Build the Node.js app
- Start a PostgreSQL container
- Bind app to `http://localhost:3000`

> Your data will be persisted using Docker volumes, except in the test environment, where the storage is temporary

---

## 🌐 Language Support

You can change the app language via:

```
GET /lang/en
GET /lang/fr
```

The choice is stored in a cookie named `lang`.

---

## ✅ Testing the App

1. Go to [http://localhost:3000](http://localhost:3000)
2. Add a new note using the form
3. Click a note title to edit or delete it
4. Switch language using `/lang/en` or `/lang/fr`

---

## 🧪 Future Improvements

- Add user authentication
- Add support for rich text
- Implement search and tagging

---

## 💬 Why This Project?

This project was created for demonstration purposes only.

## 🔬 Contribute

This repository does not yet accept merge requests and exists for now for skills demonstration purposes only.
