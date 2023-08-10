import React, { useState } from 'react';
import "./style.css";

const Reportform = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    reporter_email: '',
    category: 'Select Category', // Default category
    status:'Select Status',
    file: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      file,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    // Append form data
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        form.append(key, formData[key]);
      }
    }
    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: form,
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Upload successful:', data);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" name="category" value={formData.category} onChange={handleInputChange} required>
        <option value="select">Select Category</option>
          <option value="Red Flag">Red Flag</option>
          <option value="Intervention">Intervention</option>
        </select>
      </div>
      <div>
        <label htmlFor="reporter_email">Reporter Email:</label>
        <input type="email" id="reporter_email" name="reporter_email" value={formData.reporter_email} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="file">File:</label>
        <input type="file" id="file" name="file" onChange={handleFileChange} accept="image/*" required />
      </div>
      <div>
  <label htmlFor="status">Status:</label>
  <select id="status" name="status" value={formData.status} onChange={handleInputChange} required>
    <option value="select">Select Status</option>
    <option value="submitted">Submitted</option>
  </select>
</div>

      <button type="submit">Upload Report</button>
    </form>
  );
};

export default Reportform;
