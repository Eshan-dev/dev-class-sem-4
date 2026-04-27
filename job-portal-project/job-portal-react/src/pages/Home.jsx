import React, { useState, useEffect } from 'react';

const GOOGLE_JOB_IMAGE = 'https://53.fs1.hubspotusercontent-na1.net/hubfs/53/image8-2.jpg';

function Home() {
  const [allJobs, setAllJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    setAllJobs(jobs);
  }, []);

  const filteredJobs = allJobs.filter((job) =>
    (job.company || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="mainContainer">
      <div id="search-container">
        <div>
          <h1>Find your dream job now</h1>
        </div>
        <div>
          <input
            id="inputBox"
            placeholder="Search Companies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div id="jobs-grid-container">
        {filteredJobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          filteredJobs.map((job) => (
            <div className="job" key={job.id}>
              <img
                className="job-image-container"
                src={job.image && job.image.trim() ? job.image : GOOGLE_JOB_IMAGE}
                alt={job.company}
              />
              <div className="job-description-container">
                <div className="company-name">{job.company}</div>
                <div className="job-info">
                  <div className="salary-info">{job.salary}</div>
                  <div className="location-info">{job.location}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Home;
