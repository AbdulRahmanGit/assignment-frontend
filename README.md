# Assignment Submission Portal - Frontend

## Overview
The **Assignment Submission Portal** frontend is a user-friendly interface designed to interact seamlessly with the backend system, enabling users and admins to manage assignment submissions efficiently. It is deployed and accessible at the following link:  

**[Assignment Submission Portal](https://assignment-frontend-tau.vercel.app/)**

The frontend communicates with the backend API to provide functionalities such as assignment uploads, user and admin management, and assignment status tracking. Additionally, the system uses **Google Cloud Storage** for securely storing assignment files, ensuring scalability and reliability.

---

## Features

### User Features:
- **Registration and Login**  
  Users can register and log in securely to access the platform.
- **Upload Assignments**  
  Users can upload assignments in PDF format and associate them with specific admins. The files are stored in **Google Cloud Storage**.
- **View Admins**  
  Users can browse the list of registered admins to select the appropriate one for tagging assignments.
- **Track Assignments**  
  Users can view their previously submitted assignments, including their status (Pending, Accepted, or Rejected).

### Admin Features:
- **Registration and Login**  
  Admins can register and log in securely.
- **Manage Assignments**  
  Admins can view assignments tagged to them, including details such as:
  - Submitter's username.
  - Task description.
  - Submission date and time.
- **Accept/Reject Assignments**  
  Admins can manage the workflow by accepting or rejecting assignments directly.

### General Features:
- **Google Cloud Storage Integration**  
  Assignments are securely uploaded and stored in a cloud bucket, allowing efficient handling of large files.
- **API Integration**  
  The frontend communicates with a modular and scalable backend system to handle user and admin requests.
- **Dynamic UI Updates**  
  Assignment status updates (e.g., Accepted, Rejected) are displayed in real time.
- **Responsive Design**  
  The UI is fully responsive and optimized for different screen sizes.

---

## Frontend-Backend Communication

### API Endpoints
The frontend communicates with the backend using RESTful API calls. Key interactions include:

#### User Endpoints:
- **Register/Login**: Authenticate users and create new accounts.
- **Upload Assignments**: Upload assignment files to **Google Cloud Storage** and save metadata in the backend.
- **Fetch Admins**: Display a list of registered admins to users.
- **View Assignments**: Fetch the list of assignments submitted by the user.

#### Admin Endpoints:
- **Register/Login**: Authenticate admins and create new accounts.
- **View Assignments**: Display assignments tagged to the logged-in admin.
- **Accept/Reject Assignments**: Update assignment status.

---

## Google Cloud Storage Integration

### How It Works:
1. **File Uploads**:
   - Assignments are uploaded from the frontend as PDFs.
   - The files are sent to the backend, which uses **@google-cloud/storage** to store them securely in a designated bucket.
2. **File Metadata**:
   - The backend generates a public URL for each uploaded file and saves it in the database.
   - This URL is accessible via API calls for admins to review or download assignments.
3. **Security and Scalability**:
   - Files are stored securely, with controlled access using service account credentials.
   - Google Cloud Storage ensures high availability and durability for stored files.

### Benefits of Google Cloud Storage:
- **Reliability**: Ensures files are safe and accessible.
- **Scalability**: Handles large file uploads and high request volumes.
- **Integration**: Works seamlessly with backend systems for efficient storage and retrieval.

---

## Deployment and Usage

### Deployed Link:
The frontend is live and accessible at:  
**[Assignment Submission Portal](https://assignment-frontend-tau.vercel.app/)**

### How to Use:
1. **User Workflow**:
   - Register or log in.
   - View the list of admins and upload assignments tagged to specific admins.
   - Track assignment statuses on the dashboard.
2. **Admin Workflow**:
   - Register or log in.
   - View assignments tagged to you.
   - Accept or reject submissions and update their status.

---

## Future Enhancements
1. **OAuth2 Authentication**: Enhance security using Google or other third-party authentication services.
2. **Pagination**: Improve data navigation for large datasets.

---

## Summary
This frontend for the **Assignment Submission Portal** provides a streamlined user experience for managing assignment workflows. With a secure backend, scalable Google Cloud Storage integration, and a responsive interface, the portal serves as a robust platform for students and administrators. The modular structure ensures easy updates and scalability for future requirements.
