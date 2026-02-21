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
<img width="1905" height="893" alt="Screenshot 2026-02-21 172433" src="https://github.com/user-attachments/assets/87319f85-7ba1-49d9-aa50-f94ce67e9327" />


                                              User Login
<img width="1900" height="893" alt="Screenshot 2026-02-21 172451" src="https://github.com/user-attachments/assets/ef90ebf7-81c5-429d-bb7e-d73e5abb4010" />


                                              User Dashboard
<img width="1867" height="894" alt="Screenshot 2026-02-21 172507" src="https://github.com/user-attachments/assets/90b12578-5b00-42eb-a143-8498d754798f" />


                                              Submit Complaint
<img width="1871" height="901" alt="Screenshot 2026-02-21 172540" src="https://github.com/user-attachments/assets/c456ec99-58ab-44c7-a7d5-dc8928749837" />


                                              User Complaint Page
<img width="1870" height="908" alt="Screenshot 2026-02-21 172602" src="https://github.com/user-attachments/assets/4224b4b8-b666-49c3-989a-d6da2eeb9bc5" />


                                               Status Tracking Page
<img width="1877" height="889" alt="Screenshot 2026-02-21 174123" src="https://github.com/user-attachments/assets/c4f42c75-1b7a-42e3-84c8-3fb0c3fd11a4" />


---

### 🛠 Admin Mode

                                              Admin Login
<img width="1892" height="895" alt="Screenshot 2026-02-21 172630" src="https://github.com/user-attachments/assets/1e497696-d409-4a74-993b-45b375e18118" />


                                              Admin Dashborad
<img width="1878" height="875" alt="Screenshot 2026-02-21 172650" src="https://github.com/user-attachments/assets/46dd55e2-a08c-4edb-b17f-0d8bc5f54d08" />


                                              Complaint Page
<img width="1870" height="899" alt="Screenshot 2026-02-21 172716" src="https://github.com/user-attachments/assets/3eaee20b-cf21-4151-80ae-3326cf6bd8b9" />


                                              Escalation Page
<img width="1892" height="899" alt="Screenshot 2026-02-21 172801" src="https://github.com/user-attachments/assets/a3d538e6-c9ee-469a-8eba-225cf475f147" />


                                              Report and Export Page
<img width="1881" height="906" alt="Screenshot 2026-02-21 172817" src="https://github.com/user-attachments/assets/e875d1ba-e598-4d67-927c-a94e8c1e4437" />




                                                                                        
















