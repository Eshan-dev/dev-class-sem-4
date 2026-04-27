import React, { useState, useEffect } from 'react';

function Admin() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    const storedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setJobs(storedJobs);
  };

  const saveJobsToStorage = (updatedJobs) => {
    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  const handleAddOrUpdate = () => {
    if (!company || !salary || !location || !image) {
      alert('Please fill all the fields');
      return;
    }

    if (editingId) {
      // Update existing
      const updatedJobs = jobs.map((job) =>
        job.id === editingId ? { ...job, company, salary, location, image } : job
      );
      saveJobsToStorage(updatedJobs);
      setEditingId(null);
    } else {
      // Add new
      const newJob = {
        id: jobs.length ? Math.max(...jobs.map(j => j.id)) + 1 : 1, // better id generation
        company,
        salary,
        location,
        image,
      };
      saveJobsToStorage([...jobs, newJob]);
    }
    clearForm();
  };

  const clearForm = () => {
    setCompany('');
    setSalary('');
    setLocation('');
    setImage('');
    setEditingId(null);
  };

  const handleEdit = (job) => {
    setCompany(job.company);
    setSalary(job.salary);
    setLocation(job.location);
    setImage(job.image || '');
    setEditingId(job.id);
  };

  const handleDelete = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    saveJobsToStorage(updatedJobs);
  };

  return (
    <div className="admin-container">
      <div className="admin-form">
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        
        <button id="add-job-button" onClick={handleAddOrUpdate}>
          {editingId ? 'Update Job' : 'Add Job'}
        </button>
        <button className="admin-clear-btn" onClick={clearForm}>
          Clear
        </button>
      </div>
      
      <div id="admin-jobs-container">
        {jobs.map((job) => (
          <div key={job.id}>
            <div>company : {job.company}</div>
            <div>salary : {job.salary}</div>
            <div>location : {job.location}</div>
            <div>id : {job.id}</div>
            <div>
              <button onClick={() => handleEdit(job)}>Edit</button>
              <button onClick={() => handleDelete(job.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
