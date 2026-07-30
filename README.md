<div align="center">

<h1>📢 Smart Grievance and Feedback Management System</h1>

<h3>
Transparent • Secure • Automated • Analytics Driven
</h3>

<img src="https://img.icons8.com/?size=100&id=kCnN5ALrk9Q0&format=png&color=000000" width="100"/>

<br><br>

<p>
A full-stack web application designed to digitize and streamline institutional grievance handling with improved transparency, accountability, and analytics-driven insights.
</p>

</div>

---

<div align="center">

<table>
<tr>
<td align="center">

<h2>📌 Project Overview</h2>

The Smart Grievance and Feedback Management System is a centralized platform that enables users to submit, track, and manage complaints efficiently.

</td>
</tr>
</table>

</div>


<div align="center">

<table>

<tr>

<td width="50%" align="center">

<h3>🔍 Transparent Tracking</h3>

Users can monitor complaint progress with real-time updates.

</td>

<td width="50%" align="center">

<h3>⚡ Automated Escalation</h3>

Unresolved issues are escalated automatically based on SLA rules.

</td>

</tr>


<tr>

<td width="50%" align="center">

<h3>🏢 Workflow Management</h3>

Structured administrative workflow for efficient complaint handling.

</td>

<td width="50%" align="center">

<h3>📊 Analytics Insights</h3>

Reports and analytics support better decision making.

</td>

</tr>

</table>

</div>

---

<div align="center">

<h2>🚀 Key Features</h2>

</div>


<table>

<tr>

<td width="50%" align="center">

<h3>👤 User Features</h3>

<br>

✅ Anonymous and verified complaint submission

<br><br>

✅ Secure file upload (Images/Documents)

<br><br>

✅ Unique tracking ID for anonymous users

<br><br>

✅ Real-time complaint status timeline

<br><br>

✅ Personal complaint history dashboard

</td>


<td width="50%" align="center">

<h3>🛠 Admin Features</h3>

<br>

✅ Role-based secure authentication

<br><br>

✅ Centralized complaint management dashboard

<br><br>

✅ Assign complaints to relevant departments

<br><br>

✅ Add public comments and update complaint status

<br><br>

✅ SLA-based automated escalation system

<br><br>

✅ Reports and CSV export functionality

</td>

</tr>

<div align="center">

<h2>🏗️ System Architecture</h2>

<p>
This project follows a 3-Tier Architecture for scalable and maintainable application development.
</p>

</div>


<div align="center">

<table>

<tr>

<td align="center">

<h3>🎨 Presentation Layer</h3>

React.js Frontend

<br><br>

User Interface & Interaction

</td>


<td align="center">

<h3>⚙️ Application Layer</h3>

Node.js + Express.js

<br><br>

RESTful API Services

</td>


<td align="center">

<h3>🗄️ Data Layer</h3>

MySQL Database

<br><br>

Secure Data Storage

</td>

</tr>

</table>

</div>

---

<div align="center">

<h2>🛠️ Technology Stack</h2>

</div>


<div align="center">

<table>

<tr>

<th>🚀 Layer</th>
<th>⚙️ Technology</th>

</tr>


<tr>

<td align="center">
Frontend
</td>

<td align="center">
React.js, HTML5, CSS3, JavaScript
</td>

</tr>


<tr>

<td align="center">
Backend
</td>

<td align="center">
Node.js, Express.js, REST APIs
</td>

</tr>


<tr>

<td align="center">
Database
</td>

<td align="center">
MySQL
</td>

</tr>


<tr>

<td align="center">
Scheduler
</td>

<td align="center">
Node Cron
</td>

</tr>

</table>

</div>

---

<div align="center">

<h2>📊 Core Modules</h2>

</div>


<div align="center">

<table>

<tr>

<td width="33%" align="center">

<h3>🔐 Authentication</h3>

Secure login and role-based access control.

</td>


<td width="33%" align="center">

<h3>📝 Complaint Module</h3>

Submit and manage complaints efficiently.

</td>


<td width="33%" align="center">

<h3>📍 Tracking</h3>

Real-time complaint status timeline.

</td>

</tr>


<tr>

<td width="33%" align="center">

<h3>🛠 Admin Workflow</h3>

Department assignment and management.

</td>


<td width="33%" align="center">

<h3>⏳ SLA Monitoring</h3>

Automatic escalation handling.

</td>


<td width="33%" align="center">

<h3>📈 Analytics</h3>

Reports and data-driven insights.

</td>

</tr>

</table>

</div>

---

<div align="center">

<h2>🔄 End-to-End System Workflow</h2>

</div>


<div align="center">

<table>

<tr>
<td align="center">

<h3>1️⃣ Complaint Submission</h3>

👤 User selects submission type  
<br>
⬇️  
<br>
📝 Fills complaint details  
<br>
⬇️  
<br>
📎 Uploads documents  
<br>
⬇️  
<br>
💾 Complaint stored in database  
<br>
⬇️  
<br>
🆔 Tracking ID generated  
<br>
⬇️  
<br>
✅ Status set as Submitted

</td>
</tr>


<tr>
<td align="center">

<h3>2️⃣ Complaint Processing</h3>

📋 Complaint appears in Admin Dashboard  
<br>
⬇️  
<br>
👨‍💼 Admin reviews complaint  
<br>
⬇️  
<br>
🏢 Assigns department  
<br>
⬇️  
<br>
🔄 Status updated to Under Review  
<br>
⬇️  
<br>
💬 Comments and updates recorded

</td>
</tr>


<tr>
<td align="center">

<h3>3️⃣ Status Tracking</h3>

👤 User logs in / enters tracking ID  
<br>
⬇️  
<br>
🔗 System fetches complaint data through REST API  
<br>
⬇️  
<br>
📍 Real-time timeline displayed

<br><br>

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

<h3>4️⃣ SLA Monitoring & Escalation</h3>

⏱ Scheduled Node Cron job runs periodically  
<br>
⬇️  
<br>
🔍 Checks SLA exceeded complaints  
<br>
⬇️  
<br>
🚨 Complaint marked as Escalated  
<br>
⬇️  
<br>
👨‍💼 Assigned to higher authority  
<br>
⬇️  
<br>
💾 Escalation record stored

</td>
</tr>


<tr>
<td align="center">

<h3>5️⃣ Resolution & Closure</h3>

✅ Admin marks complaint as Resolved  
<br>
⬇️  
<br>
💬 Resolution comments added  
<br>
⬇️  
<br>
🔔 User notified  
<br>
⬇️  
<br>
📊 Data retained for analytics

</td>
</tr>


</table>

</div>

---
<div align="center">

<h2>🔁 End-to-End Flow Summary</h2>

</div>


<div align="center">

<table>

<tr>

<td align="center">

👤 User Submission

<br><br>
⬇️
<br><br>

💾 Database Storage

<br><br>
⬇️
<br><br>

👨‍💼 Admin Review & Assignment

<br><br>
⬇️
<br><br>

📍 Status Updates & Tracking

<br><br>
⬇️
<br><br>

⏳ SLA Check & Escalation

<br><br>
⬇️
<br><br>

✅ Resolution & Reporting

</td>

</tr>

</table>

</div>


---

<div align="center">

<h2>📸 Application Showcase</h2>

<p>
Explore the complete user and admin journey of the Smart Grievance and Feedback Management System.
</p>

</div>


---

# 👤 User Mode


<div align="center">

<table>

<tr>

<td align="center">

<h3>🏠 Home Page</h3>

<img width="900" src="https://github.com/user-attachments/assets/87319f85-7ba1-49d9-aa50-f94ce67e9327"/>

</td>

</tr>

</table>

</div>


---


<div align="center">

<table>

<tr>

<td align="center">

<h3>🔐 User Login</h3>

<img width="900" src="https://github.com/user-attachments/assets/ef90ebf7-81c5-429d-bb7e-d73e5abb4010"/>

</td>

</tr>

</table>

</div>


---


<div align="center">

<table>

<tr>

<td align="center">

<h3>📊 User Dashboard</h3>

<img width="900" src="https://github.com/user-attachments/assets/90b12578-5b00-42eb-a143-8498d754798f"/>

</td>

</tr>

</table>

</div>


---


<div align="center">

<table>

<tr>

<td align="center">

<h3>📝 Submit Complaint</h3>

<img width="900" src="https://github.com/user-attachments/assets/c456ec99-58ab-44c7-a7d5-dc8928749837"/>

</td>

</tr>

</table>

</div>


---


<div align="center">

<table>

<tr>

<td align="center">

<h3>📄 User Complaint Page</h3>

<img width="900" src="https://github.com/user-attachments/assets/4224b4b8-b666-49c3-989a-d6da2eeb9bc5"/>

</td>

</tr>

</table>

</div>


---


<div align="center">

<table>

<tr>

<td align="center">

<h3>📍 Status Tracking Page</h3>

<img width="900" src="https://github.com/user-attachments/assets/c4f42c75-1b7a-42e3-84c8-3fb0c3fd11a4"/>

</td>

</tr>

</table>

</div>


---


# 🛠 Admin Mode


<div align="center">

<table>

<tr>

<td align="center">

<h3>🔐 Admin Login</h3>

<img width="900" src="https://github.com/user-attachments/assets/1e497696-d409-4a74-993b-45b375e18118"/>

</td>

</tr>

</table>

</div>


---


<div align="center">

<table>

<tr>

<td align="center">

<h3>📊 Admin Dashboard</h3>

<img width="900" src="https://github.com/user-attachments/assets/46dd55e2-a08c-4edb-b17f-0d8bc5f54d08"/>

</td>

</tr>

</table>

</div>


---


<div align="center">

<table>

<tr>

<td align="center">

<h3>📋 Complaint Management</h3>

<img width="900" src="https://github.com/user-attachments/assets/3eaee20b-cf21-4151-80ae-3326cf6bd8b9"/>

</td>

</tr>

</table>

</div>


---


<div align="center">

<table>

<tr>

<td align="center">

<h3>🚨 Escalation Management</h3>

<img width="900" src="https://github.com/user-attachments/assets/a3d538e6-c9ee-469a-8eba-225cf475f147"/>

</td>

</tr>

</table>

</div>


---


<div align="center">

<table>

<tr>

<td align="center">

<h3>📈 Reports & Export</h3>

<img width="900" src="https://github.com/user-attachments/assets/e875d1ba-e598-4d67-927c-a94e8c1e4437"/>

</td>

</tr>

</table>

</div>

---
<div align="center">

<h2>⭐ Project Highlights</h2>

</div>


<div align="center">

<table>

<tr>

<td width="33%" align="center">

<h2>🔒</h2>

<h3>Privacy Protection</h3>

Protects user complaint data with secure access control and authentication.

</td>


<td width="33%" align="center">

<h2>⚡</h2>

<h3>Automated Workflow</h3>

SLA monitoring and escalation reduce manual follow-up efforts.

</td>


<td width="33%" align="center">

<h2>📊</h2>

<h3>Analytics Driven</h3>

Provides reports and insights for better institutional decisions.

</td>

</tr>


<tr>

<td width="33%" align="center">

<h2>📝</h2>

<h3>Smart Complaint Handling</h3>

Complete lifecycle management from submission to resolution.

</td>


<td width="33%" align="center">

<h2>🏢</h2>

<h3>Department Management</h3>

Efficient assignment and tracking across departments.

</td>


<td width="33%" align="center">

<h2>🚀</h2>

<h3>Scalable Platform</h3>

Designed with modern full-stack technologies.

</td>

</tr>

</table>

</div>


---

<div align="center">

<h2>🚀 Future Enhancements</h2>

</div>


<div align="center">

<table>

<tr>

<td width="50%" align="center">

<h3>🤖 Artificial Intelligence</h3>

<br>

• AI-based complaint categorization

<br>

• Sentiment analysis of complaints

<br>

• Priority prediction using Machine Learning

<br>

• Smart response suggestions

</td>


<td width="50%" align="center">

<h3>📱 Mobile Platform</h3>

<br>

• Android Application

<br>

• iOS Application

<br>

• Push Notifications

<br>

• Multi-language Support

</td>

</tr>


<tr>

<td width="50%" align="center">

<h3>🔐 Advanced Security</h3>

<br>

• Two-factor authentication

<br>

• Data encryption

<br>

• Audit log monitoring

<br>

• Advanced access control

</td>


<td width="50%" align="center">

<h3>📊 Advanced Analytics</h3>

<br>

• Predictive complaint trends

<br>

• Department performance analysis

<br>

• Real-time dashboards

<br>

• Automated insights

</td>

</tr>

</table>

</div>


---

<div align="center">

<h2>🏁 Project Journey Complete</h2>

<br>

<img src="https://img.icons8.com/?size=100&id=kCnN5ALrk9Q0&format=png&color=000000" width="80"/>

<br><br>

<h3>
Thank you for exploring the Smart Grievance and Feedback Management System.
</h3>

<p>
Building transparent solutions through technology.
</p>

</div>
</table>

---
