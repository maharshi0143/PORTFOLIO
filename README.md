## Personal Portfolio

Full-stack portfolio with a public site, an admin dashboard, and a Node/Express API backed by PostgreSQL.

### Live Links
- Public site:


### Project Structure
- `Client/` - Public portfolio (static HTML/CSS/JS)
- `admin-dashboard/` - Admin UI for managing content
- `Server/` - Express API + PostgreSQL
- `images/` - Static image assets

### Tech Stack
- Frontend: HTML, CSS, JavaScript
- Admin: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: PostgreSQL
- Email: Nodemailer (Gmail)

### Features
- Public portfolio sections: About, Skills, Experience, Projects, Contact
- Admin dashboard with CRUD for projects, skills, experiences
- Contact form that stores messages and sends email notifications
- Token-based admin authentication
- API rate limiting for `/api/auth` and `/api/contact`

### Requirements
- Node.js 18+
- PostgreSQL (local or hosted)

### Environment Variables
Create `Server/.env` with the following:

```
PORT=5000
DATABASE_URL=postgresql://USER:PASS@HOST:PORT/DB
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

Notes:
- Use an app password for Gmail.
- Keep `.env` out of version control.

### Install Dependencies
From `Server/`:

```
npm install
```

### Run Locally
Start the API:

```
npm run dev
```

Open the public site:
- `Client/index.html`

Open the admin dashboard:
- `admin-dashboard/login.html`

### Admin Login
The backend restricts login to a single admin email:
- Email: `admin@gmail.com`
- Password: must match the stored hash in the `admins` table

If login fails, reset the admin password hash in the database.

### API Overview
Base URL (local): `http://localhost:5000`

Projects:
- `GET /api/projects`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

Skills:
- `GET /api/skills`
- `POST /api/skills`
- `PUT /api/skills/:id`
- `DELETE /api/skills/:id`

Experiences:
- `GET /api/experiences`
- `POST /api/experiences`
- `PUT /api/experiences/:id`
- `DELETE /api/experiences/:id`

Resume:
- `GET /api/resume`
- `PUT /api/resume`

Auth:
- `POST /api/auth/login`

Contact:
- `POST /api/contact`
- `GET /api/contact` (admin only)
- `DELETE /api/contact/:id` (admin only)

### Deployment
Backend (Render):
1. Deploy `Server/` as a Web Service.
2. Set the same `Server/.env` variables in Render.
3. Copy the Render URL.

Frontend (Vercel):
1. Update API base URLs with the Render URL:
	- `Client/config.js`
	- `admin-dashboard/config.js`
2. Deploy `Client/` and `admin-dashboard/` as static sites.

### Post-Deployment Checklist
- Replace API base URLs with the Render URL.
- Verify admin login works.
- Add a new project/skill/experience via the dashboard and verify it appears on the public site.
- Send a contact message and confirm it appears in the dashboard and email.

### Notes
- Keep folder casing consistent (`Database/`) when deploying to Linux.
- If SMTP fails, contact messages will return a server error.
