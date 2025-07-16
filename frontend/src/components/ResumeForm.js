import React, { useState } from 'react';
import axios from 'axios';

function ResumeForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    experience: '',
    education: ''
  });

  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://ai-resume-builder-tpel.onrender.com/generate-resume', {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim())
      });

      setResume(response.data.resume);
    } catch (error) {
      console.error('Error generating resume:', error);
      setResume("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>AI Resume Generator</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" onChange={handleChange} required />
        <textarea name="skills" placeholder="Skills (comma separated)" onChange={handleChange} required />
        <textarea name="experience" placeholder="Experience" onChange={handleChange} required />
        <textarea name="education" placeholder="Education" onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? 'Generating...' : 'Generate Resume'}</button>
      </form>

      {resume && (
        <div>
          <h3>Generated Resume</h3>
          <pre>{resume}</pre>
        </div>
      )}
    </div>
  );
}

export default ResumeForm;

