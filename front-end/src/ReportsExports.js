import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const ReportsExports = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [submissionType, setSubmissionType] = useState("All"); // All / Public / Anonymous
  const [statusFilter, setStatusFilter] = useState("");
  const [urgencyFilter, setUrgencyFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch complaints with anonymous mapping
  useEffect(() => {
    fetch("http://localhost:5000/api/complaints")
      .then((res) => res.json())
      .then((data) => {
        const mapped = Array.isArray(data)
          ? data.map((c) => ({ ...c, anonymous: c.submission_type === "Anonymous" }))
          : [];
        setComplaints(mapped);
      })
      .catch((err) => {
        console.error(err);
        setComplaints([]);
      });
  }, []);

  // Apply filters automatically whenever any filter changes
  useEffect(() => {
    let temp = [...complaints];

    // Filter by submission type
    if (submissionType === "Public") temp = temp.filter((c) => !c.anonymous);
    if (submissionType === "Anonymous") temp = temp.filter((c) => c.anonymous);

    if (statusFilter) temp = temp.filter((c) => c.status === statusFilter);
    if (urgencyFilter) temp = temp.filter((c) => c.urgency === urgencyFilter);
    if (startDate) temp = temp.filter((c) => new Date(c.created_at) >= new Date(startDate));
    if (endDate) temp = temp.filter((c) => new Date(c.created_at) <= new Date(endDate));

    setFiltered(temp);
  }, [complaints, submissionType, statusFilter, urgencyFilter, startDate, endDate]);

  // Processed complaints for table/PDF/CSV
  const processedComplaints = filtered.map((c) => ({
    ...c,
    name: c.anonymous ? "Anonymous" : c.name,
    email: c.anonymous ? "Anonymous" : c.email,
  }));

  // Export CSV
  const exportCSV = () => {
    const headers = ["ID", "Name", "Email", "Subject", "Status", "Urgency", "Submitted"];
    const rows = processedComplaints.map((c) => {
      const d = new Date(c.created_at);
      const formattedDate =
        `${("0" + d.getDate()).slice(-2)}-${("0" + (d.getMonth() + 1)).slice(-2)}-${d.getFullYear()} ` +
        `${("0" + d.getHours()).slice(-2)}:${("0" + d.getMinutes()).slice(-2)} ${d.getHours() >= 12 ? "PM" : "AM"}`;
      return [c.id, c.name, c.email, c.subject, c.status, c.urgency || "Medium", formattedDate];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `complaints_report.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Complaints Report", 14, 15);

    const headers = [["ID", "Name", "Email", "Subject", "Status", "Urgency", "Submitted"]];
    const data = processedComplaints.map((c) => [
      c.id,
      c.name,
      c.email,
      c.subject,
      c.status,
      c.urgency || "Medium",
      new Date(c.created_at).toLocaleString(),
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 25,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [124, 58, 237] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    doc.save("complaints_report.pdf");
  };

  // Chart data
  const statusData = ["New", "In Progress", "Escalated", "Resolved"].map((s) => ({
    name: s,
    count: filtered.filter((c) => c.status === s).length,
  }));

  const urgencyData = ["Low", "Medium", "High"].map((u) => ({
    name: u,
    value: filtered.filter((c) => c.urgency === u).length,
  }));

  const COLORS = ["#46d334ff", "#facc15", "#ef4444"];

  return (
    <div style={{ backgroundColor: "#1e1e1e", color: "#f3f3f3", minHeight: "100vh", padding: "30px" }}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        style={{ padding: "8px 14px", borderRadius: "8px", border: "none", backgroundColor: "#cda4f7ff", color: "#100e0eff", cursor: "pointer", marginBottom: "20px" }}
      >
        ← Back
      </button>

      <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#c084fc", textAlign: "center", marginBottom: "25px" }}>
        Reports & Exports
      </h2>

      {/* Submission Type Toggles */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
        {["All", "Public", "Anonymous"].map((type) => (
          <button
            key={type}
            onClick={() => setSubmissionType(type)}
            style={{
              padding: "8px 16px",
              borderRadius: "10px",
              border: submissionType === type ? "2px solid #c084fc" : "none",
              backgroundColor: "#2a2a2a",
              color: "#fff",
              cursor: "pointer",
              fontWeight: submissionType === type ? "600" : "400",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Filter Box */}
      <div style={{ backgroundColor: "#2a2a2a", borderRadius: "16px", padding: "20px 25px", maxWidth: "950px", margin: "0 auto 30px auto", boxShadow: "0 4px 10px rgba(0,0,0,0.4)" }}>
        <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#c084fc", marginBottom: "15px", textAlign: "center" }}>Filter Reports</h3>
  
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
  
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}    placeholder="Start Date"style={{ padding: "10px", borderRadius: "10px", border: "none", backgroundColor: "#f6f1f1ff", color: "#070707ff", minWidth: "180px" }} />

          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" style={{ padding: "10px", borderRadius: "10px", border: "none", backgroundColor: "#f8f5f5ff", color: "#171616ff", minWidth: "180px" }} />

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ padding: "10px", borderRadius: "10px", border: "none", backgroundColor: "#f9f6f6ff", color: "#191717ff", minWidth: "180px" }}>
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Escalated">Escalated</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select value={urgencyFilter} onChange={(e) => setUrgencyFilter(e.target.value)} style={{ padding: "10px", borderRadius: "10px", border: "none", backgroundColor: "#fcf5f5ff", color: "#0a0909ff", minWidth: "180px" }}>
            <option value="">All Urgency</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Export Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <button onClick={exportCSV} style={{ padding: "10px 16px", borderRadius: "10px", backgroundColor: "#22c55e", color: "#fff", fontWeight: "600", cursor: "pointer", border: "none" }}>
            Export CSV
          </button>
          <button onClick={exportPDF} style={{ padding: "10px 16px", borderRadius: "10px", backgroundColor: "#ef4444", color: "#fff", fontWeight: "600", cursor: "pointer", border: "none" }}>
            Export PDF
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: "flex", justifyContent: "center", gap: "50px", flexWrap: "wrap", marginBottom: "40px" }}>
        <div>
          <h4 style={{ color: "#c084fc", textAlign: "center" }}>Status Overview</h4>
          <BarChart width={400} height={250} data={statusData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="count" fill="#a667e4ff" radius={[10, 10, 0, 0]} />
          </BarChart>
        </div>

        <div>
          <h4 style={{ color: "#c084fc", textAlign: "center" }}>Urgency Distribution</h4>
          <PieChart width={400} height={250}>
            <Pie data={urgencyData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
              {urgencyData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Table Section */}
      <div style={{ overflowX: "auto", backgroundColor: "#2a2a2a", borderRadius: "16px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#bc86ff", color: "#fff" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>ID</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Subject</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Urgency</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {processedComplaints.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid #4b4b4b" }}>
                <td style={{ padding: "10px" }}>{c.id}</td>
                <td style={{ padding: "10px" }}>{c.name}</td>
                <td style={{ padding: "10px" }}>{c.email}</td>
                <td style={{ padding: "10px" }}>{c.subject}</td>
                <td style={{ padding: "10px" }}>{c.status}</td>
                <td style={{ padding: "10px" }}>{c.urgency || "Medium"}</td>
                <td style={{ padding: "10px" }}>{new Date(c.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {processedComplaints.length === 0 && <p style={{ textAlign: "center", marginTop: "20px", color: "#aaa" }}>No complaints found.</p>}
      </div>
    </div>
  );
};

export default ReportsExports;
