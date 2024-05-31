# Final_Project

## Content Management System (CMS) Backend

This project implements a robust backend for a Content Management System (CMS) built with Node.js, Express, MongoDB, and JWT authentication. It allows users to create, edit, and delete content, with secure role-based access control (RBAC) for different user types.

**Key Features:**

* **CRUD Operations:** Create, Read, Update, and Delete content.
* **Role-Based Access Control (RBAC):**
    * Admin: Full access to users and content management.
    * Editor: Create, edit, and delete content (including their own).
    * Viewer: View all published content.
* **RESTful API:** Provides well-defined API endpoints for user and content management.
* **MongoDB:** Stores user data and content securely.
* **JWT Authentication:** Secure user login and authorization.
* **Version Control (Git):** Facilitates collaboration and project management.

**Project Highlights:**

* Secure password hashing with bcrypt.
* User registration and login functionalities.
* User management for admins (create, edit, delete users).
* Detailed content management for editors and admins.
* Content visibility based on user roles.

**API Endpoints:**

* User Management:
    * Register a new user.
    * Login and obtain JWT token.
    * (Admin only) Manage user accounts (CRUD operations).
* Content Management:
    * (Editor/Admin) Create new content.
    * (Editor/Admin) Edit existing content.
    * (Editor/Admin) Delete content.
    * View all published content (all user roles).

**This backend provides a solid foundation for building a feature-rich and secure CMS application.**
