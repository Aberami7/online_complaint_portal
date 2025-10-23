const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer storage for attachments
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Submit Complaint
router.post("/", upload.single("file"), async (req, res) => {
  try {
    let { user_id, subject, description, submission_type } = req.body;
    if (!user_id || !subject || !description) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }
    const file_name = req.file ? req.file.filename : null;

    const [result] = await global.db.query(
      "INSERT INTO complaints (user_id, subject, description, submission_type, file_name, status, created_at) VALUES (?, ?, ?, ?, ?, 'New', NOW())",
      [user_id, subject, description, submission_type, file_name]
    );

    const complaintId = result.insertId;

    await global.db.query(
      "INSERT INTO timelines (complaint_id, status, comment, updated_at) VALUES (?, 'New', 'Complaint submitted', NOW())",
      [complaintId]
    );

    res.status(201).json({ success: true, message: "Complaint submitted", complaintId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to submit complaint" });
  }
});

// ✅ Get recent complaints (last 5)
router.get("/recent/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await global.db.query(
      "SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC LIMIT 5",
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch recent complaints" });
  }
});

// ✅ Get complaint count
router.get("/count/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const [rows] = await global.db.query(
      "SELECT COUNT(*) as count FROM complaints WHERE user_id = ?",
      [userId]
    );
    res.json({ count: rows[0]?.count || 0 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch complaint count" });
  }
});

module.exports = router;
