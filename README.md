# User Management Dashboard

A modern, responsive user management dashboard built with React, TypeScript, and Redux Toolkit. This application allows you to view, add, edit, and delete users with a beautiful dark/light mode interface.

## Features

- **User Management**: View, create, edit, and delete users
- **Real-time Data**: Fetches user data from JSONPlaceholder API
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Form Validation**: Client-side validation for user input
- **Modern UI**: Beautiful gradients, animations, and icons using Lucide React
- **State Management**: Redux Toolkit for predictable state management
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, Custom CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Data Table**: TanStack Table
- **Linting**: ESLint with TypeScript support

## Folder Structure

```
user-dashboard/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Dashboard/
│   │   │   └── Dashboard.tsx
│   │   ├── Layout/
│   │   │   └── Footer.tsx
│   │   ├── UserForm/
│   │   │   └── UserForm.tsx
│   │   └── UserTable/
│   │       └── UserTable.tsx
│   ├── redux/
│   │   ├── store.ts
│   │   └── userSlice.ts
│   ├── services/
│   │   └── apiService.ts
│   ├── styles/
│   │   ├── components.css
│   │   └── main.css
│   ├── types/
│   │   └── user.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Installation and Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Steps to Run Locally

1. **Clone the repository** or navigate to the project directory:
   ```bash
   cd user-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173` (or the port shown in the terminal).

### Build for Production

To build the project for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

### Linting

To run ESLint for code quality checks:

```bash
npm run lint
```

## Usage

- **View Users**: The dashboard displays all users in a responsive table format.
- **Add User**: Click the "Add User" button to open the form and create a new user.
- **Edit User**: Click the edit icon in the user table to modify existing user details.
- **Delete User**: Click the delete icon to remove a user (with confirmation).
- **Refresh Data**: Use the refresh button to reload user data from the API.
- **Toggle Theme**: Switch between dark and light modes using the theme toggle button.

## API

The application uses the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API for user data:

- `GET /users` - Fetch all users
- User data includes: id, name, email, phone, website, company

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

Made by Manya Shukla 2025
