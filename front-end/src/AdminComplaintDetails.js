import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminComplaintDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState("");
  const [privateNote, setPrivateNote] = useState("");
  const [publicReply, setPublicReply] = useState("");
  const [publicReplies, setPublicReplies] = useState([]);
  const [showNotes, setShowNotes] = useState(false);

  const fetchComplaint = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/complaints/${id}`);
      const data = res.data;
      setComplaint(data);
      setStatus(data.status === "Under View" ? "Under Review" : data.status);

      const replies = data.Timelines?.filter((t) => t.status === "Public Reply") || [];
      setPublicReplies(
        replies.map((r) => ({
          comment: r.comment.replace("Admin replied: ", ""),
          created_at: r.updated_at || r.created_at,
        }))
      );
    } catch (err) {
      console.error("Error fetching complaint:", err);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateStatus = async (newStatus) => {
    setStatus(newStatus);
    try {
      await axios.put(`http://localhost:5000/api/complaints/${id}/status`, { status: newStatus });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const savePrivateNote = async () => {
    if (!privateNote.trim()) return;
    try {
      await axios.post(`http://localhost:5000/api/complaints/${id}/internal-note`, { note: privateNote });
      alert("Private note saved (staff only)");
      setPrivateNote("");
      fetchComplaint();
    } catch (err) {
      console.error("Failed to save private note:", err);
    }
  };

  const sendPublicReply = async () => {
    if (!publicReply.trim()) return;
    try {
      await axios.put(`http://localhost:5000/api/complaints/${id}/reply`, { admin_reply: publicReply });
      setPublicReplies([...publicReplies, { comment: publicReply, created_at: new Date() }]);
      setPublicReply("");
      alert("Reply sent successfully");
    } catch (err) {
      console.error("Failed to send reply:", err);
      alert(err.response?.data?.message || "Failed to send reply");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Pending....";
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", { hour12: true });
  };

  if (!complaint)
    return <p style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  const internalNotes =
    complaint?.Timelines?.filter((t) => t.status === "Internal Note" && t.comment?.trim() !== "")
      .sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at)) || [];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif", backgroundColor: "#1e1e1e" }}>
      
      {/* Fixed Dashboard-style Sidebar */}
      <div style={{
        width: "240px",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        backgroundColor: "#2a2a2a",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "20px",
        zIndex: 1000,
        boxShadow: "2px 0 6px rgba(0,0,0,0.3)"
      }}>
        <h2 style={{ textAlign: "center", color: "#c084fc", marginBottom: "10px", fontSize: "20px" }}>Admin Menu</h2>
        <NavButton label="Dashboard" onClick={() => navigate("/admin")} isActive />
        <NavButton label="Logout" onClick={() => { localStorage.clear(); navigate("/login"); }} />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px", marginLeft: "240px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%", backgroundColor: "#2a2a2a", borderRadius: "12px", padding: "25px", color: "#f0edf5", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
          <h2 style={{ color: "#c084fc", marginBottom: "20px", borderBottom: "2px solid #c084fc", paddingBottom: "50px" }}>Complaint Details</h2>

          {/* Complaint Info */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
            <span><strong>ID:</strong> #{complaint.id}</span>
            <span><strong>Submitted At:</strong> {formatDate(complaint.created_at)}</span>
          </div>
          <div style={{ marginBottom: "12px" }}>
            <p><strong>Subject:</strong> {complaint.subject}</p>
            <p><strong>Description:</strong> {complaint.description}</p>
            <p><strong>File:</strong> {complaint.file_name ? <a href={`http://localhost:5000/uploads/${complaint.file_name}`} target="_blank" rel="noreferrer">{complaint.file_name}</a> : "No attachments"}</p>
          </div>

          {/* Status Buttons */}
          <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
            <button onClick={() => updateStatus("Under Review")} style={{ padding: "10px 18px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", backgroundColor: status === "Under Review" ? "#facc15" : "#a667e4ff", color: "#fff" }}>Mark as Under Review</button>
            <button onClick={() => updateStatus("Resolved")} style={{ padding: "10px 18px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", backgroundColor: status === "Resolved" ? "#22c55e" : "#a667e4ff", color: "#fff" }}>Mark as Resolved</button>
            <button onClick={() => {
              // Navigate to escalate page without updating local status
              navigate(`/escalate/${complaint.id}`);
            }} style={{ padding: "10px 18px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", backgroundColor: status === "Escalated" ? "#ec8722ff" : "#d946ef", color: "#fff" }}>
              {status === "Escalated" ? "Escalated" : "Escalate"}
            </button>
          </div>

          {/* Internal Notes */}
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: "#c084fc", marginBottom: "10px" }}>Internal Notes (Staff Only)</h3>
            <textarea value={privateNote} onChange={(e) => setPrivateNote(e.target.value)} placeholder="Add private note for staff..." rows="3" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#1e1e1e", color: "#fff", marginBottom: "10px" }} />
            <button onClick={savePrivateNote} style={{ backgroundColor: "#564b63ff", color: "#fff", padding: "8px 18px", border: "none", borderRadius: "8px", cursor: "pointer" }}>Save Note</button>

            <div style={{ marginTop: "25px" }}>
              <button onClick={() => setShowNotes(!showNotes)} style={{ backgroundColor: "#a781d4ff", color: "#1e1b29", padding: "10px 18px", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}>{showNotes ? "Hide Internal Notes" : "Show Internal Notes History"}</button>
              {showNotes && (
                <div style={{ marginTop: "15px", backgroundColor: "#1e1e1e", padding: "15px", borderRadius: "10px" }}>
                  {internalNotes.length > 0 ? internalNotes.map((note, i) => (
                    <div key={i} style={{ borderBottom: "1px solid #444", paddingBottom: "8px", marginBottom: "10px" }}>
                      <p style={{ color: "#fff", margin: 0 }}>{note.comment}</p>
                      <small style={{ color: "#aaa" }}>Added on: {new Date(note.updated_at || note.created_at).toLocaleString("en-GB", { hour12: true })}</small>
                    </div>
                  )) : <p style={{ color: "#aaa", margin: 0 }}>No internal notes yet</p>}
                </div>
              )}
            </div>
          </div>

          {/* Public Replies */}
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: "#c084fc", marginBottom: "10px" }}>Public Replies</h3>
            <div style={{ marginBottom: "15px" }}>
              <textarea value={publicReply} onChange={(e) => setPublicReply(e.target.value)} placeholder="Write a message for user..." rows="3" style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#1e1e1e", color: "#fff", marginBottom: "10px" }} />
              <button onClick={sendPublicReply} style={{ backgroundColor: "#564b63ff", color: "#fff", padding: "8px 18px", border: "none", borderRadius: "8px", cursor: "pointer" }}>Send Reply</button>
            </div>
            {publicReplies.length > 0 ? publicReplies.map((r, i) => (
              <div key={i} style={{ marginTop: "10px", backgroundColor: "#1e1e1e", padding: "10px", borderRadius: "10px" }}>
                <small style={{ color: "#f1eaeaff" }}>{new Date(r.created_at).toLocaleString()}</small>
                <p style={{ margin: "4px 0", color: "#fff" }}>{r.comment}</p>
              </div>
            )) : <p style={{ color: "#f5efefaf" }}>No public replies yet...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

// NavButton Component
const NavButton = ({ label, onClick, isActive }) => (
  <button onClick={onClick} style={{
    padding: "12px", fontSize: "14px", cursor: "pointer", borderRadius: "8px", border: "none",
    backgroundColor: isActive ? "#c084fc" : "rgba(255,255,255,0.1)", color: "#fff", textAlign: "left", transition: "0.3s"
  }} onMouseEnter={(e) => { if (!isActive) e.target.style.backgroundColor = "rgba(255,255,255,0.2)"; }} onMouseLeave={(e) => { if (!isActive) e.target.style.backgroundColor = isActive ? "#c084fc" : "rgba(255,255,255,0.1)"; }}>
    {label}
  </button>
);

export default AdminComplaintDetails;
