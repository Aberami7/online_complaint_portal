<div align="center">

# 📢 Smart Grievance and Feedback Management System

### Transparent • Secure • Automated • Analytics Driven

![React](https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=20232A)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

<img src="https://img.icons8.com/?size=100&id=kCnN5ALrk9Q0&format=png&color=000000" width="90"/>

A full-stack web application designed to digitize and streamline institutional grievance handling with improved transparency, accountability, and analytics-driven insights.

</div>

---

## 📌 Project Overview

<div align="center">

![Overview](https://img.shields.io/badge/PROJECT-OVERVIEW-6C63FF?style=for-the-badge&labelColor=1a1a2e)

</div>

The Smart Grievance and Feedback Management System is a centralized platform that enables users to submit, track, and manage complaints efficiently.

<div align="center">

| | |
|---|---|
| 🔍 **Transparent Tracking** | Users can monitor complaint progress with real-time updates. |
| ⚡ **Automated Escalation** | Unresolved issues are escalated automatically based on SLA rules. |
| 🏢 **Workflow Management** | Structured administrative workflow for efficient complaint handling. |
| 📊 **Analytics Insights** | Reports and analytics support better decision making. |

</div>

---

## 🚀 Key Features

<div align="center">

![Features](https://img.shields.io/badge/KEY-FEATURES-FF6B35?style=for-the-badge&labelColor=1a1a2e)

</div>

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

<div align="center">

![Architecture](https://img.shields.io/badge/SYSTEM-ARCHITECTURE-00B894?style=for-the-badge&labelColor=1a1a2e)

</div>

This project follows a **3-Tier Architecture** for scalable and maintainable application development.

<div align="center">

| Layer | Description |
|---|---|
| 🎨 **Presentation Layer** | React.js Frontend — User interface & interaction |
| ⚙️ **Application Layer** | Node.js + Express.js — RESTful API services |
| 🗄️ **Data Layer** | MySQL — Secure data storage |

</div>

---

## 🛠️ Technology Stack

<div align="center">

![Tech Stack](https://img.shields.io/badge/TECHNOLOGY-STACK-0984E3?style=for-the-badge&labelColor=1a1a2e)

</div>

<div align="center">

| Layer | Technology |
|---|---|
| Frontend | React.js, HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js, REST APIs |
| Database | MySQL |
| Scheduler | Node Cron |

</div>

---

## 📊 Core Modules

<div align="center">

![Core Modules](https://img.shields.io/badge/CORE-MODULES-FDCB6E?style=for-the-badge&labelColor=1a1a2e)

</div>

<div align="center">

| Module | Description |
|---|---|
| 🔐 Authentication | Secure login and role-based access control |
| 📝 Complaint Module | Submit and manage complaints efficiently |
| 📍 Tracking | Real-time complaint status timeline |
| 🛠 Admin Workflow | Department assignment and management |
| ⏳ SLA Monitoring | Automatic escalation handling |
| 📈 Analytics | Reports and data-driven insights |

</div>

---

## 🔄 End-to-End System Workflow

<div align="center">

![Workflow](https://img.shields.io/badge/END_TO_END-WORKFLOW-D63031?style=for-the-badge&labelColor=1a1a2e)

</div>

<div align="center">

<table>

<tr>
<td align="center">

### 1️⃣ Complaint Submission

👤 User selects submission type
<br>⬇️<br>
📝 Fills complaint details
<br>⬇️<br>
📎 Uploads documents
<br>⬇️<br>
💾 Complaint stored in database
<br>⬇️<br>
🆔 Tracking ID generated
<br>⬇️<br>
✅ Status set as **Submitted**

</td>
</tr>

<tr>
<td align="center">

### 2️⃣ Complaint Processing

📋 Complaint appears in Admin Dashboard
<br>⬇️<br>
👨‍💼 Admin reviews complaint
<br>⬇️<br>
🏢 Assigns department
<br>⬇️<br>
🔄 Status updated to **Under Review**
<br>⬇️<br>
💬 Comments and updates recorded

</td>
</tr>

<tr>
<td align="center">

### 3️⃣ Status Tracking

👤 User logs in / enters tracking ID
<br>⬇️<br>
🔗 System fetches complaint data through REST API
<br>⬇️<br>
📍 Real-time timeline displayed

User can view:
<br>
✅ Current Status
<br>
✅ Previous Updates
<br>
✅ Admin Comments
<br>
✅ Resolution Details

</td>
</tr>

<tr>
<td align="center">

### 4️⃣ SLA Monitoring & Escalation

⏱ Scheduled Node Cron job runs periodically
<br>⬇️<br>
🔍 Checks SLA exceeded complaints
<br>⬇️<br>
🚨 Complaint marked as **Escalated**
<br>⬇️<br>
👨‍💼 Assigned to higher authority
<br>⬇️<br>
💾 Escalation record stored

</td>
</tr>

<tr>
<td align="center">

### 5️⃣ Resolution & Closure

✅ Admin marks complaint as **Resolved**
<br>⬇️<br>
💬 Resolution comments added
<br>⬇️<br>
🔔 User notified
<br>⬇️<br>
📊 Data retained for analytics

</td>
</tr>

</table>

</div>

---

## 🔁 Flow Summary

<div align="center">

![Flow Summary](https://img.shields.io/badge/FLOW-SUMMARY-74B9FF?style=for-the-badge&labelColor=1a1a2e)

</div>

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

<div align="center">

![Showcase](https://img.shields.io/badge/APPLICATION-SHOWCASE-E84393?style=for-the-badge&labelColor=1a1a2e)

</div>

Explore the complete user and admin journey of the Smart Grievance and Feedback Management System.

### 👤 User Mode

<div align="center">

| Screen | Preview |
|---|---|
| 🏠 Home Page | <img width="900" src="https://github.com/user-attachments/assets/87319f85-7ba1-49d9-aa50-f94ce67e9327"/> |
| 🔐 User Login | <img width="900" src="https://github.com/user-attachments/assets/ef90ebf7-81c5-429d-bb7e-d73e5abb4010"/> |
| 📊 User Dashboard | <img width="900" src="https://github.com/user-attachments/assets/90b12578-5b00-42eb-a143-8498d754798f"/> |
| 📝 Submit Complaint | <img width="900" src="https://github.com/user-attachments/assets/c456ec99-58ab-44c7-a7d5-dc8928749837"/> |
| 📄 User Complaint Page | <img width="900" src="https://github.com/user-attachments/assets/4224b4b8-b666-49c3-989a-d6da2eeb9bc5"/> |
| 📍 Status Tracking Page | <img width="900" src="https://github.com/user-attachments/assets/c4f42c75-1b7a-42e3-84c8-3fb0c3fd11a4"/> |

</div>

### 🛠 Admin Mode

<div align="center">

| Screen | Preview |
|---|---|
| 🔐 Admin Login | <img width="900" src="https://github.com/user-attachments/assets/1e497696-d409-4a74-993b-45b375e18118"/> |
| 📊 Admin Dashboard | <img width="900" src="https://github.com/user-attachments/assets/46dd55e2-a08c-4edb-b17f-0d8bc5f54d08"/> |
| 📋 Complaint Management | <img width="900" src="https://github.com/user-attachments/assets/3eaee20b-cf21-4151-80ae-3326cf6bd8b9"/> |
| 🚨 Escalation Management | <img width="900" src="https://github.com/user-attachments/assets/a3d538e6-c9ee-469a-8eba-225cf475f147"/> |
| 📈 Reports & Export | <img width="900" src="https://github.com/user-attachments/assets/e875d1ba-e598-4d67-927c-a94e8c1e4437"/> |

</div>

---

## ⭐ Project Highlights

<div align="center">

![Highlights](https://img.shields.io/badge/PROJECT-HIGHLIGHTS-FDCB6E?style=for-the-badge&labelColor=1a1a2e)

</div>

<div align="center">

| | |
|---|---|
| 🔒 **Privacy Protection** | Protects user complaint data with secure access control and authentication. |
| ⚡ **Automated Workflow** | SLA monitoring and escalation reduce manual follow-up efforts. |
| 📊 **Analytics Driven** | Provides reports and insights for better institutional decisions. |
| 📝 **Smart Complaint Handling** | Complete lifecycle management from submission to resolution. |
| 🏢 **Department Management** | Efficient assignment and tracking across departments. |
| 🚀 **Scalable Platform** | Designed with modern full-stack technologies. |

</div>

---

## 🚀 Future Enhancements

<div align="center">

![Future Enhancements](https://img.shields.io/badge/FUTURE-ENHANCEMENTS-6C5CE7?style=for-the-badge&labelColor=1a1a2e)

</div>

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

![Status](https://img.shields.io/badge/STATUS-COMPLETED-00B894?style=for-the-badge&labelColor=1a1a2e)

<img src="https://img.icons8.com/?size=100&id=kCnN5ALrk9Q0&format=png&color=000000" width="70"/>

### Thank you for exploring the Smart Grievance and Feedback Management System.

*Building transparent solutions through technology.*

</div>
