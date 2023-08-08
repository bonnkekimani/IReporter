import React, { useState } from 'react';
import "./style.css";
const Reportform = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    reporter_email: '',
    category:'',
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
    const form = new FormData(event.target);
    try {
      const response = await fetch('http://localhost:5000/reports', {
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
        <label htmlFor="location">Category:</label>
        <select id="categories" name="categoriess">
          <option value="volvo">Red Flag</option>
          <option value="saab">Intervention</option>
          
        </select>
        {/* <input type="input" id="location" name="Category" value={formData.location} onChange={handleInputChange} required /> */}
      </div>
      <div>
        <label htmlFor="reporter_email">Reporter Email:</label>
        <input type="email" id="reporter_email" name="reporter_email" value={formData.reporter_email} onChange={handleInputChange} required />
      </div>
      <div>
        <label htmlFor="file">File:</label>
        <input type="file" id="file" name="file" onChange={handleFileChange} accept="image/*" required />
      </div>
      <button type="submit">Upload Report</button>
    </form>
  );
};
export default Reportform;

