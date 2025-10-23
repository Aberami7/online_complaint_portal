import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation(); // use location to detect active path
  const [counts, setCounts] = useState({
    total: 0,
    newComplaints: 0,
    underReview: 0,
    resolved: 0,
  });
  const [recentComplaints, setRecentComplaints] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userId = user?.id || user?.userId;

  // Fetch counts
  const fetchCounts = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/complaints/count/${userId}`
      );

      let total = 0,
        newComplaints = 0,
        underReview = 0,
        resolved = 0;

      res.data.forEach((item) => {
        const cnt = parseInt(item.count) || 0;
        total += cnt;
        if (item.status === "New") newComplaints = cnt;
        if (item.status === "Under View" || item.status === "Under Review")
          underReview = cnt;
        if (item.status === "Resolved") resolved = cnt;
      });

      setCounts({ total, newComplaints, underReview, resolved });
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  }, [userId]);

  // Fetch recent complaints
  const fetchRecentComplaints = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/complaints/recent/${userId}`
      );
      setRecentComplaints(res.data);
    } catch (err) {
      console.error("Error fetching recent complaints:", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchCounts();
    fetchRecentComplaints();

    const handleComplaintAdded = () => {
      fetchCounts();
      fetchRecentComplaints();
    };

    window.addEventListener("complaintAdded", handleComplaintAdded);
    return () => {
      window.removeEventListener("complaintAdded", handleComplaintAdded);
    };
  }, [fetchCounts, fetchRecentComplaints]);

  const getPercentage = (count) => {
    if (counts.total === 0) return 0;
    return Math.round((count / counts.total) * 100);
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
          position: "fixed", // sidebar fixed
          top: 0,
          left: 0,
          bottom: 0,
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
          path="/logout"
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
          padding: "40px",
          backgroundColor: "#1e1e1e",
          color: "#f5f5f5",
          marginLeft: "250px", // offset for fixed sidebar
        }}
      >
        <h1 style={{ color: "#bb86fc" }}>Welcome, {user.name || user.email}!</h1>
        <p>Track and manage your complaints efficiently.</p>

        {/* Circular Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "30px",
            marginTop: "30px",
          }}
        >
          <CircularStat title="Total" count={counts.total} percentage={100} color="#3b82fc" />
          <CircularStat title="New" count={counts.newComplaints} percentage={getPercentage(counts.newComplaints)} color="#ec290cff" />
          <CircularStat title="Under Review" count={counts.underReview} percentage={getPercentage(counts.underReview)} color="#facc15" />
          <CircularStat title="Resolved" count={counts.resolved} percentage={getPercentage(counts.resolved)} color="#22ce5e" />
        </div>

        {/* Recent Complaints */}
        <div style={{ marginTop: "50px" }}>
          <h2 style={{ color: "#bb86fc" }}>Recent Complaints</h2>
          {recentComplaints.length === 0 ? (
            <p>No complaints submitted yet.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {recentComplaints.map((c) => {
                let statusColor = "#3b82fc"; // Blue for New
                if (c.status === "Under View" || c.status === "Under Review") statusColor = "#facc15"; // Yellow
                if (c.status === "Resolved") statusColor = "#22ce5e";
                if (c.status === "Escalated") statusColor = "#ce8322ff"; // Orange

                return (
                  <li
                    key={c.id}
                    style={{
                      background: "#2a2a2a",
                      padding: "15px",
                      marginBottom: "12px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(7, 7, 7, 0.81)",
                      cursor: "pointer",
                      color: "#f5f5f5",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    onClick={() =>
                      navigate("/my-complaints", { state: { complaintId: c.id } })
                    }
                  >
                    <div>
                      <strong>#{c.id}</strong> - {c.subject}
                      <br />
                      <small style={{ color: "#ccc" }}>
                        Date: {new Date(c.created_at).toLocaleString()}
                      </small>
                    </div>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "12px",
                        backgroundColor: statusColor,
                        color: "#1e1e1e",
                        fontWeight: "bold",
                        minWidth: "90px",
                        textAlign: "center",
                      }}
                    >
                      {c.status === "Under View" ? "Under Review" : c.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// Circular Stat Component
const CircularStat = ({ title, count, percentage, color }) => {
  const radius = 74;
  const circumference = 2 * Math.PI * radius;

  return (
    <div style={{ position: "relative", width: "160px", height: "160px", margin: "0 auto" }}>
      <svg width="160" height="160">
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="#444"
          strokeWidth="13"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke={color}
          strokeWidth="13"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - percentage / 100)}
          strokeLinecap="round"
          transform="rotate(-90 80 80)"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "160px",
          height: "160px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <h4 style={{ margin: "0", fontSize: "16px" }}>{title}</h4>
        <p style={{ margin: "5px 0 0 0", fontSize: "20px", fontWeight: "bold" }}>{count}</p>
      </div>
    </div>
  );
};

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

export default Dashboard;
