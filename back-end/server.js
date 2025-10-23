// ---------------- Imports ----------------
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

// ---------------- Sequelize ----------------
const { Sequelize, DataTypes } = require("sequelize");

// ---------------- Config -----------------
const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- Middleware -------------
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------- Multer Storage ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ---------------- Sequelize Connection ----------------
const sequelize = new Sequelize(
  process.env.DB_NAME || "ocp",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "aberami@3126",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false,
  }
);

// ---------------- Models ----------------
const User = sequelize.define(
  "User",
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  { tableName: "users", timestamps: false }
);

const Complaint = sequelize.define(
  "Complaint",
  {
    user_id: { type: DataTypes.INTEGER },
    subject: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    submission_type: { type: DataTypes.STRING },
    urgency: { type: DataTypes.STRING, defaultValue: "Medium" },
    file_name: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: "New" },
    publicReply: { type: DataTypes.TEXT, allowNull: true },
    public_replied_at: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    under_review_at: { type: DataTypes.DATE, allowNull: true },
    resolved_at: { type: DataTypes.DATE, allowNull: true },
    escalated_at: { type: DataTypes.DATE, allowNull: true },
    escalated_to: { type: DataTypes.STRING, allowNull: true },
  },
  { tableName: "complaints", timestamps: false }
);

const Timeline = sequelize.define(
  "Timeline",
  {
    complaint_id: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    comment: { type: DataTypes.STRING },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    actor_type: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
      allowNull: false,
    },
    actor_id: { type: DataTypes.INTEGER, allowNull: true },
  },
  { tableName: "timelines", timestamps: false }
);

// ---------------- Associations ----------------
User.hasMany(Complaint, { foreignKey: "user_id" });
Complaint.belongsTo(User, { foreignKey: "user_id" });
Complaint.hasMany(Timeline, { foreignKey: "complaint_id" });
Timeline.belongsTo(Complaint, { foreignKey: "complaint_id" });

// ---------------- Sync DB ----------------
sequelize
  .sync()
  .then(() => console.log("✅ DB & Tables synced with Sequelize"))
  .catch((err) => console.error("❌ Sequelize sync error:", err));

// ---------------- Auth Routes ----------------

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({
      success: true,
      message: "Signup successful",
      userId: user.id,
    });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    if (user.password !== password)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user.id, email: user.email, name: user.name || "" },
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// ---------------- Complaint Routes ----------------

// Submit Complaint
app.post("/api/complaints", upload.single("file_name"), async (req, res) => {
  try {
    console.log("Complaint body:", req.body);
    console.log("Uploaded file:", req.file);

    let { user_id, subject, description, submission_type, urgency } = req.body;

    if (!subject || !description)
      return res
        .status(400)
        .json({ success: false, message: "Fields required" });

    user_id = parseInt(user_id) || null;
    const file_name = req.file ? req.file.filename : null;

    const allowedUrgency = ["Low", "Medium", "High"];
    if (!allowedUrgency.includes(urgency)) urgency = "Medium";

    const allowedTypes = ["Public", "Anonymous"];
    if (!allowedTypes.includes(submission_type)) submission_type = "Public";

    const complaint = await Complaint.create({
      user_id,
      subject,
      description,
      submission_type,
      urgency,
      file_name,
    });

    await Timeline.create({
      complaint_id: complaint.id,
      status: "New",
      comment: "Complaint submitted",
      actor_type: "user",
      actor_id: user_id,
    });

    res.status(201).json({
      success: true,
      message: "Complaint submitted",
      complaintId: complaint.id,
    });
  } catch (err) {
    console.error("❌ Complaint error:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to submit complaint" });
  }
});

// Get all complaints for a user
app.get("/api/complaints/all/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const complaints = await Complaint.findAll({
      where: { user_id: userId },
      include: [Timeline],
      order: [["created_at", "DESC"]],
    });

    const formatted = complaints.map((c) => ({
      id: c.id,
      subject: c.subject,
      status: c.status,
      submission_type: c.submission_type,
      urgency: c.urgency,
      publicReply: c.publicReply || null,
      public_replied_at: c.public_replied_at || null,
      created_at: c.created_at,
      Timelines: c.Timelines || [],
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching complaints:", err);
    res.status(500).json({ success: false, message: "Failed to fetch complaints" });
  }
});

// ---------------- Recent complaints for a user ----------------
app.get("/api/complaints/recent/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const complaints = await Complaint.findAll({
      where: { user_id: userId },
      order: [["created_at", "DESC"]],
      limit: 5,
    });
    res.json(complaints);
  } catch (err) {
    console.error("❌ Error fetching recent complaints:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch recent complaints" });
  }
});

// ---------------- Complaint count for a user ----------------
app.get("/api/complaints/count/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const counts = await Complaint.findAll({
      where: { user_id: userId },
      attributes: ["status", [sequelize.fn("COUNT", sequelize.col("status")), "count"]],
      group: ["status"]
    });

    res.json(counts);
  } catch (err) {
    console.error("❌ Error fetching complaints count:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch complaints count" });
  }
});

// ---------------- Admin: all complaints ----------------
app.get("/api/complaints", async (req, res) => {
  try {
    const { filter } = req.query;
    let whereClause = {};

    if (filter === "anonymous") {
      whereClause.submission_type = "Anonymous";
    } else if(filter === "public") {
      whereClause.submission_type = "Public";
    }

    const complaints = await Complaint.findAll({
      where: whereClause,
      include: [User, Timeline],
      order: [["created_at", "DESC"]],
    });

    const formatted = complaints.map(c => ({
      id: c.id,
      name: c.submission_type === "Anonymous" ? "Anonymous" : c.User?.name,
      email: c.submission_type === "Anonymous" ? "Anonymous" : c.User?.email,
      subject: c.subject,
      status: c.status,
      urgency: c.urgency || "Medium",
      submission_type: c.submission_type,
      created_at: c.created_at,
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching admin complaints:", err);
    res.status(500).json({ success: false, message: "Failed to fetch complaints" });
  }
});

// ---------------- Update complaint status ----------------
app.put("/api/complaints/:id/status", async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const complaint = await Complaint.findByPk(id);
    if (!complaint)
      return res.status(404).json({ message: "Complaint not found" });

    complaint.status = status;

    if (status === "Under Review") complaint.under_review_at = new Date();
    if (status === "Resolved") complaint.resolved_at = new Date();
    if (status === "Escalated") complaint.escalated_at = new Date();

    await complaint.save();

    await Timeline.create({
      complaint_id: id,
      status: status,
      comment: `Marked as ${status}`,
      actor_type: "admin",
      actor_id: null,
      updated_at: new Date(),
    });
        const updatedComplaint = await Complaint.findByPk(id, { include: [Timeline] });
    console.log(updatedComplaint.Timelines); 

    res.json({ message: "Status updated", status });
  } catch (err) {
    console.error("❌ Update status error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
});
// Get single complaint by ID
app.get("/api/complaints/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const complaint = await Complaint.findByPk(id, {
      include: [User, Timeline],
    });

    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.json({
      id: complaint.id,
      user: complaint.User ? { name: complaint.User.name, email: complaint.User.email } : null,
      subject: complaint.subject,
      description: complaint.description,
      status: complaint.status,
      urgency: complaint.urgency,
      submission_type: complaint.submission_type,
      file_name: complaint.file_name,
      created_at: complaint.created_at,
      Timelines: complaint.Timelines || [],
    });
  } catch (err) {
    console.error("Error fetching complaint:", err);
    res.status(500).json({ success: false, message: "Failed to fetch complaint" });
  }
});

// 🔹 Add at the top after require("dotenv").config();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// ---------------- Admin Login ----------------
app.post("/admin-login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Enter email and password" });
  }

  // ✅ Check admin credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      admin: { email: ADMIN_EMAIL, role: "admin" }
    });
  } else {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }
});
// ---------------- Admin: all complaints (for reports) ----------------
// ---------------- Admin: all complaints (for reports) ----------------
app.get("/api/complaints/all", async (req, res) => {
  try {
    const { filter } = req.query; // filter = 'public' | 'anonymous' | 'all'
    let whereClause = {};

    if (filter === "anonymous") {
      whereClause.submission_type = "Anonymous";
    } else if (filter === "public") {
      whereClause.submission_type = "Public";
    }
    // else 'all' -> no filter, fetch everything

    // Fetch complaints
    const complaints = await Complaint.findAll({
      where: whereClause,
      include: [User, Timeline],
      order: [["created_at", "DESC"]],
    });

    // Format complaints
    const formatted = complaints.map((c) => ({
      id: c.id,
      name: c.submission_type === "Anonymous" ? "Anonymous" : c.User?.name,
      email: c.submission_type === "Anonymous" ? "Anonymous" : c.User?.email,
      subject: c.subject,
      status: c.status,
      urgency: c.urgency || "Medium",
      submission_type: c.submission_type,
      created_at: c.created_at,
      timelines: c.Timelines || [],
    }));

    // Count summary by status
    const statusCounts = {};
    complaints.forEach((c) => {
      const typeKey = c.submission_type;
      if (!statusCounts[typeKey]) statusCounts[typeKey] = {};
      statusCounts[typeKey][c.status] = (statusCounts[typeKey][c.status] || 0) + 1;
    });

    res.json({
      total: complaints.length,
      statusCounts, // Example: { Public: { New: 3, Resolved: 2 }, Anonymous: { New: 1 } }
      complaints: formatted,
    });
  } catch (err) {
    console.error("❌ Error fetching all complaints for reports:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch all complaints" });
  }
});



// ---------------- Start Server ----------------
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
