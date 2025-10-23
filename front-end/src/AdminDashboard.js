import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [filterType, setFilterType] = useState("all"); // all | public | anonymous
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints(filterType);
  }, [filterType]);

  const fetchComplaints = async (type) => {
    try {
      const url =
        type === "anonymous"
          ? "http://localhost:5000/api/complaints?filter=anonymous"
          : type === "public"
          ? "http://localhost:5000/api/complaints?filter=public"
          : "http://localhost:5000/api/complaints";

      const res = await axios.get(url);

      const withAnonymous = res.data.map((c) => ({
        ...c,
        anonymous: c.submission_type === "Anonymous",
      }));

      const sorted = withAnonymous.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setComplaints(sorted);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-GB", { hour12: true });
  };

  const columnWidths = "5% 20% 10% 20% 20% 10% 10% 7%";

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Review":
        return "#facc15";
      case "Resolved":
        return "#22c55e";
      case "New":
        return "#06b8f9ff";
      default:
        return "#f97f06ff";
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "High":
        return "#fb0d0dee";
      case "Low":
        return "#5dd94fff";
      default:
        return "#f5e023ff";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#1e1e1e",
      }}
    >
      {/* Left Navigation */}
      <div
        style={{
          width: "220px",
          backgroundColor: "#2a2a2a",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          gap: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#c084fc" }}>Admin Menu</h2>
        <NavButton label="Dashboard" onClick={() => navigate("/admin")} active />
        <NavButton label="Reports & Exports" onClick={() => navigate("/admin/reports")} />
        <NavButton
          label="Logout"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        />
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2
          style={{
            color: "#c084fc",
            fontSize: "28px",
            margin: 0,
            borderBottom: "2px solid #c084fc",
            paddingBottom: "20px",
          }}
        >
          Admin Dashboard
        </h2>

        {/* Toggle Buttons (All → Public → Anonymous) */}
        <div style={{ margin: "20px 0", display: "flex", gap: "12px" }}>
          {/* All */}
          <button
            onClick={() => setFilterType("all")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor:
                filterType === "all" ? "#a04af6ff" : "#2a2a2a",
              color: "#fff",
            }}
          >
            All Complaints
          </button>

          {/* Public */}
          <button
            onClick={() => setFilterType("public")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor:
                filterType === "public" ? "#a04af6ff" : "#2a2a2a",
              color: "#fff",
            }}
          >
            Public Complaints
          </button>

          {/* Anonymous */}
          <button
            onClick={() => setFilterType("anonymous")}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              backgroundColor:
                filterType === "anonymous" ? "#a04af6ff" : "#2a2a2a",
              color: "#fff",
            }}
          >
            Anonymous Complaints
          </button>
        </div>

        {/* Table Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: columnWidths,
            fontWeight: "bold",
            padding: "12px 0",
            borderBottom: "2px solid #c084fc",
            color: "#f0edf5",
          }}
        >
          <div>ID</div>
          <div>Submitted At</div>
          <div>Name</div>
          <div>Email</div>
          <div>Subject</div>
          <div>Urgency</div>
          <div>Status</div>
          <div>View</div>
        </div>

        {/* Table Rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "10px",
          }}
        >
          {complaints.map((c) => (
            <div
              key={c.id}
              style={{
                display: "grid",
                gridTemplateColumns: columnWidths,
                alignItems: "center",
                padding: "12px 10px",
                borderRadius: "8px",
                backgroundColor: "#2a2a2a",
                color: "#f0edf5",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                wordBreak: "break-word",
              }}
            >
              <div>#{c.id}</div>
              <div>{formatDate(c.created_at)}</div>
              <div>{c.anonymous ? "Anonymous" : c.name}</div>
              <div>{c.anonymous ? "Anonymous" : c.email}</div>
              <div>{c.subject}</div>
              <div
                style={{
                  color: getUrgencyColor(c.urgency),
                  fontWeight: "bold",
                }}
              >
                {c.urgency || "Medium"}
              </div>
              <div
                style={{
                  color: getStatusColor(c.status),
                  fontWeight: "bold",
                }}
              >
                {c.status === "Under View" ? "Under Review" : c.status}
              </div>
              <div>
                <button
                  onClick={() => navigate(`/admin/complaint/${c.id}`)}
                  style={{
                    backgroundColor: "#c084fc",
                    color: "#302d2dff",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ label, onClick, active }) => (
  <button
    onClick={onClick}
    style={{
      padding: "12px",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "8px",
      border: "none",
      backgroundColor: active ? "#bb86fc" : "rgba(255,255,255,0.1)",
      color: "#fff",
      textAlign: "left",
      transition: "0.3s",
    }}
    onMouseEnter={(e) =>
      (e.target.style.backgroundColor = "rgba(255,255,255,0.3)")
    }
    onMouseLeave={(e) =>
      (e.target.style.backgroundColor = active ? "#bb86fc" : "rgba(255,255,255,0.1)")
    }
  >
    {label}
  </button>
);

export default AdminComplaints;
