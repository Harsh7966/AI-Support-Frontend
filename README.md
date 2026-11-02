# AI Support Desk — Frontend

Web app for an AI-powered customer support platform, with separate portals for **customers**, **agents** and **admins**. Built with Next.js and connected to the AI Support Backend API.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **State:** Redux Toolkit (auth)
- **HTTP:** Axios (with automatic bearer-token interceptor)
- **Real-time:** Socket.IO client
- **UI feedback:** react-toastify

## Portals and Features

**Customer** (`/user`)
- Dashboard with live ticket stats and recent tickets
- Create and track tickets, view ticket details and chat with the assigned agent
- AI Assistant that answers from the knowledge base before you open a ticket
- Profile

**Agent** (`/agent`)
- Dashboard with assigned-ticket stats
- Assigned tickets list and detail view (status/priority updates, real-time chat)
- AI tools: ticket summary, suggested reply, similar tickets, ask-assistant
- Profile

**Admin** (`/admin`)
- Overview dashboard
- Manage tickets, customers, agents and categories
- Knowledge base management
- AI Monitoring (usage, cost) and AI Settings
- Profile

All portals include role-based login and a Logout button.

## Project Structure

```
src/
├── app/
│   ├── admin/        Admin pages and layout
│   ├── agent/        Agent pages
│   ├── user/         Customer pages
│   ├── login/        Login
│   └── signup/       Customer signup
├── component/        Shared UI (PortalShell, ChatThread, LogoutButton, Table, Toasts...)
├── services/         API clients (axios, auth, admin, agent, customer, AI, socket)
└── store/            Redux store and auth slice
```

## Getting Started

### Prerequisites

- Node.js 20.9 or newer (required by Next.js; set in `engines`)
- The backend running (see the backend README)

### Installation

```bash
npm install
cp .env.example .env
```

### Environment Variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Backend API base URL, e.g. `http://localhost:5050/api/v1` |
| `NEXT_PUBLIC_SOCKET_URL` | Backend socket URL, e.g. `http://localhost:5050` |

### Run

```bash
npm run dev      # development at http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint     # lint
```

## How Auth Works

Login returns a JWT that is saved in `localStorage` and attached to every API request by the Axios interceptor. The user's role (`user`, `agent`, `admin`) decides which portal they are redirected to. Logout removes the token, disconnects the socket and returns to `/login`.

## Notes

- Start the backend first and make sure `FRONTEND_URL` in the backend `.env` matches this app's origin, otherwise requests are blocked by CORS.
- This project uses a recent Next.js version with breaking changes from older releases; check `node_modules/next/dist/docs/` before changing framework-level code.
