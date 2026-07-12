## Personal Portfolio

Full-stack portfolio with a public site, an admin dashboard, and a Node/Express API backed by PostgreSQL.

### Live Links
- Public site: https://portfolio-sepia-iota-29.vercel.app/

### Project Structure
- `Client/` — Public portfolio (React SPA)
- `admin-dashboard/` — Admin UI for managing content
- `Server/` — Express API + PostgreSQL
- `images/` — Static image assets

### Tech Stack

**Frontend:**
- React 19, React Three Fiber (R3F), Three.js
- Tailwind CSS v4, Framer Motion
- Lenis smooth scroll, react-icons
- Vite 8

**Admin Dashboard:**
- React 19, Tailwind CSS v4, Framer Motion
- React Router v7, Axios

**Backend:**
- Node.js, Express
- PostgreSQL (Neon)
- JWT authentication, Nodemailer
- express-rate-limit

**Deployment:**
- Frontend: Vercel
- Backend: Render

### Features
- Cinematic hero with 3D scene (CyberSphere + orbiting tech icons)
- Smooth scroll with Lenis, custom cursor, parallax backgrounds
- Sections: About, Skills (infinite logo carousel), Experience (timeline), Projects (card grid + modal), Contact
- Admin dashboard with CRUD for projects, skills, experiences, resume, messages
- Contact form with database persistence
- Open Graph, Twitter Card, and JSON-LD structured data
- SEO: robots.txt, sitemap.xml, custom 404 page

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
- Use a Gmail app password for SMTP.
- Keep `.env` out of version control.

### Install Dependencies

Backend:
```
cd Server && npm install
```

Frontend:
```
cd Client && npm install
```

Admin Dashboard:
```
cd admin-dashboard && npm install
```

### Run Locally

Start the API:
```
cd Server && npm run dev
```

Start the frontend:
```
cd Client && npm run dev
```

Start the admin dashboard:
```
cd admin-dashboard && npm run dev
```

### Admin Login
The backend restricts login to a single admin email:
- Email: `admin@gmail.com`
- Password: must match the stored hash in the `admins` table

If login fails, reset the admin password hash using:
```
cd Server && node scripts/resetAdminPassword.js admin@gmail.com yourNewPassword
```

### API Overview
Base URL (local): `http://localhost:5000`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects` | No | List all projects |
| POST | `/api/projects` | Yes | Create project |
| PUT | `/api/projects/:id` | Yes | Update project |
| DELETE | `/api/projects/:id` | Yes | Delete project |
| GET | `/api/skills` | No | List all skills |
| POST | `/api/skills` | Yes | Create skill |
| PUT | `/api/skills/:id` | Yes | Update skill |
| DELETE | `/api/skills/:id` | Yes | Delete skill |
| GET | `/api/experiences` | No | List all experiences |
| POST | `/api/experiences` | Yes | Create experience |
| PUT | `/api/experiences/:id` | Yes | Update experience |
| DELETE | `/api/experiences/:id` | Yes | Delete experience |
| GET | `/api/resume` | No | Get resume URL |
| PUT | `/api/resume` | Yes | Update resume URL |
| POST | `/api/auth/login` | No | Admin login |
| POST | `/api/contact` | No | Send contact message |
| GET | `/api/contact` | Yes | List all messages |
| DELETE | `/api/contact/:id` | Yes | Delete message |

### Deployment

Backend (Render):
1. Deploy `Server/` as a Web Service.
2. Set the same `Server/.env` variables in Render.
3. Copy the Render URL.

Frontend (Vercel):
1. Update API base URL in `Client/.env`:
   ```
   VITE_API_BASE_URL=https://your-render-url.onrender.com
   ```
2. Deploy `Client/` as a static site.

### Post-Deployment Checklist
- Replace API base URL with the Render URL.
- Verify admin login works.
- Add a new project/skill/experience via the dashboard and verify it appears on the public site.
- Send a contact message and confirm it appears in the dashboard.
- Verify OG tags render correctly using [OpenGraph debugger](https://www.opengraph.xyz/).

### Notes
- Keep folder casing consistent (`Database/`) when deploying to Linux.
- Contact form saves to DB first, then sends email notification in background.
