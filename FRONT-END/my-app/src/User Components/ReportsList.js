import React, { useState, useEffect } from 'react';
const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTitleId, setEditTitleId] = useState(null);
  const [editDescriptionId, setEditDescriptionId] = useState(null);
  const [editLocationId, setEditLocationId] = useState(null);
  const [editMediaId, setEditMediaId] = useState(null);
  useEffect(() => {
    fetchReports();
  }, []);
  const fetchReports = () => {
    fetch('http://localhost:5000/reports')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setReports(data.reports);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };
  const handleEditTitle = (reportId) => {
    setEditTitleId(reportId);
  };
  const handleEditDescription = (reportId) => {
    setEditDescriptionId(reportId);
  };
  const handleEditLocation = (reportId) => {
    setEditLocationId(reportId);
  };
  const handleEditMedia = (reportId) => {
    setEditMediaId(reportId);
  };
  const handleFieldChange = async (event, reportId, field) => {
    try {
      const newValue = event.target.value;
      const response = await fetch(`http://localhost:5000/reports/${reportId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: newValue }),
      });
      if (!response.ok) {
        throw new Error('Failed to update the field.');
      }
      // Update the corresponding report in the state with the new field value
      const updatedReports = reports.map((report) => {
        if (report.id === reportId) {
          return { ...report, [field]: newValue };
        }
        return report;
      });
      setReports(updatedReports);
    } catch (error) {
      console.error(error);
    }
  };
  const handleMediaChange = async (event, reportId) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      // Send the new media file to the backend for upload
      const response = await fetch(`http://localhost:5000/reports/${reportId}/media`, {
        method: 'PATCH',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to update media.');
      }
      // Retrieve the updated report data from the backend after successful upload
      const updatedReport = await response.json();
      // Update the corresponding report in the state with the new media URL
      const updatedReports = reports.map((report) => {
        if (report.id === reportId) {
          return { ...report, media: updatedReport.media };
        }
        return report;
      });
      setReports(updatedReports);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteReport = async (reportId) => {
    try {
      // Send a DELETE request to the backend to delete the report
      const response = await fetch(`http://localhost:5000/reports/${reportId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the report.');
      }
      // Filter out the deleted report from the state
      const updatedReports = reports.filter((report) => report.id !== reportId);
      setReports(updatedReports);
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="card-grid">
      {reports.map((report) => (
        <div key={report.id} className="card">
          <button className="delete-btn" onClick={() => handleDeleteReport(report.id)}>x</button>
          {editTitleId === report.id ? (
            <input
              type="text"
              value={report.title}
              onChange={(e) => handleFieldChange(e, report.id, 'title')}
              onBlur={() => setEditTitleId(null)}
              autoFocus
            />
          ) : (
            <h3 onClick={() => handleEditTitle(report.id)}>{report.title}</h3>
          )}
          {editDescriptionId === report.id ? (
            <input
              type="text"
              value={report.description}
              onChange={(e) => handleFieldChange(e, report.id, 'description')}
              onBlur={() => setEditDescriptionId(null)}
            />
          ) : (
            <p onClick={() => handleEditDescription(report.id)}>{report.description}</p>
          )}
          {editLocationId === report.id ? (
            <input
              type="text"
              value={report.location}
              onChange={(e) => handleFieldChange(e, report.id, 'location')}
              onBlur={() => setEditLocationId(null)}
            />
          ) : (
            <p onClick={() => handleEditLocation(report.id)}>Location: {report.location}</p>
          )}
          {editMediaId === report.id ? (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleMediaChange(e, report.id)}
              />
              <button onClick={() => setEditMediaId(null)}>Cancel</button>
            </div>
          ) : (
            <img onClick={() => setEditMediaId(report.id)} src={report.media} alt="Report media" />
          )}
          <p>Reporter Email: {report.reporter_email}</p>
        </div>
      ))}
    </div>
  );
};
export default ReportsList;