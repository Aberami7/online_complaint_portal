import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;
  const navigate = useNavigate();
  const location = useLocation();

  // Format date function (placed before usage)
  function formatDateTime(dateStr) {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    let formatted = date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    return formatted.replace(/am|pm/, (match) => match.toUpperCase());
  }

  const getUrgencyColor = (urgency) => {
    if (!urgency) return "#ffd633";
    const u = urgency.toLowerCase();
    if (u === "high") return "#ee2929ff";
    if (u === "low") return "#0fab21ff";
    return "#ffd633";
  };

  useEffect(() => {
    if (!userId) return;

    const fetchComplaints = () => {
      axios
        .get(`http://localhost:5000/api/complaints/all/${userId}`)
        .then((res) => {
          const updatedComplaints = res.data.map((c) => ({
            ...c,
            publicReply: c.publicReply || null,
            public_replied_at: c.public_replied_at || null,
          }));
          setComplaints(updatedComplaints);
        })
        .catch((err) => console.error("Error fetching complaints:", err));
    };

    fetchComplaints();
    const interval = setInterval(fetchComplaints, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  // Multi-field search
  const filteredComplaints = complaints.filter((c) => {
    const search = searchTerm.toLowerCase();
    const idMatch = c.id.toString().includes(search);
    const subjectMatch = c.subject?.toLowerCase().includes(search);
    const urgencyMatch = c.urgency?.toLowerCase().includes(search);
    const submittedOnMatch = formatDateTime(c.created_at)
      .toLowerCase()
      .includes(search);

    return idMatch || subjectMatch || urgencyMatch || submittedOnMatch;
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
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
          height: "100vh",
          zIndex: 1000,
        }}
      >
        <h2 style={{ textAlign: "center", color: "#bb86fc" }}>Portal Menu</h2>
        <NavButton
          label="Dashboard"
          path="/dashboard"
          currentPath={location.pathname}
          onClick={() => navigate("/dashboard")}
        />
        <NavButton
          label="Submit Complaint"
          path="/submit-complaint"
          currentPath={location.pathname}
          onClick={() => navigate("/submit-complaint")}
        />
        <NavButton
          label="My Complaints"
          path="/my-complaints"
          currentPath={location.pathname}
          onClick={() => navigate("/my-complaints")}
        />
      
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
      <div
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: "#1e1e1e",
          marginLeft: "260px",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "#bb86fc", fontSize: "28px", margin: 0 }}>
            My Complaints
          </h2>
          <div
            style={{
              backgroundColor: "#1d1c1cff",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          >
            <input
              type="text"
              placeholder="Search by ID, Subject, Urgency, Submitted On..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                 padding: "8px 16px",
    backgroundColor: "#2a2a2a",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "10px", // 🔹 sharp edges
    fontWeight: "600"
                
              }}
            />
          </div>
        </div>

        {filteredComplaints.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>
            No complaints found.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredComplaints.map((c) => (
              <div
                key={c.id}
                style={{
                  background: "#2a2a2a",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "#1e1e1e",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "320px",
                }}
              >
                <div style={{ color: "#f5f3f7ff" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>
                      <strong style={{ color: "#bb86fc" }}>ID:</strong> #{c.id}
                    </p>
                    <p>
                      <strong style={{ color: "#bb86fc" }}>Urgency:</strong>{" "}
                      <span
                        style={{
                          color: getUrgencyColor(c.urgency),
                          fontWeight: "bold",
                        }}
                      >
                        {c.urgency || "Medium"}
                      </span>
                    </p>
                  </div>
                  <p>
                    <strong style={{ color: "#bb86fc" }}>Name:</strong>{" "}
                    {user.name || "Not Provided"}
                  </p>
                  <p>
                    <strong style={{ color: "#bb86fc" }}>Email:</strong>{" "}
                    {user.email}
                  </p>
                  <p>
                    <strong style={{ color: "#bb86fc" }}>Subject:</strong>{" "}
                    {c.subject}
                  </p>
                  <p>
                    <strong style={{ color: "#bb86fc" }}>Submitted On:</strong>{" "}
                    {formatDateTime(c.created_at)}
                  </p>
                  <p>
                    <strong style={{ color: "#bb86fc" }}>Submission Type:</strong>{" "}
                    {c.submission_type}
                  </p>
                  <p>
                    <strong style={{ color: "#bb86fc" }}>Status:</strong>{" "}
                    <span style={{ color: "rgba(35, 230, 204, 0.92)" }}>
                      {c.status}
                    </span>
                  </p>

                  {c.publicReply && (
                    <div
                      style={{
                        marginTop: "10px",
                        padding: "10px",
                        backgroundColor: "#2c2a2a",
                        borderRadius: "8px",
                        marginBottom: "10px",
                        borderLeft: "4px solid #bb86fc",
                      }}
                    >
                      <p
                        style={{ margin: 0, fontWeight: "bold", color: "#bb86fc" }}
                      >
                        Admin Reply:
                      </p>
                      <p
                        style={{
                          marginTop: "5px",
                          color: "#fff",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {c.publicReply}
                      </p>
                      <p
                        style={{
                          marginTop: "5px",
                          fontSize: "12px",
                          color: "#aaa",
                        }}
                      >
                        Replied On:{" "}
                        {c.public_replied_at
                          ? formatDateTime(c.public_replied_at)
                          : "Just now"}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#ad6ffaff",
                    color: "#fff",
                    padding: "10px 0",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate(`/complaint-status/${c.id}`)}
                >
                  Check Status
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

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
        backgroundColor: isActive
          ? "rgba(187,134,252,0.9)"
          : "rgba(255,255,255,0.1)",
        color: "#fff",
        textAlign: "left",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.target.style.backgroundColor = "rgba(255,255,255,0.3)";
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
      }}
    >
      {label}
    </button>
  );
};

export default MyComplaints;
