 import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ComplaintStatus = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/complaints/${id}`);
        setComplaint(res.data);
      } catch (err) {
        console.error("Error fetching complaint:", err);
      }
    };
    fetchComplaint();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Pending";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!complaint)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>;

  const getTimelineDate = (status) => {
    const entry = complaint.Timelines?.find((t) => t.status === status);
    return entry ? entry.updated_at : null;
  };

const steps = [
  { 
    key: "Submitted", 
    date: complaint.created_at, 
    description: "Complaint submitted successfully" 
  },
  { 
    key: "Under Review", 
    date: ["Under Review", "Escalated", "Resolved"].includes(complaint.status)
          ? getTimelineDate("Under Review") || complaint.created_at
          : null, // New complaint la Pending dhan varum
    description: "Complaint under review" 
  },
  { 
    key: "Resolved", 
    date: complaint.status === "Resolved" ? getTimelineDate("Resolved") || complaint.updated_at : null, 
    description: "Complaint resolved" 
  },
];

  const stepColors = {
    Submitted: "#00bfff",
    "Under Review": "#FFD700",
    Escalated: "#FF4500",
    Resolved: "#32CD32",
  };

  const getStepActive = (stepIndex) => {
    if (complaint.status === "New") return stepIndex === 0; // Only Submitted active
   if (complaint.status === "Under Review" || complaint.status === "Escalated") return stepIndex <= 1;
    if (complaint.status === "Resolved") return stepIndex <= 2; // All active
    return false;
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1e1e1e", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "30px 20px" }}>
      <div style={{ backgroundColor: "#2a2a2a", borderRadius: "16px", boxShadow: "#151515ff", width: "100%", maxWidth: "700px", padding: "25px 30px", position: "relative" }}>
        <button onClick={() => navigate(-1)} style={{ position: "absolute", top: "20px", left: "20px", background: "none", border: "none", color: "#bb86fc", fontSize: "20px", cursor: "pointer" }}>←</button>

        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#f7f2f2ff" }}>Complaint Status</h2>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
          <div><strong style={{ color: "#bb86fc" }}>Status:</strong>{" "} <span style={{ color: "#f4f1f7ff", fontWeight: "bold" }}>{complaint.status}</span></div>
          <div><strong style={{ color: "#bb86fc" }}>Complaint ID:</strong> #{complaint.id}</div>
        </div>

        <div style={{ position: "relative", paddingLeft: "12px" }}>
          <div style={{ position: "absolute", left: "27px", top: "0", bottom: "60px", width: "4px", background: "#857c8bcf", borderRadius: "2px", transform: "translateX(-50%)", zIndex: 0 }} />
          {steps.map((step, index) => {
            const color = stepColors[step.key];
            const active = getStepActive(index);

            return (
              <div key={index} style={{ position: "relative", marginBottom: index !== steps.length - 1 ? "50px" : "0" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: active ? color : "#504d4dff", color: "#171515ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", position: "absolute", left: "5px", top: "0px", border: "2px solid #968b8bff", boxSizing: "border-box", zIndex: 1, transition: "background 0.3s ease" }}>{index + 1}</div>
                <div style={{ marginLeft: "40px", paddingBottom: "10px" }}>
                  <strong style={{ color: "#bb86fc", fontSize: "16px" }}>{step.key}</strong>
                  <p style={{ margin: "4px 0", color: "#d4cbcbf6", fontSize: "14px" }}>{step.description}</p>
                  <small style={{ color: "#f1eaeaff" }}>{formatDate(step.date)}</small>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "40px" }}>
          <h3 style={{ color: "#bb86fc", marginBottom: "15px" }}>UPDATES</h3>

          {complaint.status === "New" && <div style={{ marginBottom: "20px" }}>
            <strong style={{ color: "#cec6c6ff" }}>Submitted Successfully</strong>
            <p style={{ color: "#d4cbcbf6", margin: "5px 0" }}>Your complaint has been successfully submitted on {formatDate(complaint.created_at)}. Our team will review it shortly. Thank you for bringing this to our attention!</p>
          </div>}

          {complaint.status === "Under Review" && <div style={{ marginBottom: "20px" }}>
            <strong style={{ color: "#f1eaeaff" }}>Review Started</strong>
            <p style={{ color: "#d4cbcbf6", margin: "5px 0" }}>Your complaint is currently under review by our team. We are investigating and will provide an update within 3 business days.</p>
          </div>}

          {complaint.status === "Escalated" && <div style={{ marginBottom: "20px" }}>
            <strong style={{ color: "#f1eaeaff" }}>Complaint Escalated</strong>
            <p style={{ color: "#d4cbcbf6", margin: "5px 0" }}>Status updated to Escalated. {getTimelineDate("Escalated") ? `Your complaint has been escalated on ${formatDate(getTimelineDate("Escalated"))}` : "Pending..."} to a higher authority for faster resolution. We appreciate your patience.”</p>
          </div>}

          {complaint.status === "Resolved" && <div style={{ marginBottom: "20px" }}>
            <strong style={{ color: "#f1eaeaff" }}>Complaint Resolved</strong>
            <p style={{ color: "#d4cbcbf6", margin: "5px 0" }}>{getTimelineDate("Resolved") ? `Your complaint has been successfully resolved on ${formatDate(getTimelineDate("Resolved"))}` : "Pending..."}. Thank you for your patience and cooperation.</p>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default ComplaintStatus;
