# Jira-Task-Dashboard

📊 Jira Task Dashboard

A React-based dashboard for viewing and managing tasks assigned to a user via the Jira REST API. Features secure authentication, real-time editing, task filtering/sorting, and a responsive UI.

🚀 Features

✅ User Authentication

Custom login screen (email & password)

Simulated login via:

Local/mock user credentials (JSON or mock API)

Optional: Jira Personal Access Token-based login

JWT-based session handling with token expiry, refresh, and secure logout

✅ Jira Task Display
Fetch tasks via Jira REST API for the authenticated user

Task fields displayed:

Project Name

Task Summary

Task Key

Task Status

Task Priority

Sprint Name (if available)

Sorting by:

Project priority (high to low)

Task priority (high to low)

✅ Task Management
Inline editing (status, summary, etc.)

Instant UI updates upon successful change

Real-time task update via Jira REST API

✅ Core Functionality
Secure login/logout with token management

Task fetching, displaying, sorting, and filtering

Inline task editing synced with Jira

🛠 Tech Stack
Category	Technology
Frontend	React.js + TypeScript
UI Framework	Tailwind CSS, Radix UI, Framer Motion
Authentication	JWT + localStorage
Routing	React Router DOM
API Integration	Jira REST API (via Fetch/Axios)
Notifications	Toasts (optional)
State Management	React Hooks (or Redux if preferred)

📦 Setup Instructions

1. Clone & Install

git clone https://github.com/yadu1999/Jira-Task-Dashboard.git
cd jira-task-dashboard
npm install

2. Start Development Server

npm run dev
App will be available at: http://localhost:5173