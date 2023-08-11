import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AdminSidebar from './AdminSidebar';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchReports();
  }, [selectedCategory]);

  const fetchReports = async () => {
    try {
      const response = await fetch('/reports');
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        console.error('Error fetching reports');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredReports = selectedCategory === 'All' ? reports : reports.filter(report => report.category === selectedCategory);


  const handleStatusChange = (reportId) => {
    setReports((prevReports) =>
      prevReports.map((report) => {
        if (report.id === reportId) {
          if (report.status === 'submitted') {
            return { ...report, status: 'under_investigation' };
          } else if (report.status === 'under_investigation') {
            return { ...report, status: 'rejected' };
          } else if (report.status === 'rejected') {
            return { ...report, status: 'resolved' };
          } else {
            return { ...report, status: 'submitted' };
          }
        } else {
          return report;
        }
      })
    );
  };

  const handleSaveStatus = async (reportId, newStatus, reporterEmail) => {
    try {
      const response = await fetch(`/reports/${reportId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const emailData = {
          toEmail: reporterEmail,
          subject: 'Report Status Update',
          htmlContent: `
            <h3>The status of your report (ID: ${reportId}) has been updated to: ${newStatus}</h3>
          `,
        };

        const emailResponse = await fetch('/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        if (emailResponse.ok) {
          console.log('Email sent to reporter');
        } else {
          const errorData = await emailResponse.json();
          console.error('Error sending email:', errorData);
        }

        fetchReports();
      } else {
        const errorData = await response.json();
        console.error('Error saving status:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <AdminSidebar/>
      <h2>Reports</h2>

      <Form.Group controlId="categorySelect">
        <Form.Label>Filter by Category:</Form.Label>
        <Form.Control as="select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Red Flag">Red Flag</option>
          <option value="Intervention">Intervention</option>
        </Form.Control>
      </Form.Group>

      <div className="card-grid">
        {filteredReports.map((report) => (
          <Card key={report.id} className="mb-3" style={{marginLeft:'80%'}}>
            <Card.Body>
              <Card.Title>{report.title}</Card.Title>
              <img src={report.media} alt={`Report ${report.id}`} style={{ maxWidth: '60%' }} />
              <Card.Text>{report.description}</Card.Text>
              <Card.Text>Location: {report.location}</Card.Text>
              <Card.Text>Category: {report.category}</Card.Text>
              <Card.Text>Reporter Email: {report.reporter_email}</Card.Text>
              <Card.Text>Status: {report.status}</Card.Text>

              <div className="status-buttons">
                <Button style={{marginBottom:'2rem'}}
                  variant="primary"
                  onClick={() =>
                    handleStatusChange(
                      report.id,
                      report.status === 'submitted'
                        ? 'under_investigation'
                        : report.status === 'under_investigation'
                        ? 'rejected'
                        : 'resolved'
                    )
                  }
                >
                  Change Status
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleSaveStatus(report.id, report.status, report.reporter_email)}
                >
                  Save Status
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reports;
