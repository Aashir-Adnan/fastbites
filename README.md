# FastBites — University Cafeteria & Dining App

A full-stack food-discovery app for **FAST-NUCES (Lahore)** students and staff. It lists the campus **dining hall and on-campus restaurants**, browses **menus by cuisine**, shows **recommendations**, places food outlets on a **Google Map**, takes **reviews and ratings**, and emails subscribed students when a restaurant's **time-based discount** starts.

It was built as a **Software Engineering course project**:

- **Frontend:** React 18 (Create React App), React Router, Framer Motion page transitions, React Toastify
- **Backend:** Node.js / Express with **convention-based dynamic routing** over MySQL, plus a node-cron discount mailer
- **Load testing:** Artillery scenarios for static and dynamic routes

---

## Table of contents

- [Features](#features)
- [Screens & routes](#screens--routes)
- [Architecture](#architecture)
- [Database](#database)
- [Backend API](#backend-api)
  - [Dynamic CRUD routes](#dynamic-crud-routes)
  - [Custom routes](#custom-routes)
  - [Static routes](#static-routes)
  - [Uploads](#uploads)
- [Discount email cron job](#discount-email-cron-job)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Load testing with Artillery](#load-testing-with-artillery)
- [Project structure](#project-structure)
- [Known limitations](#known-limitations)

---

## Features

| Area | What you can do |
|------|-----------------|
| **Accounts** | Separate **student** and **staff** sign-up and login flows (students use their university roll number and email) |
| **Dashboard** | Personal landing page with quick links |
| **Campus dining hall** | Today's dining-hall items, with ratings you can submit |
| **Menus** | Pick a cuisine to see its restaurants, then open a restaurant to see its items and prices |
| **Restaurant page** | Item list, item details, **subscribe to discounts** (`user_discounts`), order summary |
| **Recommendations** | Suggested items and restaurants |
| **Locate food** | Google Map with animated markers and info windows for every outlet |
| **Reviews** | Read and write reviews |
| **Discount alerts** | An HTML email when a subscribed restaurant's discount window opens |

---

## Screens & routes

Defined in `Frontend/src/App.jsx`. Every route is wrapped in a Framer Motion `AnimatedRoute` fade/slide.

| Path | Component | Layout |
|------|-----------|--------|
| `/` | `LandingPage` | — |
| `/login` | `Login` (choose student or staff) | — |
| `/login/student` · `/login/staff` | `StudentLogin` · `StaffLogin` | — |
| `/signup-selection` | `SignupSelection` | — |
| `/signup/student` · `/signup/staff` | `StudentSignup` · `StaffSignup` | — |
| `/dashboard` | `Dashboard` | Sidebar `Layout` |
| `/dining-hall` | `CampusDiningHall` | Sidebar |
| `/menus` | `Menus` | Sidebar |
| `/recommendations` | `Recommendations` | Sidebar |
| `/locate-food` | `GoogleMaps` | Sidebar |
| `/restaurant/:name` | `RestaurantPage` | Sidebar |

Static seed data for the UI (burgers, wings, drinks, dining hall, restaurants) lives in `Frontend/src/data/`.

---

## Architecture

```
React (CRA :3001) ──axios/fetch──► Express :3000
                                   ├─ helmet · cors · per-session rate limit (100 req)
                                   ├─ /api/crud/:resource      → Handler_Functions/CRUDS/crud_<method>.js
                                   ├─ /api/custom/:res/:action → Handler_Functions/Custom/<res><action>.js
                                   ├─ /api/static/...          → fixed CRUD handlers
                                   ├─ POST /upload             → multer → attachments
                                   └─ /uploads/*               → static files
                                             │
                                             ▼
                                       MySQL "fastbites"
                                             ▲
                     CronJobs/discountEmail.js (every minute) ──► Nodemailer (Gmail)
```

**Convention over configuration.** You never register routes. For `/api/crud/<table>`, the router loads `crud_<httpMethod>.js`, so one generic handler per method serves **every table**. Custom endpoints work the same way: dropping in a file called `Handler_Functions/Custom/<resource><action>.js` creates `/api/custom/<resource>/<action>`. Resolved handler paths are cached in `routeMap`.

---

## Database

Import **`fastbites.sql`**. It creates the schema and loads sample data.

| Table | Purpose |
|-------|---------|
| `user` | Students and staff (name, roll number, email, role, credentials) |
| `cuisines` | Cuisine categories |
| `restaurants` | On-campus outlets (name, cuisine, location, timings, rating) |
| `items` | Menu items per restaurant (name, price, description, image) |
| `dininghall` | Dining-hall dishes of the day |
| `discounts` | Per-restaurant discounts with `discount_day` (or NULL = every day) and `discount_time_start` / `discount_time_end` |
| `user_discounts` | Which users subscribed to which restaurant's discounts |

---

## Backend API

Responses use `{ status, message, payload }` (`Constants/response.js`).

### Dynamic CRUD routes

| Method | Path | Handler | Behaviour |
|--------|------|---------|-----------|
| `GET` | `/api/crud/:table[?id=]` | `crud_get.js` | `SELECT * FROM <table> [WHERE id = …]`, paginated |
| `POST` | `/api/crud/:table` | `crud_post.js` | Inserts the body's `entry` rows (columns found with `getAttributes`) |
| `PUT` | `/api/crud/:table` | `crud_put.js` | Updates by id |
| `DELETE` | `/api/crud/:table` | `crud_delete.js` | Deletes by id |

Tables the frontend uses: `user`, `dininghall`, `cuisines`, `rating`, `user_discounts`.

### Custom routes

| Method | Path | File | Body |
|--------|------|------|------|
| `POST` | `/api/custom/get/restaurantdata` | `Custom/getRestaurantData.js` | `{ name: <cuisine> }` returns that cuisine's restaurants |
| `POST` | `/api/custom/get/restaurantitems` | `Custom/getRestaurantItems.js` | `{ name: <restaurant> }` returns its items |

### Static routes

Fixed handlers, used for load-test comparison:

| Path | Handler |
|------|---------|
| `/api/static/post/user` | `crud_post` on `user` |
| `/api/static/post/dininghall` | `crud_post` on `dininghall` |
| `/api/static/get/:resource` | `crud_get` |

### Uploads

`POST /upload` (multipart field `image`) saves the file to `uploads/` and records its path in `attachments`. Files are served from `/uploads/<file>`.

---

## Discount email cron job

`Server/CronJobs/discountEmail.js` runs **every minute** (`*/1 * * * *`):

1. Finds `discounts` where `discount_day` is NULL or today's weekday, and the current `HH:mm` falls between `discount_time_start` and `discount_time_end`.
2. For each matching discount, gets every user subscribed to that restaurant through `user_discounts`.
3. Sends each of them a styled HTML email with Nodemailer through Gmail.

Run it next to the API:

```bash
cd Server && node CronJobs/discountEmail.js
```

---

## Getting started

Prerequisites: **Node.js 18+**, **MySQL 8** (or MariaDB).

```bash
git clone https://github.com/Aashir-Adnan/fastbites.git
cd fastbites

# Database
mysql -u root -p -e "CREATE DATABASE fastbites"
mysql -u root -p fastbites < fastbites.sql

# Backend
cd Server
npm install
# create .env (see below), and set the DB credentials in Database/projectDb.js
npm start                      # nodemon index.js → http://localhost:3000

# Frontend (new terminal)
cd ../Frontend
npm install
npm start                      # CRA → http://localhost:3001 (accept the port prompt)
```

---

## Environment variables

**`Server/.env`**

| Variable | Use |
|----------|-----|
| `EMAIL_USER`, `EMAIL_PASS` | Gmail account and App Password for the discount emails and OTP |
| `JWT_SECRET` | Signs access tokens |
| `SECRET_KEY` | Encryption helpers |
| `DB_DATABASE` | Database name used by some helpers |

The MySQL connection itself is configured in `Server/Database/projectDb.js` (host, user, password, database `fastbites`, timezone `+05:00`).

**`Frontend/.env`**

| Variable | Use |
|----------|-----|
| `REACT_APP_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key for `/locate-food` |

The frontend calls the API at the hard-coded `http://localhost:3000`.

---

## Load testing with Artillery

`Server/Artillery/` contains two scenarios that compare **static** routes with **dynamic, convention-based** routes:

| File | Target routes | Load |
|------|---------------|------|
| `static.yml` | `/api/static/post/user`, `/api/static/post/dininghall`, `/api/static/get/...` | 2 virtual users, 4 loops × 3 requests |
| `dynamic.yml` | `/api/crud/user`, `/api/crud/dininghall` | same |

`generate-entries.js` creates random roll numbers and item names. The thresholds are p99 < 100 ms and p95 < 75 ms, with apdex at 100 ms.

```bash
npm i -g artillery
cd Server/Artillery
artillery run static.yml  --output report.json
artillery run dynamic.yml --output report.json
artillery report report.json
```

---

## Project structure

```
fastbites/
├── fastbites.sql                  # Schema + seed data
├── Frontend/                      # React (CRA)
│   └── src/
│       ├── App.jsx                # Routes + AnimatedRoute
│       ├── components/            # LandingPage, Login/Signup (student/staff), Dashboard,
│       │                          # CampusDiningHall, Menus, RestaurantPage, ItemDetails,
│       │                          # OrderSummary, Recommendations, GoogleMaps, Review(s),
│       │                          # Layout, Sidebar, LogoutButton (+ .css each)
│       └── data/                  # Static seed data
└── Server/                        # Express API
    ├── index.js                   # App bootstrap, /upload, route mounting
    ├── routes/                    # crudRoutes, customRoutes, staticRoutes
    ├── Handler_Functions/
    │   ├── CRUDS/crud_{get,post,put,delete}.js
    │   └── Custom/getRestaurantData.js, getRestaurantItems.js
    ├── Database/                  # projectDb, queryExecution, pagination, getAttributes
    ├── middleware/                # accessTokenValidator, authenticator, permissionValidator, validator
    ├── Protection_Protocols/      # helmet, cors, rate limiting, request log
    ├── Constants/                 # response, JWT, OTP, email, encryption helpers
    ├── CronJobs/discountEmail.js
    └── Artillery/                 # Load-test scenarios + report
```

---

## Known limitations

- `crud_get` builds SQL with string concatenation (`WHERE id = ${req.query.id}`) and takes the table name straight from the URL. That's fine for a class demo, but it needs parameterisation and a table allow-list before real use.
- The DB credentials and API URL are hard-coded. Move them to environment variables.
- The rate-limit store is an in-memory object, so it resets on restart and isn't shared between instances.
- `temp.txt` is unrelated coursework (a compiler-construction SDT assignment).
