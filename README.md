# Generic Practical Dashboard

A small AngularJS + Express + MongoDB CRUD project with a demo login, factory, and service.

## Start the server

1. Make sure MongoDB is installed and running.
2. Open a terminal in this extracted project folder.
3. Run `npm install` once.
4. Run `node server.js` to start the server. It does not open a browser automatically.
5. Manually enter `http://localhost:5210/login.html` in your browser for the login page.
6. After signing in, the app navigates to `/` (the dashboard). You can also manually open `http://localhost:5210/`.

Demo login: `admin` / `password`.

## Styling

- `public/login.css` styles only the minimal login page.
- `public/style.css` styles the dashboard.
- `login.html` links to `login.css`; `index.html` links to `style.css`.

If edits do not appear, make sure you are running `node server.js` from this extracted folder, then use Ctrl+C and restart the server if you changed server.js. For HTML/CSS changes, save the file and hard-refresh with Ctrl+F5. Check that you edited files inside this project's `public` folder.

## Generic fields

The dashboard uses two generic fields: `name` and `detail`. For a new topic, change the labels in `public/app.js`. If the actual stored fields change, update the Mongoose schema and API routes in `server.js`, form bindings in `public/index.html`, and the matching factory/service methods as needed.

## Main files

- `server.js`: Express API and MongoDB schema/routes
- `public/login.html`, `public/login.js`, `public/login.css`: login page
- `public/index.html`, `public/app.js`, `public/style.css`: dashboard
- `public/app.module.js`: declares AngularJS module
- `public/recordService.js`: API service
- `public/recordFactory.js`: factory wrapping service calls

The demo login is for a college practical only; it is not production-grade authentication, and API routes are not protected by server-side sessions.
