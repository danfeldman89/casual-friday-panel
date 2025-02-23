# User, Roles, Permissions, and Boosters Management System

## Overview

This project serves as a robust and streamlined web-based application for managing **users**, **roles**, **permissions**, and **game boosters**. Designed to be flexible, it utilizes **React** and **MUI (Material-UI)** for an intuitive and customizable user experience. The system includes a **permission-based admin panel**, allowing controlled access to view and edit various system features.

## Features

- **User Management**: Create, edit, and manage users with assigned roles and permissions.
- **Role Management**: Manage roles and their associated permissions using a dynamic table view.
- **Permission Control**: Ensure granular access to resources, defining what users can "read" or "write." Permissions are strictly enforced.
- **Boosters Management**: Handle game boosters with options to create or edit their configurations within assigned catalogs.
- **Permission-Based Admin Panel**: Secure authentication mechanism that governs user access based on their roles and permissions.
- **Tab-Based Navigation**: Ensures smooth switching between **Admin Panel** and **Boosters Management** for enhanced usability.

## Key Design and Implementation Details

### Minimal UI Customization
The primary focus of this project was on **code design, logic implementation, and routing**, rather than extensive custom styling. The interface relies on **Material-UI (MUI)** components with minimal visual customization. This approach ensures a professional and consistent design while reducing the time spent on elaborate styles, allowing deeper focus on creating efficient, reusable, and well-organized components.

### Tab-Based Navigation
Navigation is efficiently handled using **MUI Tabs**, which dynamically adjust based on the logged-in user’s permissions. This design provides a clean and responsive user experience, enabling seamless switching between **Admin Panel** and **Boosters Management** sections.

### Permission-Controlled Access
The admin panel and various features (like editing or deleting roles, users, or boosters) are based on permissions assigned to users. The project uses helper functions like `isAdmin` and `isPermitted` to strictly enforce role-based access control, ensuring secure and appropriate access for different user types.

### Routing and Component Logic
The routing structure is managed using `react-router-dom`, enabling clear definition and navigation between pages. Multiple controlled components handle the creation, editing, and deletion of users, roles, boosters, and permissions while adhering to reusable logic.

### Backend Assumptions
This project assumes the backend runs on `http://localhost:200`. All API calls for retrieving and managing users, roles, permissions, and boosters are directed to endpoints hosted on this base URL. Ensure the backend is active and properly configured to avoid errors during runtime.

## Folder Structure

- **Components**: Modular and reusable UI components like `RolesTable`, `BoostersTable`, and `TabPanel`.
- **Pages**: Page-level components for creating and editing resources, such as users, roles, permissions, and boosters.
- **Types**: TypeScript interfaces for system entities such as `User`, `Role`, `Permission`, and `Booster`.
- **Hooks**: Includes utilities like `useCurrentUser` to access the logged-in user's information and context.
- **State Management**: Uses **Redux Toolkit** to handle the state of resources like users, roles, and boosters efficiently across the app.

## How to Use the Application

### Running the Project
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Ensure the backend is running on `http://localhost:200`. Once confirmed, access the app at `http://localhost:5137`.

### Using the Admin Panel
1. Log into the system with a valid admin account.
2. The admin interface includes:
   - Tabs for navigating between **Admin Panel** and **Boosters Management**.
   - Permission-based access control for managing users, roles, permissions, and boosters.

### Permission-Based Actions
- **Add New Data**: Use the **Add** buttons (e.g., Add Role, Add Booster) to create entries.
- **Edit Entries**: Use the **Edit** button in tables to modify data.
- **Delete Entries**: Use the **Delete** button to remove an entry (requires appropriate permissions).

## Technology Stack

- **Frontend Framework**: React (v19) with TypeScript
- **UI Library**: Material-UI (MUI) for components and icons
- **Routing**: react-router-dom
- **State Management**: Redux Toolkit
- **Utilities**: MUI Icons, Custom Hooks, Protected Routes

## Design Philosophy

This project prioritizes:
- **Code Quality & Reusability**: Focused on modular, maintainable, and reusable components rather than heavy styling.
- **Extensibility**: Easily expandable to support more features or modules without significant rewrites.
- **Security**: Strong emphasis on role-based access control (RBAC) with permissions governing actions like viewing, editing, and deleting.
- **Minimalistic UI Design**: Default MUI styles were used with minimal customization, showcasing clean visual simplicity and a strong focus on functionality.

---
