# Final_Project

Content Management System (CMS)


Project Overview
In this project, you will develop a backend for a Content Management System (CMS). The CMS will allow users to create, edit, and delete content. It will also include role-based access control to manage different types of users and their permissions.

Project Goals
Implement a robust CMS backend with fundamental CRUD operations.
Ensure secure role-based access control (RBAC) for different user roles.
Design and develop RESTful APIs for the CMS functionalities.
Use MongoDB for database management.

Technologies
Backend Framework: Node.js with Express
Database: MongoDB
Authentication: JSON Web Tokens (JWT)
Version Control: Git

Project Requirements

User Management

User Registration and Authentication: Users should be able to register and log in.
User Roles: Implement at least three roles: Admin, Editor, and Viewer.
Admin: Full access to all functionalities, including user management.
Editor: Can create, edit, and delete content.
Viewer: Can only view content.

Content Management

Create Content: Allow Editors and Admins to create new content.
Edit Content: Allow Editors and Admins to edit existing content.
Delete Content: Allow Editors and Admins to delete content.
View Content: Allow all users (including Viewers) to view content.
Detailed User Roles and Permissions

Admin:

Manage users (create, view, update, delete).
Manage all content (create, view, update, delete).

Editor:

Manage content they created (create, view, update, delete).
View all content.

Viewer:

View all content.
API Endpoints: come up with needed api endpoints 
Database Schema: come up with suitable schema that works for you

Security

Authentication: Use JWT for user authentication.
Authorization: Implement middleware to check user roles for accessing different endpoints.
Password Management: Store passwords securely using hashing (e.g., bcrypt).
