import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Paperclip } from "lucide-react";

function SubmitComplaint() {
  const navigate = useNavigate();
  const location = useLocation();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [submissionType, setSubmissionType] = useState("Public");
  const [urgency, setUrgency] = useState("Low");
  const [message, setMessage] = useState("");
  const [subjectPlaceholder, setSubjectPlaceholder] = useState("WiFi is not working");

  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
  const exampleSubjects = [
    "Ex:WiFi is not working",
    "Ex:System login issue",
    "Ex:Request for software installation",
    "Ex:Air conditioner not cooling",
    "Ex:Water leakage in restroom"
  ];

  // Rotate placeholder every 3 seconds
  
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % exampleSubjects.length;
      setSubjectPlaceholder(exampleSubjects[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async () => {
    if (!subject.trim() || !description.trim()) {
      setMessage("⚠️ Please enter subject and description!");
      return;
    }
    if (!user.userId) {
      setMessage("⚠️ User not logged in!");
      return;
    }
    if (!urgency) {
      setMessage("⚠️ Please select urgency level!");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user.userId);
    formData.append("subject", subject.trim());
    formData.append("description", description.trim());
    formData.append("submission_type", submissionType);
    formData.append("urgency", urgency);
    if (file) formData.append("file_name", file);

    try {
      const res = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setMessage(data.message);
      if (data.success) {
        setSubject("");
        setDescription("");
        setFile(null);
        setUrgency("");
        navigate("/my-complaints");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          backgroundColor: "#2a2a2a",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "20px",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <h2 style={{ textAlign: "center", color: "#bb86fc" }}>Portal Menu</h2>
        <NavButton label="Dashboard" path="/dashboard" currentPath={location.pathname} onClick={() => navigate("/dashboard")} />
        <NavButton label="Submit Complaint" path="/submit-complaint" currentPath={location.pathname} onClick={() => navigate("/submit-complaint")} />
        <NavButton label="My Complaints" path="/my-complaints" currentPath={location.pathname} onClick={() => navigate("/my-complaints")} />
        <NavButton
          label="Logout"
          path=""
          currentPath={location.pathname}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "90px", backgroundColor: "#1e1e1e", color: "#f5f5f5", marginLeft: "260px" }}>
        <h1 style={{ color: "#bb86fc", marginBottom: "20px", textAlign: "center" }}>Submit a Complaint</h1>

        <div
          style={{
            background: "#2a2a2a",
            padding: "70px",
            marginBottom:"100px",
            borderRadius: "20px",
            maxWidth: "900px",
            boxShadow: "0 6px 15px rgba(1, 1, 1, 0.86)",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          {/* Submission Type */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <label>Submission Type</label>
            <div style={{ display: "flex", gap: "15px" }}>
              <button
                onClick={() => setSubmissionType("Public")}
                style={{
                  flex: 1,
                  minHeight: "50px",
                  borderRadius: "90px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: submissionType === "Public" ? "#bb86fc" : "#3a3a3a",
                  color: "#fff",
                  fontWeight: submissionType === "Public" ? "bold" : "normal",
                  boxShadow: submissionType === "Public" ? "0 4px 10px rgba(12, 11, 12, 0.5)" : "none",
                  transition: "0.3s",
                }}
              >
                Public
              </button>

              <button
                onClick={() => setSubmissionType("Anonymous")}
                style={{
                  flex: 1,
                  minHeight: "50px",
                  borderRadius: "90px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: submissionType === "Anonymous" ? "#bb86fc" : "#3a3a3a",
                  color: "#fff",
                  fontWeight: submissionType === "Anonymous" ? "bold" : "normal",
                  boxShadow: submissionType === "Anonymous" ? "0 4px 10px rgba(19, 19, 19, 0.5)" : "none",
                  transition: "0.3s",
                }}
              >
                Anonymous
              </button>
            </div>
          </div>

          {/* Subject */}
          <div style={{ display: "flex", flexDirection: "column", gap:"12px" }}>
            <label>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={subjectPlaceholder}
              style={{
                width: "98%",
                minHeight: "50px",
                borderRadius: "6px",
                border: "1px solid #bb86fc",
                backgroundColor: "#1e1e1e",
                color: "#f5f5f5",
                padding: "10px",
                outline:"#bb86fc",
              }}
            />
          </div>

          {/* Description */}
          <div style={{ display: "flex", flexDirection: "column", gap:"12px" }}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain your issue here..."
              style={{
                width: "98%",
                minHeight: "100px",
                borderRadius: "4px",
                border: "1px solid #bb86fc",
                backgroundColor: "#1e1e1e",
                color: "#f5f5f5",
                padding: "10px",
                resize: "none",
                outline:"#bb86fc"
              }}
            />
          </div>

          {/* Urgency Dropdown */}
          <div style={{ display: "flex", flexDirection: "column" , gap:"12px" }}>
            <label>Urgency Level</label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              style={{
                width: "100%",
                minHeight: "50px",
                borderRadius: "6px",
                border: "1px solid #bb86fc",
                backgroundColor: "#1e1e1e",
                color: "#f5f5f5",
                padding: "10px",
              }}
            >
              <option value="">Select urgency</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* File Upload */}
          <div style={{ display: "flex", flexDirection: "column", gap:"12px" }}>
            <label>Attachment (Optional)</label>
            <div
              style={{
                border: "2px dashed #bb86fc",
                borderRadius: "6px",
                padding: "25px",
                textAlign: "center",
                color: "#ccc",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                minHeight: "120px",
              }}
            >
              <Paperclip size={22} color="#bb86fc" />
              <p style={{ margin: 0, fontSize: "14px" }}>Add images/videos for proof</p>
              <label
                style={{
                  backgroundColor: "#bb86fc",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginTop: "8px",
                }}
              >
                Upload
                <input type="file" onChange={handleFileChange} style={{ display: "none" }} />
              </label>
              {file && <p style={{ color: "#bb86fc", marginTop: "6px" }}>{file.name}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#b280f1ff",
              color: "#fef8f8ff",
              padding: "12px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              width: "100%",
              minHeight: "50px",
              gap:"12px"
            }}
          >
            Submit Complaint
          </button>

          {/* Message */}
          {message && (
            <p style={{ marginTop: "15px", color: message.toLowerCase().includes("success") ? "green" : "red" }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// Nav Button Component
const NavButton = ({ label, onClick, path, currentPath }) => {
  const isActive = path && currentPath === path;
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px",
        fontSize: "14px",
        cursor: "pointer",
        borderRadius: "8px",
        border: "none",
        backgroundColor: isActive ? "rgba(187,134,252,0.9)" : "rgba(255,255,255,0.1)",
        color: "#fff",
        textAlign: "left",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => { if (!isActive) e.target.style.backgroundColor = "rgba(255,255,255,0.3)"; }}
      onMouseLeave={(e) => { if (!isActive) e.target.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
    >
      {label}
    </button>
  );
};

export default SubmitComplaint;
