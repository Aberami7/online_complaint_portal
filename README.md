                                    Online Complaint and Grievance Portal

A full-stack web application designed to digitize and streamline institutional grievance handling with improved transparency, accountability, and analytics-driven insights.

📌 Project Overview 📌

The Online Complaint and Grievance Portal is a centralized platform that enables users to submit, track, and manage complaints efficiently.

The system provides:

-Transparent complaint tracking

-Automated escalation for unresolved issues

-Structured administrative workflow management

-Reporting and analytics for data-driven decision-making

🚀 Key Features 🚀

👤 User Features 👤

-Anonymous and verified complaint submission

-Secure file upload (images/documents)

-Unique tracking ID for anonymous users

-Real-time complaint status timeline

-Personal complaint history dashboard

🛠 Admin Features 🛠

-Role-based secure authentication

-Centralized complaint management dashboard

-Assign complaints to relevant departments

-Add public comments and update complaint status

-SLA-based automated escalation system

-Reports and CSV export functionality

🏗 Architecture 🏗 

This project follows a 3-Tier Architecture:

Presentation Layer (Frontend) – React

Application Layer (Backend) – Node.js & Express.js

Data Layer (Database) – MySQL

🛠 Tech Stack🛠

Frontend-React,HTML5,CSS3,JavaScript 

Backend-Node.js,Express.js,RESTful APIs

Database-MySQL

📊 Core Modules📊

-Authentication System

-Complaint Submission Module

-Status Tracking & Timeline

-Admin Workflow Management

-Escalation Logic (SLA Monitoring)

-Reporting & Analytics Dashboard

** System Workflow **

1️⃣ Complaint Submission

User selects submission type (Anonymous / Verified Login)
         ---->
Fills complaint form (Category, Urgency, Description)
         ---->
Uploads supporting documents (optional)
         ---->
System validates input
         ---->
Complaint is stored in the database
         ---->
Unique Tracking ID is generated (for anonymous users)
         ---->
Initial status set to “Submitted”

2️⃣ Complaint Processing

Complaint appears in the Admin Dashboard
            ---->
Admin reviews complaint details
            ---->
Admin assigns complaint to relevant department
            ---->
Status updated to “Under Review”
            ---->
Public comments can be added for user visibility
            ---->
All updates are recorded in the StatusLogs table

3️⃣ Status Tracking

-User logs in (or enters tracking ID)
             
-System fetches complaint data via REST API

-Real-time status timeline is displayed


** User can view:

-Current status

-Previous updates

-Admin comments

-Resolution details

4️⃣ SLA Monitoring & Escalation

-A scheduled server job (node-cron) runs periodically

-System checks complaints exceeding SLA (e.g., 7 days)

If SLA breached:

-Complaint is automatically flagged

-Status updated to “Escalated”

-Assigned to higher authority

-Escalation entry stored in Escalations table

5️⃣ Resolution & Closure

-Admin marks complaint as “Resolved”

-Resolution comments added

-User notified through dashboard

-Complaint lifecycle completed

-Data retained for reporting & analytics

🔁 End-to-End Flow Summary

User Submission
➡️
Database Storage
➡️
Admin Review & Assignment
➡️
Status Updates & Tracking
➡️
SLA Check & Escalation (if required)
➡️
Resolution & Reporting  


## 📸 Screenshots

---

### 👤 User Mode

                                              Home Page
<img src="https://github.com/user-attachments/assets/cf1dcdbc-d13e-4b80-a87d-e5c6ef632283" width="800" />

                                              User Login
<img src="https://github.com/user-attachments/assets/c89820bb-feaf-4b84-a0f3-07c8b985cd9a" width="800" />

                                              User Dashboard
<img src="https://github.com/user-attachments/assets/cebf095c-5ed2-48af-a0fc-66fc4a9089d1" width="800" />

                                              Submit Complaint
<img src="https://github.com/user-attachments/assets/02fb7787-67b4-43db-80d0-f2dfaece3dd9" width="800" />

                                              User Complaint Page
<img src="https://github.com/user-attachments/assets/3e0dbb54-bc78-4bb6-8401-cc89a224118e" width="800" />

                                               Status Tracking Page
<img src="https://github.com/user-attachments/assets/53084d47-22e7-499d-bbd3-9b3d9e11dcf6" width="800" />

---

### 🛠 Admin Mode

                                              Admin Login
<img src="https://github.com/user-attachments/assets/e3aae8e0-6919-4046-a2a9-b1bf752c5130" width="800" />

                                              Admin Dashborad
<img src="https://github.com/user-attachments/assets/851d4bcb-1d1b-4921-8bfe-23d0ec2df3de" width="800" />

                                              Complaint Page
<img src="https://github.com/user-attachments/assets/cfe8550a-bb40-43b1-aae8-4b3e6ac8f3e4" width="800" />

                                              Escalation Page
<img src="https://github.com/user-attachments/assets/33b6d171-684c-48f6-99ab-7d3f63fdbd10" width="800" />

                                              Report and Export Page
<img src="https://github.com/user-attachments/assets/0c1f9623-9fcf-4a84-ab59-bb448034dd7a" width="800" />



                                                                                        
















