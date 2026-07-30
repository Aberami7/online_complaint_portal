<div align="center">

# 📢 Smart Grievance and Feedback Management System

### Transparent • Secure • Automated • Analytics Driven

<img src="https://img.icons8.com/?size=100&id=kCnN5ALrk9Q0&format=png&color=000000" width="90"/>

A full-stack web application designed to digitize and streamline institutional grievance handling with improved transparency, accountability, and analytics-driven insights.

</div>

---

## 📌 Project Overview

The Smart Grievance and Feedback Management System is a centralized platform that enables users to submit, track, and manage complaints efficiently.

| | |
|---|---|
| 🔍 **Transparent Tracking** | Users can monitor complaint progress with real-time updates. |
| ⚡ **Automated Escalation** | Unresolved issues are escalated automatically based on SLA rules. |
| 🏢 **Workflow Management** | Structured administrative workflow for efficient complaint handling. |
| 📊 **Analytics Insights** | Reports and analytics support better decision making. |

---

## 🚀 Key Features

### 👤 User Features
- Anonymous and verified complaint submission
- Secure file upload (images/documents)
- Unique tracking ID for anonymous users
- Real-time complaint status timeline
- Personal complaint history dashboard

### 🛠 Admin Features
- Role-based secure authentication
- Centralized complaint management dashboard
- Assign complaints to relevant departments
- Add public comments and update complaint status
- SLA-based automated escalation system
- Reports and CSV export functionality

---

## 🏗️ System Architecture

This project follows a **3-Tier Architecture** for scalable and maintainable application development.

| Layer | Description |
|---|---|
| 🎨 **Presentation Layer** | React.js Frontend — User interface & interaction |
| ⚙️ **Application Layer** | Node.js + Express.js — RESTful API services |
| 🗄️ **Data Layer** | MySQL — Secure data storage |

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js, REST APIs |
| Database | MySQL |
| Scheduler | Node Cron |

---

## 📊 Core Modules

| Module | Description |
|---|---|
| 🔐 Authentication | Secure login and role-based access control |
| 📝 Complaint Module | Submit and manage complaints efficiently |
| 📍 Tracking | Real-time complaint status timeline |
| 🛠 Admin Workflow | Department assignment and management |
| ⏳ SLA Monitoring | Automatic escalation handling |
| 📈 Analytics | Reports and data-driven insights |

---

## 🔄 End-to-End System Workflow

### 1️⃣ Complaint Submission
User selects submission type → fills complaint details → uploads documents → complaint stored in database → tracking ID generated → status set as **Submitted**.

### 2️⃣ Complaint Processing
Complaint appears in admin dashboard → admin reviews complaint → assigns department → status updated to **Under Review** → comments and updates recorded.

### 3️⃣ Status Tracking
User logs in / enters tracking ID → system fetches complaint data via REST API → real-time timeline displayed, showing:
- Current status
- Previous updates
- Admin comments
- Resolution details

### 4️⃣ SLA Monitoring & Escalation
Scheduled Node Cron job runs periodically → checks SLA-exceeded complaints → complaint marked as **Escalated** → assigned to higher authority → escalation record stored.

### 5️⃣ Resolution & Closure
Admin marks complaint as **Resolved** → resolution comments added → user notified → data retained for analytics.

---

## 🔁 Flow Summary

```
👤 User Submission
        ⬇
💾 Database Storage
        ⬇
👨‍💼 Admin Review & Assignment
        ⬇
📍 Status Updates & Tracking
        ⬇
⏳ SLA Check & Escalation
        ⬇
✅ Resolution & Reporting
```

---

## 📸 Application Showcase

Explore the complete user and admin journey of the Smart Grievance and Feedback Management System.

### 👤 User Mode

| Screen | Preview |
|---|---|
| 🏠 Home Page | <img width="500" src="https://github.com/user-attachments/assets/87319f85-7ba1-49d9-aa50-f94ce67e9327"/> |
| 🔐 User Login | <img width="500" src="https://github.com/user-attachments/assets/ef90ebf7-81c5-429d-bb7e-d73e5abb4010"/> |
| 📊 User Dashboard | <img width="500" src="https://github.com/user-attachments/assets/90b12578-5b00-42eb-a143-8498d754798f"/> |
| 📝 Submit Complaint | <img width="500" src="https://github.com/user-attachments/assets/c456ec99-58ab-44c7-a7d5-dc8928749837"/> |
| 📄 User Complaint Page | <img width="500" src="https://github.com/user-attachments/assets/4224b4b8-b666-49c3-989a-d6da2eeb9bc5"/> |
| 📍 Status Tracking Page | <img width="500" src="https://github.com/user-attachments/assets/c4f42c75-1b7a-42e3-84c8-3fb0c3fd11a4"/> |

### 🛠 Admin Mode

| Screen | Preview |
|---|---|
| 🔐 Admin Login | <img width="500" src="https://github.com/user-attachments/assets/1e497696-d409-4a74-993b-45b375e18118"/> |
| 📊 Admin Dashboard | <img width="500" src="https://github.com/user-attachments/assets/46dd55e2-a08c-4edb-b17f-0d8bc5f54d08"/> |
| 📋 Complaint Management | <img width="500" src="https://github.com/user-attachments/assets/3eaee20b-cf21-4151-80ae-3326cf6bd8b9"/> |
| 🚨 Escalation Management | <img width="500" src="https://github.com/user-attachments/assets/a3d538e6-c9ee-469a-8eba-225cf475f147"/> |
| 📈 Reports & Export | <img width="500" src="https://github.com/user-attachments/assets/e875d1ba-e598-4d67-927c-a94e8c1e4437"/> |

---

## ⭐ Project Highlights

| | |
|---|---|
| 🔒 **Privacy Protection** | Protects user complaint data with secure access control and authentication. |
| ⚡ **Automated Workflow** | SLA monitoring and escalation reduce manual follow-up efforts. |
| 📊 **Analytics Driven** | Provides reports and insights for better institutional decisions. |
| 📝 **Smart Complaint Handling** | Complete lifecycle management from submission to resolution. |
| 🏢 **Department Management** | Efficient assignment and tracking across departments. |
| 🚀 **Scalable Platform** | Designed with modern full-stack technologies. |

---

## 🚀 Future Enhancements

### 🤖 Artificial Intelligence
- AI-based complaint categorization
- Sentiment analysis of complaints
- Priority prediction using machine learning
- Smart response suggestions

### 📱 Mobile Platform
- Android application
- iOS application
- Push notifications
- Multi-language support

### 🔐 Advanced Security
- Two-factor authentication
- Data encryption
- Audit log monitoring
- Advanced access control

### 📊 Advanced Analytics
- Predictive complaint trends
- Department performance analysis
- Real-time dashboards
- Automated insights

---

<div align="center">

## 🏁 Project Journey Complete

<img src="https://img.icons8.com/?size=100&id=kCnN5ALrk9Q0&format=png&color=000000" width="70"/>

### Thank you for exploring the Smart Grievance and Feedback Management System.

*Building transparent solutions through technology.*

</div>
