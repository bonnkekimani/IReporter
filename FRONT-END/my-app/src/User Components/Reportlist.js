import React, { useState, useEffect } from 'react';
import UserSideBar from './UserSideBar';
const ReportsList = () => {
  const [reports, setReports] = useState([]);
  useEffect(() => {
    // Fetch report data here
    fetch('/reports')
      .then(response => response.json())
      .then(data => setReports(data))
      .catch(error => console.error('Error fetching reports:', error));
  }, []);
  const handleDeleteReport = async (reportId) => {
    try {
      const response = await fetch(`/reports/${reportId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the report.');
      }
      const updatedReports = reports.filter(report => report.id !== reportId);
      setReports(updatedReports);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditField = async (reportId, field, value) => {
    try {
      const response = await fetch(`/reports/${reportId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: value }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update ${field}.`);
      }
      const updatedReports = reports.map(report => {
        if (report.id === reportId) {
          return { ...report, [field]: value };
        }
        return report;
      });
      setReports(updatedReports);
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditMedia = async (reportId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(`http://localhost:5000/reports/${reportId}/media`, {
        method: 'PATCH',
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update media. Server response: ${JSON.stringify(errorData)}`);
      }
      const updatedReport = await response.json();
      const updatedReports = reports.map(report => {
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
  return (
    <div className="card-grid" style={{ width: '90%',marginLeft: '200px', height: '400px' }}>
      <UserSideBar/>
      {reports.map(report => (
        <div key={report.id} className="card">
          <button className="delete-btn" onClick={() => handleDeleteReport(report.id)}>x</button>
          <h3>
            <span onClick={() => handleEditField(report.id, 'title', prompt('Enter new title:', report.title))}>
              {report.title}
            </span>
          </h3>
          <p>
            <span onClick={() => handleEditField(report.id, 'description', prompt('Enter new description:', report.description))}>
              Description: {report.description}
            </span>
          </p>
          <p>
            <span onClick={() => handleEditField(report.id, 'location', prompt('Enter new location:', report.location))}>
              Location: {report.location}
            </span>
          </p>
          <div className="card-media">
            <input type="file" accept="image/*" onChange={(e) => handleEditMedia(report.id, e.target.files[0])} />
            <img src={report.media} alt="Report Media" onClick={() => {}} />
          </div>
          <p className="card-email">{report.reporter_email}</p>
        </div>
      ))}
    </div>
  );
};
export default ReportsList;