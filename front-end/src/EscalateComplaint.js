import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EscalateComplaint() {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [higherAuthority, setHigherAuthority] = useState("");
  const [notifyAll, setNotifyAll] = useState(false);
  const [reason, setReason] = useState(""); // ✅ reason state
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/complaints/${complaintId}`)
      .then((res) => res.json())
      .then((data) => setComplaint(data))
      .catch((err) => console.error(err));
  }, [complaintId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      setMessage("⚠️ Please enter a reason for escalation!");
      return;
    }

    if (complaint.status === "Escalated") {
      setMessage("⚠️ You already escalated this complaint!");
      return;
    }

    try {
      await fetch(
        `http://localhost:5000/api/complaints/${complaintId}/escalate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ higherAuthority, notifyAll, reason }),
        }
      );
      setMessage("✅ Complaint escalated successfully!");
      setComplaint({ ...complaint, status: "Escalated" });
    } catch (err) {
      setMessage("❌ Failed to escalate complaint");
      console.error(err);
    }
  };

  if (!complaint)
    return (
      <p
        style={{
          textAlign: "center",
          color: "#f7f1f1ff",
          marginTop: "40px",
        }}
      >
        Loading complaint details...
      </p>
    );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          backgroundColor: "#2e2e2e",
          borderRadius: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          padding: "24px",
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            marginBottom: "20px",
            padding: "8px 12px",
            borderRadius: "6px",
            backgroundColor: "#9c4ef4ff",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#894deaff",
            marginBottom: "9px",
            textAlign: "center",
          }}
        >
          Escalate Complaint
        </h2>

        {/* Complaint Details */}
        <div
          style={{
            backgroundColor: "#rgba(255,255,255,0.1)",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            padding: "8px",
            display: "flex",
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          {/* Image / File */}
          <div
            style={{
              width: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "100px",
            }}
          >
            {complaint.file_name ? (
              <a
                href={`http://localhost:5000/uploads/${complaint.file_name}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "6px 10px",
                  backgroundColor: "#7c3aed",
                  color: "#fff",
                  borderRadius: "5px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                Open Attachment
              </a>
            ) : (
              <span role="img" aria-label="complaint">
                📝
              </span>
            )}
          </div>

          {/* Complaint Info */}
          <div style={{ width: "67%", display: "flex", flexDirection: "column" }}>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#e7effeff",
                marginBottom: "8px",
              }}
            >
              {complaint.title || "Unresolved issue with service provider"}
            </h3>
            <p style={{ color: "#e5eaf1ff", marginBottom: "4px" }}>
              <strong>Complaint ID:</strong> #{complaint.id}
            </p>
            <p style={{ color: "#e9edf4ff", marginBottom: "12px" }}>
              <strong>Submitted:</strong>{" "}
              {new Date(complaint.created_at).toLocaleString()}
            </p>
            <p style={{ color: "#e2e7edff", fontSize: "14px" }}>
              {complaint.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* Escalation Form */}
        <div
          style={{
            backgroundColor: "#rgba(255,255,255,0.1)",
            borderRadius: "16px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            padding: "20px",
          }}
        >
          <label
            style={{
              display: "block",
              color: "#bc86ff",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Escalation Options
          </label>

          <select
            value={higherAuthority}
            onChange={(e) => setHigherAuthority(e.target.value)}
            style={{
              width: "100%",
              border: "1px solid #dc9eecff",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "16px",
              fontSize: "15px",
              outline: "none",
            }}
          >
            <option value="">Select Higher Authority</option>
<option value="Senior Admin">Senior Admin</option>
<option value="Vice Principal">Vice Principal</option>
<option value="Principal">Principal</option>
          </select>

          {/* Reason for Escalation */}
          <label
            style={{
              display: "block",
              color: "#bc86ff",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Reason for Escalation
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for escalation..."
            style={{
              width: "98%",
              border: "1px solid #dc9eecff",
              borderRadius: "8px",
              padding: "3.8px",
              marginBottom: "16px",
              fontSize: "15px",
              outline: "none",
              resize: "none",
              minHeight: "50px",
                        }}
          ></textarea>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={notifyAll}
              onChange={(e) => setNotifyAll(e.target.checked)}
              style={{ width: "18px", height: "18px" }}
            />
            <span style={{ color: "#bc86ff", fontWeight: "500" }}>
              Notify All Parties
            </span>
          </label>

          <button
            onClick={handleSubmit}
            style={{
              width: "100%",
              backgroundColor: "#7c3aed",
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#8c55e6ff")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#7c3aed")}
          >
            🚀 Escalate Complaint
          </button>

          {message && (
            <p
              style={{
                textAlign: "center",
                marginTop: "16px",
                color: "#4b5563",
                fontWeight: "500",
              }}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EscalateComplaint;
